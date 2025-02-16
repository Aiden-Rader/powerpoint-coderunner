const path = require('path');
module.exports = {
	entry: './src/taskpane/taskpane.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		port: 3000
	}
};