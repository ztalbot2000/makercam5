const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) =>
{
   Externals = {};

   //if (argv && argv.mode && argv.mode ="production")
   if ( argv && argv.mode && argv.mode == "production" )
   {
      // do production related things here
      // Hmm required for mocha but not for build ...
      console.log("Not bundling pixi.js");
      Externals= {"pixi.js": "PIXI"};
   } else {
      // do non-production related things here
      console.log("pixi.js will be bundled for testing");
   }

   return [  // We have two entries. One for makercam5App and the other for the library of  pixi-ui.
             // Note: you need my patch to fix mochapack handling arrays.
      {
         entry: './app/src/makercam5-entry.ts',
         output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'makercam5App.js',
            /// At this time the Grid class is the only thing that works
            // and since it extends Sprite, it cannot be a Library.
            // pixi-ui would be a library and it will be created as such
            // with another entry point. so for now, leave these commented out.
            // The library name means you would access it via makercam5.Grid.
            //library: 'makercam5',
            //libraryTarget: 'umd',
            //umdNamedDefine: true
         },
         // For when --watch is specified, automatically compile ...
         watchOptions: {

            // Add a delay before rebuilding once the first file changed.
            aggregateTimeout: 1000,

            // Check for changes every 3 seconds
            poll: 3000,
            ignored: ['app/uitry',
                      'test/uitry',
                      /node_modules/
                     ]
         },

         devServer: {
            // Tell the server where to serve content from (Static files only).
            // It is recommended to use an absolute path.
            contentBase: path.join(__dirname, 'dist'),

            // The bundled files will be available in the browser under this path.
            // Make sure devServer.publicPath always starts and ends with a forward slash.
            publicPath: '/dist/',

            // The filename that is considered the index file.
            index: 'makercam5.html',

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

            // By default, the dev-server will reload/refresh the page when file changes are detected.
            // devServer.hot option must be disabled or devServer.watchContentBase option must be enabled
            // in order for liveReload to take effect.
            liveReload: true,

            // Enable webpack's Hot Module Replacement feature:
            // Note: requires a lot of other stuff too in index.html ...
            hot: false,

            onListening: function(server) {
               const port = server.listeningApp.address().port;
               console.log('Listening on port:', port);
            },

            // Tells dev-server to open the browser after server had been started.
            open: true,

            // Specify a page to navigate to when opening the browser.
            openPage: 'makercam5.html'
         },
         plugins: [

            // The plugin will generate an HTML5 file for you that includes
            // all your webpack bundles in the body using script tags.
            new HtmlWebpackPlugin({

               // The file to write the HTML to. Defaults to index.html.
               // It will be placed in path: above.  You can add further
               // subdirectories if need be
               filename: 'makercam5.html',

               // The title to use in the generated HTML document
               title: 'Makercam5',

               // Instead of the default template that would be created
               // Use ours.
               template: 'app/src/makercam5.html.template',

               // Allows to overwrite the parameters used in the template
               // templateParameters: {Boolean|Pbjects|Function}

               // Inject all assets of template at position
               // inject: true || 'head' || 'body' || false
               inject: 'body',

               // Adds the given favicon path to the output HTML
               // When you touch the URL you will see the bunny
               favicon: 'bunny.png',

               // Inject the following meta tags
               meta: {
                  VIEWPORT: 'WIDTH=device-width, INITIAL-SCALE=1, SHRINK-TO-FIT=no'
               },

               // Inject a base tag.
               // E.g. base: "https://example.com/path/page.html
               base: 'http://localhost/~zarf',

               // Controls if and in what ways the output should be minified.
               // Default is only true for production mode
               minify: false,

               // Emit the file only if it was changed. Default is true.
               cache: true,

               // Errors details will be written into the HTML page.
               // Default is true.
               showErrors: true,

              // Allows you to add only some chunks (See docs)
              // (e.g only the unit-test chunks)
              // chunks:
              // chunksSortMode:
              // excludeChunks:

              // true render the link tags as self-closing (XHTML compliant)
              xhtml: false

            })
         ],
         target: 'web',
         externals: Externals,
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

         // Seperate source maps
         devtool: "source-map",

         module: {
            rules: [
               {
                  test: /\.js$/,
                  include: [path.resolve(__dirname, "app")],
                  exclude: [
                     // This would be a regular expression
                     /node_modules/,
                     // This would be a path
                     // Omit stuff to be worked on
                      '/app/ui/',        // We are doing partKart so omit UI
                      '/test/ui',        // We are doing partKart so omit UI
                      '/app/uitry/',     // Omit all uitry
                      '/test/uitry'      // Omit all uitry
                  ],
                  use: {
                     loader: 'babel-loader'
                     // Note. Do not put options here !!!
                     // ts-loader or babel-loader may override them.
                     // i.e ts-loader listFiles: true or
                     //     ts-loader outdir: 'js'
                  }
               },
               {
                  test: /\.ts$/,
                  include: [path.resolve(__dirname, "app")],
                  exclude: [
                     // This would be a regular expression
                     /node_modules/,
                     // This would be a path
                     // Omit stuff to be worked on
                     '/app/ui/',         // We are doing partKart so omit UI
                     '/test/ui',         // We are doing partKart so omit Ui
                     '/app/uitry/',      // Omit all uitry
                     '/test/uitry'       // Omit all uitry
                  ],
                  use: {
                     loader: "ts-loader"
                     // Note. Do not put options here !!!
                     // ts-loader or babel-loader may override them.
                     // i.e ts-loader listFiles: true or
                     //     ts-loader outdir: 'js'
                  }
               }
            ]
         },
      },
      {
         entry: './app/src/pixi-ui-entry.ts',
         output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'pixi-ui.js',
            // The library name means you would access it via pixi-ui.button.
            library: 'pixi-ui',
            libraryTarget: 'umd'
         },
         plugins: [
         ],
         target: 'web',
         externals: Externals,
         resolve: {
            // Add '.ts' as resolvable extensions.
            extensions: [".ts", ".js"],
            alias: {
               $: "jquery/src/jquery",
            }
         },
         optimization: {
            minimize: false,
         },

         // Enable sourcemaps for debugging webpack's output.
         // // devtool: "source-map" // without any, there is no sourcemap
         //devtool: "eval"  // none
         devtool: "source-map", // one big blob
         //devtool: "eval-source-map"  // none

         module:
         {
            rules: [
               {
                  test: /\.js$/,
                  include: [path.resolve(__dirname, "app")],
                  exclude: [
                     // This would be a regular expression
                     /node_modules/,
                     // This would be a path
                     // Omit stuff to be worked on
                     '/app/partKart',    // We are doing UI so omit partKart
                     '/test/partKart',   // We are doing UI so omit partKart
                     '/app/uitry',       // Omit all uitry
                     '/test/uitry/'      // Omit all uitry
                  ],
                  use: {
                     loader: 'babel-loader',
                     // Note. Do not put options here !!!
                     // ts-loader or babel-loader may override them.
                     // i.e ts-loader listFiles: true or
                     //     ts-loader outdir: 'js'
                  }
               },
               {
                  test: /\.ts$/,
                  include: [path.resolve(__dirname, "app")],
                  exclude: [
                     // This would be a regular expression
                     /node_modules/,
                     // This would be a path
                     // Omit stuff to be worked on
                     '/app/partKart',    // We are doing UI so omit partKart
                     '/test/partKart',   // We are doing UI so omit partKart
                     '/app/uitry',       // Omit all uitry
                     '/test/uitry/'      // Omit all uitry
                  ],
                  use: {
                     loader: "ts-loader"
                     // Note. Do not put options here !!!
                     // ts-loader or babel-loader may override them.
                     // i.e ts-loader listFiles: true or
                     //     ts-loader outdir: 'js'
                  }
               }
            ]
         },
      }
   ];
};
