var path = require("path");
var webpack = require("webpack");
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var app_dir = path.join(__dirname, 'src');

module.exports = {
	cache: true,
	entry: {
		app: "./src/index.js"
	},
	output: {
		path: path.join(__dirname, 'src', "dist"),
		publicPath: "/public/",
		filename: "bundle.js"
    // chunkFilename: "bundle-[hash].js"
	},
	module: {
		loaders: [
			// required to write "require('./style.css')"
			{ test: /\.css$/,    loader: "style-loader!css-loader" },

			// required for bootstrap icons
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },

			// required for react jsx
			{test: /\.js$/, exclude: [node_modules_dir], loader: "babel-loader"},
			{test: /\.jsx$/, exclude: [node_modules_dir], loader: "babel-loader"}
		]
	},
	resolve: {
		alias: { },
		modulesDirectories: ['node_modules']
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js",
				minChunks: (module, count) => {
					return module.resource && module.resource.indexOf(app_dir) === -1;
				}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
	]
};