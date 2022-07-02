const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: 'http://localhost:9004',
  devServer: {
    port: 9004,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: "umd",
      filename: "[name].js",
      library: "vue3",
    },
  },
});
