module.exports = function config(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            app: './src',
            '@': './src/components',
            '%': './src/screens',
            '#': './src/shared',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          allowUndefined: false,
        },
      ],
    ],
  };
};
