const airbnb = require('@neutrinojs/airbnb');
const mocha = require('@neutrinojs/mocha');
const react = require('@neutrinojs/react');

module.exports = {
  options: {
    root: __dirname
  },
  use: [
    airbnb({
      eslint: {
        baseConfig: {
          rules: {
            'func-style': 'off',
            'no-param-reassign': 'off',
            'arrow-parens': ['error', 'as-needed'],
            'implicit-arrow-linebreak': 'off',
            'no-confusing-arrow': 'off',
            'generator-star-spacing': ['error', 'before'],
            'no-plusplus': 'off',
            'no-nested-ternary': 'off',
            'comma-dangle': ['error','never'],
            'no-underscore-dangle': 'off'
          }
        },
      },
    }),
    react({
      html: {
        title: 'client'
      },
      style: {
        test: /\.scss$/,
        modulesTest: /\.module\.scss$/,
        loaders: [
          'sass-loader'
        ]
      },
      babel: {
        plugins: []
      },
    }),
    mocha()
  ],
};
