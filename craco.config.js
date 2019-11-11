/**
 * This config is generated and used only for bundle-report.
 * It was necessary since react-scripts is not supporting build --stats 
 * anymore, thus webpack-bundle-analyzer is not natively supported.
 * More info: https://github.com/facebook/create-react-app/issues/6904
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  },
};
