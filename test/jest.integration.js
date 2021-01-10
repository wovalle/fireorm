module.exports = {
  roots: ['<rootDir>/functional'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./setup.ts'],
  verbose: true,
};
