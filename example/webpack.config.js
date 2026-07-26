import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  devtool: false,
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // Point at the loader source. In a published package you would
            // just write `loader: 'strings-loader'`.
            loader: resolve(__dirname, '..', 'src/index.js'),
            options: {
              showResource: true,
            },
          },
        ],
      },
    ],
  },
};
