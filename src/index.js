import {
  parseStringsDetailed,
} from "@ev1stensberg/strings-js";
/**
 * strings-loader
 *
 * A webpack loader that receives a module's source (the "module string")
 * and console.logs its content during the build, then passes the source
 * through unchanged so it can continue down the loader chain.
 *
 * @this {import('webpack').LoaderContext<StringsLoaderOptions>}
 * @param {string | Buffer} source The module content passed by webpack.
 * @returns {string | Buffer} The unchanged source.
 *
 * @typedef {Object} StringsLoaderOptions
 * @property {boolean} [showResource=true] Prefix the log with the file path.
 * @property {number}  [maxLength]         Truncate the logged content to this
 *                                         many characters (the returned source
 *                                         is never truncated).
 */
export default function stringsLoader(source) {
  // Loaders can run synchronously; nothing async is happening here.
  const options =
    (typeof this.getOptions === 'function' && this.getOptions()) || {};

  const { showResource = true, maxLength } = options;

  // `source` may be a Buffer if a previous loader emitted binary data.
  const content = Buffer.isBuffer(source) ? source.toString('utf8') : source;
  console.log(parseStringsDetailed(content));
  // Pass the module string through unchanged.
  return source;
};
