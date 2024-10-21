// babel.config.js

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ["module-resolver", {
      root: [
        "./src"
      ],
      extensions: [
        ".ios.ts",
        ".android.ts",
        ".ts",
        ".ios.tsx",
        ".android.tsx",
        ".tsx",
        ".jsx",
        ".js",
        ".json"
      ],
      alias: {
        "@assets": "./src/assets",
        "@images": "./src/assets/images",
        "@scripts": "./src/assets/scripts",
        "@schemas": "./src/schemas",
        "@containers": "./src/containers",
        "@widgets": "./src/widgets",
        "@imports": "./src/imports"
      }
    }],
    ["module:react-native-dotenv", {
      moduleName: "@env",
      path: ".env",
      safe: false,
      allowUndefined: true
    }]
  ]
};
