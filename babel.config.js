// babel.config.js

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@assets": "./src/assets",
          "@images": "./src/assets/images",
          "@scripts": "./src/assets/scripts",
          "@styles": "./src/assets/styles",
          "@types": "./src/assets/types",

          "@bases": "./src/bases",
          "@containers": "./src/containers",
          "@widgets": "./src/widgets",
          "@imports": "./src/imports"
        }
      }
    ]
  ]
};
