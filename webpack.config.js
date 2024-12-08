const path = require('path');
module.exports = {
	entry: './src/taskpane/taskpane.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './src',
		port: 3000
	}
};
