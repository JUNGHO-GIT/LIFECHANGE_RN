// metro.config.js

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const config = {
  resolver: {
    extraNodeModules: {
      "@assets": `${__dirname}/src/assets`,
      "@images": `${__dirname}/src/assets/images`,
      "@scripts": `${__dirname}/src/assets/scripts`,
      "@styles": `${__dirname}/src/assets/styles`,
      "@types": `${__dirname}/src/assets/types`,
      "@bases": `${__dirname}/src/bases`,
      "@containers": `${__dirname}/src/containers`,
      "@widgets": `${__dirname}/src/widgets`,
      "@imports": `${__dirname}/src/imports`
    }
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);