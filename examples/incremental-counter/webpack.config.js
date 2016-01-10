var path = require('path');
var config = require('madewithlove-webpack-config')({
  sourcePath: 'src',
  outputPath: 'builds/',
  linting: false,
});

// Webpack doesn't play nice with Socket.io
config.node = {
    fs: 'empty',
    tls: 'empty',
}


// We want to use the source code when available.
var pkgSrc = path.join(__dirname, '..', '..', 'src');
var pkgNodeModules = path.join(__dirname, '..', '..', 'node_modules');
var fs = require('fs');

if (fs.existsSync(pkgSrc) && fs.existsSync(pkgNodeModules)) {
    config.resolve = {alias: {'redux-socket-middleware': pkgSrc}};
    config.module.loaders.push({
        test:    /\.js$/,
        loader: 'babel-loader',
        include: pkgSrc,
        query: {
            presets: ['es2015', 'stage-0'],
            plugins: [
                'add-module-exports',
            ],
        },
    })
}

module.exports = config;
