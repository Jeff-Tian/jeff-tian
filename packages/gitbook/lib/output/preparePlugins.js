var Plugins = require('../plugins');
var Promise = require('../utils/promise');

/**
 * Load and setup plugins
 *
 * @param {Output}
 * @return {Promise<Output>}
 */
function preparePlugins(output) {
    var book = output.getBook();

    return Promise()

        // Only load plugins for main book
        .then(function () {
            console.log('handling book: ', book);
            if (book.isLanguageBook()) {
                console.log('handling for lang...');
                var res = output.getPlugins();
                console.log('lang res = ', res);
                return res;
            } else {
                console.log('loading plugins for ', book);
                const res = Plugins.loadForBook(book);
                console.log('res of loadForBook = ', res);
                return res;
            }
        })

        // Update book's configuration using the plugins
        .then(function (plugins) {
            return Plugins.validateConfig(book, plugins)
                .then(function (newBook) {
                    return output.merge({
                        book: newBook,
                        plugins: plugins
                    });
                });
        });
}

module.exports = preparePlugins;
