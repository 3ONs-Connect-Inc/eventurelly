import type { Config } from "jest";

const config: Config = {
  rootDir: "./",
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/test/jest.globals.js"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { tsconfig: "tsconfig.jest.json" }
    ]
  },
  moduleNameMapper: {
    "^/images/(.*)$": "<rootDir>/src/images/$1",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/mocks/fileMock.js"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    
  
};

export default config;
