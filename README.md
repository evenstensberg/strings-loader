# strings-loader

A tiny [webpack](https://webpack.js.org/) loader that takes in a module's
source string and `console.log`s its content during the build, then passes the
source through unchanged. Handy for debugging exactly what webpack hands your
loaders for a given file.

## Install

```bash
npm install --save-dev strings-loader
```

## Usage

Add it to a rule in `webpack.config.js`. Because a loader logs whatever it
_receives_, its position in the `use` array matters — loaders run right-to-left,
so put `strings-loader` last to see the raw source, or earlier to see what a
previous loader produced.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // ...other loaders...
          {
            loader: 'strings-loader',
            options: {
              showResource: true, // prefix each log with the file path
              // maxLength: 500,   // optionally truncate long output
            },
          },
        ],
      },
    ],
  },
};
```

Run your build and the content of every matched module is printed to the
terminal:

```
[strings-loader] /project/src/hello.js
export const greeting = 'Hello from the module string!';

export function greet(name) {
  return `${greeting} — ${name}`;
}
```

## Options

| Option         | Type      | Default | Description                                                        |
| -------------- | --------- | ------- | ------------------------------------------------------------------ |
| `showResource` | `boolean` | `true`  | Prefix the log with the module's file path.                        |
| `maxLength`    | `number`  | —       | Truncate the logged content to this many characters. The source is |
|                |           |         | never truncated — only the log output is.                          |

## How it works

A webpack loader is just a function that receives the module source and returns
it (optionally transformed). This one returns the source untouched and only
emits a `console.log` as a side effect, so it's safe to drop anywhere in a
loader chain.

## Try the example

```bash
npm install
npm run example
```

## License

MIT
