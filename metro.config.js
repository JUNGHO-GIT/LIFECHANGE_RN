// metro.config.js

const {getDefaultConfig: gtDefCfg, mergeConfig} = require('@react-native/metro-config');
const config = {
	transformer: {
		hermesParser: true,
		unstable_enableFlowAutoDetection: true,
	},
	resolver: {
		extraNodeModules: {
			"@assets": `${__dirname}/src/assets`,
			"@svgs": `${__dirname}/src/assets/svg`,
			"@types": `${__dirname}/src/assets/types`,
			"@schemas": `${__dirname}/src/schemas`,
			"@containers": `${__dirname}/src/containers`,
			"@widgets": `${__dirname}/src/widgets`,
			"@exports": `${__dirname}/src/exports`
		}
	},
};

module.exports = mergeConfig(gtDefCfg(__dirname), config);
