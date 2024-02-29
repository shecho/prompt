module.exports = {
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 180,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  tailwindConfig: './styles/tailwind.config.js',
};
