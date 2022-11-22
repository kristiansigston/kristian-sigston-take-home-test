module.exports = {
  "setupFilesAfterEnv": [
    "<rootDir>/.jest/setupTests.js"
  ],
  testPathIgnorePatterns: ['./node_modules/'],
  testMatch: [
    '**/?(*.)test.[jt]s?(x)',
  ],
  testEnvironment: 'jsdom',
}