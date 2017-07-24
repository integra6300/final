const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassOptions = {
  includePaths: [
    path.resolve(__dirname, "./node_modules/bootstrap-sass/assets")
  ]
};
module.exports = {
	plugins: [
	  new HtmlPlugin({ template: path.resolve(__dirname, './app/index.html')}),
      new ExtractTextPlugin("styles.css")
	],
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
				  loader: 'babel-loader',
				  options: {
				  	presets: ['env']
				  }

				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}

			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.sass$/,
				use: [
          				{loader: 'style-loader'},
          				{loader: 'css-loader'},
          				{loader: 'sass-loader', options: sassOptions}
        			 ]
			},
			{
        		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        		use: [
          			{loader: 'file-loader'}
        		]
      		},
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'file-loader'}
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'file-loader'}
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'file-loader'}
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'file-loader'}
        ]
      }
		]
	},
	resolve: {
		modules: [
			path.resolve('./app'),
			"node_modules"
		]
	}
};
