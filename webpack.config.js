module.exports = {
    entry: "./client/entry.js",
    output: {
        path: __dirname,
        filename: "./client/bundle.js"
    },
    resolve: {
    // Allow to omit extensions when requiring these files
    	extensions: ['', '.js', '.jsx']
  	},
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/, loader: 'jsx' },
        ]
    }
};
