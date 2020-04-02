const path = require('path');
const webpack = require('webpack');

//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-config-prettier');

let devServerOptions =
{
   stats: {
      // Enables disables colors on the console
      colors: true
   },
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

   // Specify a host to use. If you want your server to be
   // accessible externally, specify it like this:
   // Default is 'localhost'.
   host: '192.168.2.97',

   // This option allows you to whitelist services that are
   // allowed to access the dev server.
   allowedHosts: [
      '192.168.2.*',
      '192.168.2.',
   ],

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
   // So that all the examples work.
   //
   // Note: We allow this to be changed via argv.openPage='<fn>'
   //       which is stupid because we can just use --openPage.
   //       However I confused it with devServer.index which
   //       cannot be set via cli. Why the two is beyond me?
   //openPage: 'index.html'
   openPage: 'makercam5.html'
};

module.exports = (env, argv) =>
{
   console.log("Not bundling pixi.js");
   Externals= {"pixi.js": "PIXI"};

   // The default 'mode' to use.
   Mode='production';

   if ( argv )
   {
      if ( argv.mode )
         if (argv.mode === 'development' )
            // Since this is processed as a command line option
            // (because of argv...) the mode must be set so that it
            // can be returned as part of the big config entry.
            Mode='development';
         else if ( argv.mode !== 'production' )
            throw new error('unhandled mode:' + argv.mode);

      if ( argv.openPage )
      {
         devServerOptions.openPage = argv.openPage
         console.log("telling devServer to open:" + devServerOptions.openPage);
      }
   }

   return {
      // Since this is processed as a command line option (because of argv...)
      // the mode must be set so that it can be returned as part of the big
      // config entry.
      mode: Mode,

      entry: './com/src/makercam5-entry.ts',
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
         //umdNamedDefine: true,

         // Turn off pathInfo, incrasing build time
         pathinfo: false,
      },
      // For when --watch is specified, automatically compile ...
      watchOptions: {

         // Add a delay before rebuilding once the first file changed.
         aggregateTimeout: 1000,

         // Check for changes every 3 seconds
         poll: 3000,
         ignored: [/node_modules/
                  ]
      },

      devServer: devServerOptions,

      plugins: [
         // Too messy, deal with later
         // new TSLintPlugin({
         //    files: ['./app/partKart/**/*.ts',
         //            './app/src/*.ts'
         //           ]
         // }),

         // Add a plugins section to your webpack.config.js to let
         // know Webpack that the global PIXI variable make reference
         // to pixi.js module. For instance:
         new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
         }),

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
            template: 'com/src/makercam5.html.template',

            // Allows to overwrite the parameters used in the template
            // templateParameters: {Boolean|Pbjects|Function}

            // Inject all assets of template at position
            // inject: true || 'head' || 'body' || false
            inject: 'body',

            // Adds the given favicon path to the output HTML
            // When you touch the URL you will see the bunny
            //favicon: 'bunny.png',

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
      //target: 'umd',
      //target: 'web',
      externals: Externals,
      resolve: {
         // Add '.ts' as resolvable extensions.
         extensions: [".ts", ".js"],
         alias: {
            $: "jquery/src/jquery",
         }
      },
      //optimization: {
      //   minimizer: [
      //      new UglifyJsPlugin({
      //         parallel: true,
      //         uglifyOptions: {
      //            mangle: false
      //         }
      //      })
      //   ]
      //},

      // Seperate source maps
      devtool: "source-map",

      module: {
         rules: [
            {
               test: /\.js$/,
               include: [path.resolve(__dirname, "com")],
               exclude: [
                  // This would be a regular expression
                  /node_modules/,
                  // This would be a path
                  // Omit stuff to be worked on
               ],
               use: {
                  loader: 'babel-loader'
                  // Note. Do not put other compile options here !!!
                  // ts-loader or babel-loader may override them.
                  // i.e ts-loader listFiles: true or
                  //     ts-loader outdir: 'js'
               }
            },
            {
               test: /\.ts$/,
               include: [path.resolve(__dirname, "com")],
               exclude: [
                  // This would be a regular expression
                  /node_modules/,
                  // This would be a path
                  // Omit stuff to be worked on
               ],
               use: {
                  loader: "ts-loader",
                  // Note. Do not put other compile options here !!!
                  // ts-loader or babel-loader may override them.
                  // i.e ts-loader listFiles: true or
                  //     ts-loader outdir: 'js'
                  options: {
                     transpileOnly: true,
                     experimentalWatchApi: true,
                  },
               }
            }
         ]
      },
   };
};
