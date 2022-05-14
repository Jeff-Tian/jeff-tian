var path = require('path');
var Immutable = require('immutable');

var Output = require('../models/output');
var Promise = require('../utils/promise');
var fs = require('../utils/fs');

var callHook = require('./callHook');
var preparePlugins = require('./preparePlugins');
var preparePages = require('./preparePages');
var prepareAssets = require('./prepareAssets');
var generateAssets = require('./generateAssets');
var generatePages = require('./generatePages');

/**
 * Process an output to generate the book
 *
 * @param {Generator} generator
 * @param {Output} output
 * @return {Promise<Output>}
 */
function processOutput(generator, startOutput) {
    return Promise(startOutput)
        .then(function (res) {
            console.log('res of po = ', res);
            return res;
        })
        .then(preparePlugins)
        .then(function (res) {
            console.log('plugin prepared!');
            return res;
        })
        .then(function (res) {
            console.log('preparing pages...');
            var r = preparePages(res);
            console.log('pages = ', r);
            return r;
        })
        .then(function (r) {
            console.log('preparing assets...');
            var res = prepareAssets(r);
            console.log('prepared assets = ', res);
            return res;
        })

        .then(function (res) {
            var r = callHook.bind(null,
                'config',
                function (output) {
                    var book = output.getBook();
                    var config = book.getConfig();
                    var values = config.getValues();

                    return values.toJS();
                },
                function (output, result) {
                    var book = output.getBook();
                    var config = book.getConfig();

                    config = config.updateValues(result);
                    book = book.set('config', config);
                    return output.set('book', book);
                }
            )(res);

            console.log('callhook = ', r);

            return r;
        })

        .then(function (res) {
            console.log('callhook res = ', res);
            var r = callHook.bind(null,
                'init',
                function (output) {
                    return {};
                },
                function (output) {
                    return output;
                }
            )(res);

            console.log('callhook res2 = ', r);

            return r;
        })

        .then(function (output) {
            console.log('output after hook = ', output);
            if (!generator.onInit) {
                return output;
            }

            return generator.onInit(output);
        })

        .then(generateAssets.bind(null, generator))
        .then(generatePages.bind(null, generator))

        .tap(function (output) {
            var book = output.getBook();

            if (!book.isMultilingual()) {
                return;
            }

            var logger = book.getLogger();
            var books = book.getBooks();
            var outputRoot = output.getRoot();
            var plugins = output.getPlugins();
            var state = output.getState();
            var options = output.getOptions();

            return Promise.forEach(books, function (langBook) {
                // Inherits plugins list, options and state
                var langOptions = options.set('root', path.join(outputRoot, langBook.getLanguage()));
                var langOutput = new Output({
                    book: langBook,
                    options: langOptions,
                    state: state,
                    generator: generator.name,
                    plugins: plugins
                });

                logger.info.ln('');
                logger.info.ln('generating language "' + langBook.getLanguage() + '"');
                return processOutput(generator, langOutput);
            });
        })

        .then(callHook.bind(null,
                'finish:before',
                function (output) {
                    return {};
                },
                function (output) {
                    return output;
                }
            )
        )

        .then(function (output) {
            if (!generator.onFinish) {
                return output;
            }

            console.log('onFin = ', generator.onFinish.toString());
            return generator.onFinish(output);
        })

        .then(function (res) {
            var r = callHook.bind(null,
                'finish',
                function (output) {
                    return {};
                },
                function (output) {
                    return output;
                }
            )(res);

            console.log('all hooks after: ', r);

            return r;
        })
        .then(function (res) {
            console.log('all hooks resolved: ', res);
            return res;
        })
        .catch(function (err) {
            console.error('all hooks rejected: ', err);
        });
}

/**
 * Generate a book using a generator.
 *
 * The overall process is:
 *     1. List and load plugins for this book
 *     2. Call hook "config"
 *     3. Call hook "init"
 *     4. Initialize generator
 *     5. List all assets and pages
 *     6. Copy all assets to output
 *     7. Generate all pages
 *     8. Call hook "finish:before"
 *     9. Finish generation
 *     10. Call hook "finish"
 *
 *
 * @param {Generator} generator
 * @param {Book} book
 * @param {Object} options
 * @return {Promise<Output>}
 */
function generateBook(generator, book, options) {
    options = generator.Options(options);
    var state = generator.State ? generator.State({}) : Immutable.Map();
    var start = Date.now();

    return Promise(
        new Output({
            book: book,
            options: options,
            state: state,
            generator: generator.name
        })
    )

        // Cleanup output folder
        .then(function (output) {
            console.log('output = ', output);
            var logger = output.getLogger();
            var rootFolder = output.getRoot();

            logger.debug.ln('cleanup folder "' + rootFolder + '"');
            return fs.ensureFolder(rootFolder).then(function (result) {
                console.log('result = ', result);
                return output;
            });
        })

        .then(function (res) {
            console.log('res = ', res);
            console.log('generator = ', generator);
            // var po = processOutput.bind(generator);
            // console.log('po = ', po.toString());

            var poRes = processOutput(generator, res);
            console.log('poRes = ', poRes);

            return poRes
        })

        // Log duration and end message
        .then(function (output) {
            console.log('final output = ', output);
            var logger = output.getLogger();
            var end = Date.now();
            var duration = (end - start) / 1000;

            logger.info.ok('generation finished with success in ' + duration.toFixed(1) + 's !');

            return output;
        })
        .catch(function (err) {
            console.error('generation failed !', err);
        });
}

module.exports = generateBook;
