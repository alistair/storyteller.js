var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    "./client/entry.js"
  ],
    output: {
        path: __dirname + '/client',
        filename: "bundle.js",
        publicPath: '/client/scripts/'
    },
    resolve: {
    // Allow to omit extensions when requiring these files
    	extensions: ['', '.js', '.jsx']
  	},
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx'] },
        ]
    }
};
