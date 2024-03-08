const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, './env', `.env.${process.env.NODE_ENV}`),
      }),
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
  },
};
