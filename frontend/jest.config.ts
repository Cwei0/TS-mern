import { Config } from "jest";

const config: Config = {

    transform: {
        "^.+\\.(j|t)sx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|sass|scss)$": "<rootDir>/test/styleMock.ts"
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
}

export default config
