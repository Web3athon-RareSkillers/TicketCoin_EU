const { Buffer } = require('buffer');
const { polyfill } = require('rn-nodeify/lib/polyfills');

const modules = {
  ...require('node-libs-react-native'),
  zlib: require.resolve('react-zlib-js'),
};

polyfill({ Buffer, ...modules });
