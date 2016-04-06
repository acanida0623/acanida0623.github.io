module.exports = {
  entry: './src/index.js',
  watch:true,
  output: {
      filename:'./static/bundle.js'
  },
  module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query:
            {
                presets:['es2015', 'react']
            }
        }]
    }
}
