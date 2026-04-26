// metro.config.js

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const config = {
	transformer: {
		hermesParser: true,
		unstable_enableFlowAutoDetection: true,
	},
	resolver: {
		extraNodeModules: {
			"@assets": `${__dirname}/src/assets`,
			"@images": `${__dirname}/src/assets/images`,
			"@types": `${__dirname}/src/assets/types`,
			"@schemas": `${__dirname}/src/schemas`,
			"@containers": `${__dirname}/src/containers`,
			"@widgets": `${__dirname}/src/widgets`,
			"@exports": `${__dirname}/src/exports`
		}
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
