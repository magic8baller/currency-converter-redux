const {override, fixBabelImports, addBabelPreset} = require('customize-cra');

module.exports = override(
	addBabelPreset('@emotion/babel-preset-css-prop'),
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
	}),
);