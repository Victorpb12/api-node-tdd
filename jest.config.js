/** @type {import('jest').Config} */
const config = {
  coverageDirectory: "coverage",
  testEnviroment: "node",
  collectCoverageFrom: ["**/src/**/*.js", "!**/src/main/**"],
  preset: "@shelf/jest-mongodb",
  watchPathIgnorePatterns: ["globalConfig", "node_modules"],
};

module.exports = config;
