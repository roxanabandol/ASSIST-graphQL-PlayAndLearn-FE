const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader?limit=100000"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Feed GraphQL</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`,
    }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
