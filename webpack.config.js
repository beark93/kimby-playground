import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __dirname = path.resolve();
const tsConfigPath = path.resolve(__dirname, 'tsconfig.json');

export default function config(_, argv) {
  return {
    devtool: argv.mode ? 'source-map' : 'cheap-module-source-map',
    mode: argv.mode,
    entry: path.join(__dirname, 'src/index.tsx'),
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
      static: path.join(__dirname, 'dist'),
      proxy: {
        '/api': {
          target: 'https://diablo2.io/dclone_api.php',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    output: {
      publicPath: '/',
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsConfigPath,
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CleanWebpackPlugin(),
    ],
  };
}
