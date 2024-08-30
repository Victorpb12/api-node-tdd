/** @type {import('jest').Config} */
const config = {
  coverageDirectory: "coverage",
  testEnviroment: "node",
  collectCoverageFrom: ["**/src/**/*.js"],
};

module.exports = config;
