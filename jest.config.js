module.exports = {
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '~(.*)$': '<rootDir>/src/$1',
    },
    coverageThreshold: {
        global: {
            lines: 100,
            functions: 90,
            statements: 90,
        },
    },
};
