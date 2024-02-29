export const handler = async (event, context) => {
  const request = event.Records[0].cf.request;

  return request;
};
