module.exports = {
	plugins: [
		require("postcss-import"),
		require("postcss-nested"),
		require("tailwindcss")("./tailwind.config.js"),
		process.env.NODE_ENV === "production" && [
			[
				"@fullhuman/postcss-purgecss",
				{
					content: [
						"./pages/**/*.{js,jsx,ts,tsx}",
						"./components/**/*.{js,jsx,ts,tsx}",
					],
					defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
				},
			],
		],
		require(`postcss-preset-env`),
	].filter(Boolean),
}
