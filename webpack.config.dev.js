/* eslint-disable no-undef */
const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { argv } = require("yargs");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "root-config",
    webpackConfigEnv
  });

  const rxjsExternals = {
    externals: [/^rxjs\/?.*$/]
  };

  const { PORT } = webpackConfigEnv;

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./index.ejs",
      templateParameters: {
        isLocal: "true",
        port: PORT
      }
    }),
    new ManifestPlugin()
  ];

  return webpackMerge.smart(defaultConfig, rxjsExternals, {
    // customizations go here
    devServer: {
      open: true,
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      port: PORT
    },
    plugins
  });
};
