import * as path from 'path';
import * as webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

module.exports = (env: { production?: boolean } = {}) => ({
  mode: env.production ? 'production' : 'development',
  entry: {
    app: ['./src/app/index'],
  },
  output: {
    library: 'ReduxDevTools',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'umd'),
    filename: env.production
      ? 'redux-devtools-core.min.js'
      : 'redux-devtools-core.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'url-loader',
        options: { limit: '25000' },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PLATFORM: JSON.stringify('web'),
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'tsconfig.json',
      },
    }),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
});
