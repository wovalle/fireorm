module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config', './setup.ts'],
  testRegex: '/test/functional/.*.int-spec.ts?$',
};
