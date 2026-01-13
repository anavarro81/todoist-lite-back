// jest.config.js
/** @type {import('jest').Config} */
const config = {
  // --- Básicos ---
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__tests__/support/',  // <-- excluye helpers
    '/__tests__/utils/test-db\\.ts$' // <-- excluye el archivo problemático
  ],

  // --- Resolución de módulos (equivalente a _moduleAliases + tsconfig.paths) ---
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',     
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1'       
  },

  // --- Transformación TS ---
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        diagnostics: {
          ignoreCodes: [1343] // ignorar código de error de import assertions si usas ESM
        }
      }
    ]
  },

  // --- Variables de entorno para testing ---
  setupFiles: [
    'dotenv/config' // carga .env.test si existe, o .env por defecto
  ],
  setupFilesAfterEnv: [], // deja vacío a menos que uses jest-dom, etc.

  // --- Cobertura ---
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/*.{type,model}.ts',
    '!src/seed/**',
    '!src/server.ts',
    '!src/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover']
};

module.exports = config;