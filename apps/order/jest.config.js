const { name } = require('./package.json');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../../tsconfig.json');

module.exports = {
    rootDir: 'src',
    displayName: name,
    preset: 'ts-jest',

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../../../',
    }),

    collectCoverage: true,
    collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**', '!**/dist/**', '!**/*.d.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageThreshold: {
        global: {
            lines: 5,
            statements: 5,
            functions: 5,
            branches: 0,
        },
    },
    coveragePathIgnorePatterns: ['main.ts', 'swagger.ts', 'node_modules', 'module.ts', 'interface.ts', 'coverage'],
};
