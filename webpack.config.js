const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // The output directory for bundled files
    filename: 'bundle.js', // The name of the bundled JavaScript file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel for transpilation
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Match image files
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Convert small images to data URIs
              fallback: 'file-loader', // Use file-loader for larger images
              outputPath: 'images/', // Output directory for images
              name: '[name].[ext]', // Name format for output files
            },
          },
        ],
      },
    ],
  },
};
