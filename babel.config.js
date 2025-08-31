// babel.config.js

module.exports = {
	presets: [
		'module:@react-native/babel-preset'
	],
	plugins: [
		['module-resolver', {
			root: [
				'./src'
			],
			extensions: [
				'.android.ts',
				'.ts',
				'.android.tsx',
				'.tsx',
				'.jsx',
				'.js',
				'.json'
			],
			alias: {
				'@assets': './src/assets',
				'@images': './src/assets/images',
				'@types': './src/assets/types',
				'@schemas': './src/schemas',
				'@containers': './src/containers',
				'@widgets': './src/widgets',
				'@imports': './src/imports'
			}
		}],
		['module:react-native-dotenv', {
			moduleName: '@env',
			path: '.env',
			safe: false,
			allowUndefined: true
		}]
	]
};
