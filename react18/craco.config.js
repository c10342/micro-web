module.exports = {
  webpack: {
    configure: {
      output: {
        libraryTarget: "umd",
        filename: "react18.js",
        library: "react18",
        // publicPath: 'http://localhost:9005'
      },
    },
  },
  devServer: {
    port: 9005,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
