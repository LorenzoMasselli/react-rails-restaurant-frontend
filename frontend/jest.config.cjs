// jest.config.js
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(pdf)$": "<rootDir>/__mocks__/pdfFileMock.js",
    "\\.(mp4)$": "<rootDir>/__mocks__/videoFileMock.js",
  },
};
