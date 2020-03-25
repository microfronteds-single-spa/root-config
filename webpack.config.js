const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "root-config",
    webpackConfigEnv
  });

  const rxjsExternals = {
    externals: [/^rxjs\/?.*$/]
  };

  const config = webpackMerge.smart(defaultConfig, rxjsExternals, {
    // customizations go here
    output: {
      filename: "react-mf-root-config-[hash].js"
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true"
        }
      }),
      new ManifestPlugin()
    ]
  });

  // return config;

  return { ...config, externals: ["single-spa", /^@react-mf\//], devtool: 'source-map' };
};
