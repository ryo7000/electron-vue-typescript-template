'use strinct';

const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config');

function startRenderer() {
  return new Promise((resolve, reject) => {
    const options = {
      contentBase: path.join(__dirname, '../dist'),
      quiet: true,
      before(app, ctx) {
        ctx.middleware.waitUntilValid(() => {
          resolve();
        });
      },
      hot: true,
      host: 'localhost'
    };
    WebpackDevServer.addDevServerEntrypoints(config, options);

    const compiler = webpack(config);
    compiler.hooks.done.tap('done', stats => {
      console.log(stats.toString({colors: true, chunks: false}));
    });

    const server = new WebpackDevServer(compiler, options);
    server.listen(8080);
  });
}

function startElectron() {
  const electron = require('electron');
  const electronProcess = spawn(electron, ['.']);
  electronProcess.on('close', () => {
    process.exit();
  });
}

async function start() {
  await startRenderer();
  startElectron();
}

start();

