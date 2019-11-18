const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
   entry: './app/src/main.js',
   output: {
      filename: 'makercam5.js',
      path: path.resolve(__dirname, './dist')
   },
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      index: 'index.html',
      compress: false,
      port: 9000,
      watchContentBase: true,
      watchOptions: {
         poll: 5000
      },
      liveReload: true,
      onListening: function(server) {
         const port = server.listeningApp.address().port;
         console.log('Listening on port:', port);
      },
      open: true,
      openPage: 'index.html'
   },
   target: 'node',
   externals: {
   },
   node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
   },
   resolve: {
      alias: {
         $: "jquery/src/jquery",
      }
   },
   optimization: {
      minimizer: [
         new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
               mangle: false
            }
         })
      ]
   },
   module: {
      rules: [{
         test: /\.js$/,
         include: [path.resolve(__dirname, "./app/")],
         exclude: [
            /node_modules/
         ],
          use: {
             loader: 'babel-loader',
             options: {
                presets: [
                   "@babel/preset-env"
                ],
                plugins: [
                   "@babel/plugin-proposal-class-properties",
                   "@babel/plugin-proposal-private-methods"
                ]
             }
          }
      }]
   },
   plugins: [
   ]
};
