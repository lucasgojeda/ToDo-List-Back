/** @type {import('ts-jest').JestConfigWithTsJest} */

require('dotenv').config({ path: '.env.test' })

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/.husky/',
    '<rootDir>/src/',
  ],
}
