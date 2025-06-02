module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
      ['babel-plugin-inline-import', { extensions: ['.sql'] }],
      'react-native-reanimated/plugin',
    ],
  }
}
