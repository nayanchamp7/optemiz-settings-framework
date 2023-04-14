/**
 * External Dependencies
 */
const path = require( 'path' );

const wplib = [
    'blocks',
    'components',
    'date',
    'editor',
    'element',
    'i18n',
    'utils',
    'data',
  ];

/**
 * WordPress Dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

module.exports = {
    ...defaultConfig,
    entry: {
        index: path.resolve( __dirname, 'assets/admin/js', 'index.js' ),
    },
    output: {
        path: path.resolve( __dirname, 'assets/build' ),
    },

}