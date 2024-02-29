import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { SSMClient, PutParameterCommand, GetParametersByPathCommand } from '@aws-sdk/client-ssm';
import fs from "fs";
import yamlConfig from "node-yaml-config";
import yaml from "js-yaml";
import path from "path";
import { flatten, unflatten } from 'flat';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) &&
         !isNaN(parseFloat(str))
}

function getConfig(envConfigFile) {
  let config = {};
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'sandbox';
  try {
    config = yamlConfig.load(path.join(process.cwd(), envConfigFile));
  } catch (error) {
    console.warn('Unable to load an env.yaml config file');
  }
  return config;
}

const publishSecretsCommand = {
  command: 'publish',
  desc: 'Read secrets from secrets.yaml and save them, encrypted with the KMS key, to Parameter Store',
  builder: yargs => {
    return yargs.options({
      env: {
        alias: ['e'],
        describe:
          'An env.yaml, as is usually used in conjunction with serverless apps',
        requiresArg: true,
        required: false,
        default: './.env.yaml',
        type: 'string',
      },
      secrets: {
        alias: ['f'],
        describe: 'The secrets.yaml file to read from',
        requiresArg: true,
        required: false,
        default: './.secrets.yaml',
        type: 'string',
      },
    });
  },
  handler: async(argv) => {
    let config = getConfig(argv.env);
    console.info('config ', config);
    const secretsFile = path.join(process.cwd(), argv.secrets);
    let secretsYaml = fs.readFileSync(secretsFile);
    let secrets = await flatten(yaml.load(secretsYaml), { delimiter: '/' });
    let puts = [];
    const client = new SSMClient({ region: config.awsRegion });
    for (let secret in secrets) {
      let params = {
        Name: `${config.ssmPrefix}/${secret}`,
        Type: 'SecureString',
        Value: secrets[secret],
        Overwrite: true,
      };
      console.info('params ', params);
      const command = new PutParameterCommand(params);
      try {
        const response = await client.send(command)
        puts.push(response)
      } catch (error) {
        console.info('Rate exceeded, waiting 5 seconds');
        await sleep(5000);
        const response = await client.send(command)
        puts.push(response)
      }
    }

    Promise.all(puts)
      .then(result => {
        console.info(result);
        console.info('Secrets updated');
      })
      .catch(err => {
        console.error('Error publishing params:', JSON.stringify(err));
      });
  },
};

const fetchSecretsCommand = {
  command: 'fetch',
  desc: 'Fetch secrets from Parameter Store, and save or update the local secrets.yaml file',
  builder: yargs => {
    return yargs.options({
      env: {
        alias: ['e'],
        describe:
          'An env.yaml, as is usually used in conjunction with serverless apps',
        requiresArg: true,
        required: false,
        default: './.env.yaml',
        type: 'string',
      },
      secrets: {
        alias: ['f'],
        describe: 'The secrets.yaml file to read from',
        requiresArg: true,
        required: false,
        default: './.secrets.yaml',
        type: 'string',
      },
    });
  },
  handler: argv => {
    let config = getConfig(argv.env);
    const secretsFile = path.join(process.cwd(), argv.secrets);
    const secretsEnvFile = path.join(process.cwd(), '.env.local');
    const client = new SSMClient({ region: config.awsRegion });
    let params = {
      Path: config.ssmPrefix,
      Recursive: true,
      WithDecryption: true,
    };
    let paramStore = {};
    let getPage = token => {
      if (token) {
        params.NextToken = token;
      }
      const command = new GetParametersByPathCommand(params);
      return client.send(command)
        .then(results => {
          if (results.Parameters.length === 0) {
            throw new Error('No results were returned from Parameter Store');
          }
          results.Parameters.forEach(p => {
            paramStore[p.Name.replace(config.ssmPrefix, '')] = p.Value;
          });
          if (results.NextToken) {
            return getPage(results.NextToken);
          }
        })
        .catch(err => {
          console.error(`params: ${JSON.stringify(params)}\n`);
          throw err;
        });
    };
    getPage()
      .then(() => {
        let secrets = unflatten(paramStore, { delimiter: '/' })['0'];
        let secretsYaml = yaml.dump(secrets, { indent: 2 });
        fs.writeFileSync(secretsFile, secretsYaml);
        console.info('Local .secrets.yaml updated');
        let secretsEnv = '';
        for (const [key, value] of Object.entries(secrets.sandbox)) {
          let currentValue = value
          if (isNumeric(value)){
            currentValue = parseInt(value);
          }else if (typeof variable == "boolean") {
            currentValue = variable === "true"
          }
          if (key === "NEXTAUTH_URL"){
            currentValue = "http://localhost:3000"
          }
          secretsEnv += `${key}=${currentValue}\n`;
        }
        fs.writeFileSync(secretsEnvFile, secretsEnv);
        console.info('Local .env.local updated');
      })
      .catch(err => {
        console.error('Error fetching secrets:', err);
      });
  },
};

const fetchSecretsCICommand = {
  command: 'fetchCI',
  desc: 'Fetch secrets from Parameter Store, and save or update the local .env file. To be used on CircleCI',
  builder: yargs => {
    return yargs.options({
      env: {
        alias: ['e'],
        describe:
          'An env.yaml, as is usually used in conjunction with serverless apps',
        requiresArg: true,
        required: false,
        default: './.env.yaml',
        type: 'string',
      },
      secrets: {
        alias: ['f'],
        describe: 'The secrets.yaml file to read from',
        requiresArg: true,
        required: false,
        default: './.secrets.yaml',
        type: 'string',
      },
    });
  },
  handler: argv => {
    let config = getConfig(argv.env);
    const secretsEnvFile = path.join(process.cwd(), '.env');
    const client = new SSMClient({ region: config.awsRegion });
    const stage = process.env['STAGE'];
    let params = {
      Path: config.ssmPrefix,
      Recursive: true,
      WithDecryption: true,
    };
    let paramStore = {};
    let getPage = token => {
      if (token) {
        params.NextToken = token;
      }
      const command = new GetParametersByPathCommand(params);
      return client.send(command)
        .then(results => {
          if (results.Parameters.length === 0) {
            throw new Error('No results were returned from Parameter Store');
          }
          results.Parameters.forEach(p => {
            paramStore[p.Name.replace(config.ssmPrefix, '')] = p.Value;
          });
          if (results.NextToken) {
            return getPage(results.NextToken);
          }
        })
        .catch(err => {
          console.error(`params: ${JSON.stringify(params)}\n`);
          throw err;
        });
    };
    getPage()
      .then(() => {
        let secrets = unflatten(paramStore, { delimiter: '/' })['0'];
        let secretsEnv = '';
        for (const [key, value] of Object.entries(secrets[stage])) {
          let currentValue = value
          if (isNumeric(value)){
            currentValue = parseInt(value);
          }else if (typeof variable == "boolean") {
            currentValue = variable === "true"
          }
          secretsEnv += `${key}=${currentValue}\n`;
        }
        fs.writeFileSync(secretsEnvFile, secretsEnv);
        console.info('Local .env updated');
      })
      .catch(err => {
        console.error('Error fetching secrets:', err);
      });
  },
};

// eslint-disable-next-line no-unused-expressions
yargs(hideBin(process.argv))
  .command(publishSecretsCommand)
  .command(fetchSecretsCommand)
  .command(fetchSecretsCICommand)
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv;
