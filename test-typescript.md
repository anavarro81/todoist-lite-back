# Configuración de Jest con TypeScript

## Instalación

```bash
npm install --save-dev jest ts-jest @types/jest
```

Jest de forma nativa no entiende ni puede ejecutar archivos de TypeScript, por eso hay que instalar `ts-jest` y los tipos correspondientes: `@types/jest`.

Instala como dependencia de desarrollo:
* `jest` → librería de pruebas de JavaScript
* `@types/jest` → Tipado de TypeScript
* `ts-jest` → Permite a Jest ejecutar archivos de TS

## Nombres de test y guardado

Guardar todos los test en la carpeta `src/test`

**Pruebas unitarias** → `login.unit.test.ts`

**Pruebas integradas** → `login.e2e.test.ts`

## Crear archivo de configuración de Jest

Crea fichero de configuración en la raíz del proyecto `jest.config.js`

```javascript
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: [
    "**/src/**/*.test.ts",
    "**/src/**/*.spec.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
};
```

### Explicación del fichero de configuración

Esta configuración define cómo Jest debe ejecutar tests escritos en TypeScript usando ts-jest.

#### Configuración del `transform`

* `createDefaultPreset()` devuelve una configuración recomendada por `ts-jest`.
* De ahí se extrae la propiedad `transform`, que indica:
   * cómo transformar archivos TypeScript a JavaScript
   * usando internamente el compilador de TypeScript (`tsc`)
* `testEnvironment: "node"` → Indica que los test se ejecutan en Node.
* `transform: { ...tsJestTransformCfg, }` → Transpila los archivo de TS a JS
* `testMatch` → Indica dónde buscar los test:
   * `"**/src/**/*.test.ts"` → Dentro de src que terminen en test.ts
* `testPathIgnorePatterns` → Indica las rutas a ignorar en la búsqueda de test
   * `/node_modules/` → La carpeta node_modules
   * `/dist/` → La carpeta de archivos transpilados de TS.

## Test Dummy solo para ver que funciona

En la carpeta test, crear el siguiente test: `test.test.ts`

```typescript
test('adds 1 + 2 to equal 3', () => {
    expect(2+2).toBe(4);
});
```

## Añadir los scripts para ejecutar las pruebas

Añadir el script para ejecutar jest en `package.json`:

```json
...
  "scripts": {
    "test": "jest"
  },
...
```

## Ejecutar los test

Ejecutamos el comando `npm run test` para ejecutar el test.