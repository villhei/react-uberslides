/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/support/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/support/setupTests.js"],
};
