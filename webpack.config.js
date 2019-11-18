const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = function(env)
{
   Externals = {};

    // ...
   // Hmm required for mocha but not for build ...
   if ( env && env.test != 'true' ) {
      // Don't bundle pixi.js, assume it'll be included in the HTML via a script
      Externals= {"pixi.js": "PIXI"};
      console.log("Not bundling pixi.js");
   } else {
      console.log("pixi.js will be bundled for testing");
   }
   return {
      entry: './app/src/main.js',
      output: {
         filename: 'makercam5.js',
         path: path.resolve(__dirname, './dist')
      },
      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",
   
      devServer: {
         // Tell the server where to serve content from (Static files only).
         // It is recommended to use an absolute path.
         contentBase: path.join(__dirname, 'dist'),
   
         // The bundled files will be available in the browser under this path.
         // Make sure devServer.publicPath always starts and ends with a forward slash.
         publicPath: '/dist/',
   
         // The filename that is considered the index file.
         index: 'index.html',
   
         // Enable gzip compression for everything served:
         compress: false,
   
         // Specify a port number to listen for requests on.
         port: 9000,
   
         // Enables/Disables colors on the console
         // Available on cli only --color
         // color: true,
   
         // Tell dev-server to watch the files served by the devServer.contentBase option.
         // It is disabled by default. When enabled, file changes will trigger a full page reload.
         watchContentBase: true,
   
         // Control options related to watching the files.
         // webpack uses the file system to get notified of file changes.
         // In some cases this does not work.
         // In these cases, use polling:
         watchOptions: {
            // Set to 5 seconds
            poll: 5000
         },
   
         // By default, the dev-server will reload/refresh the page when file changes are detected. devServer.hot option must be disabled or devServer.watchContentBase option must be enabled in order for liveReload to take effect.
         liveReload: true,
         onListening: function(server) {
            const port = server.listeningApp.address().port;
            console.log('Listening on port:', port);
         },
   
         // Tells dev-server to open the browser after server had been started.
         open: true,
   
         // Specify a page to navigate to when opening the browser.
         openPage: 'index.html'
      },
      target: 'node',
      externals: Externals,
      //externals: [
           //{"pixi.js": "PIXI"}
      //],
      node: {
         fs: 'empty',
         net: 'empty',
         tls: 'empty'
      },
      resolve: {
         // Add '.ts' as resolvable extensions.
         extensions: [".ts", ".js"],
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
};
