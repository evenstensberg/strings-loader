// Verifies the loader logic without a full webpack install by invoking it
// with a mock LoaderContext that mimics the shape webpack provides.
const fs = require('fs');
const path = require('path');
const loader = require('../src/index.js');

const resourcePath = path.resolve(__dirname, 'src/hello.js');
const source = fs.readFileSync(resourcePath, 'utf8');

const mockContext = {
  resourcePath,
  getOptions() {
    return { showResource: true };
  },
};

const returned = loader.call(mockContext, source);

// The loader must pass the source through unchanged.
if (returned !== source) {
  console.error('FAIL: loader did not return the source unchanged');
  process.exit(1);
}
console.log('\nPASS: source returned unchanged, content logged above.');
