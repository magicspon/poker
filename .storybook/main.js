const path = require("path")

module.exports = {
	stories: ["../components/**/*.stories.js"],

	addons: ["@storybook/addon-actions", "@storybook/addon-links"],

	webpackFinal: async (config) => {
		const { rules } = config.module

		config.resolve.alias["@"] = path.resolve(__dirname, "..")

		config.module.rules = rules
			.filter((f) => f.test.toString() !== "/\\.css$/")
			.filter((f) => f.test.toString() !== "/\\.module\\.css$/")

		config.module.rules.push(
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},

			{
				test: /\.module\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								mode: "local",
							},
						},
					},
					"postcss-loader",
				],
			}
		)

		return config
	},
}
