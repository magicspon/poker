// For reasons unknown, storybook doesn't work when using the string format
// and nextjs doesn't work using the function format.
// STORYBOOK_ENV is set in the script

const isStorybook = process.env.STORYBOOK_ENV === "storybook"

module.exports = {
	plugins: [
		isStorybook ? require("tailwindcss") : "tailwindcss",
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
		isStorybook ? require(`postcss-preset-env`) : "postcss-preset-env",
	].filter(Boolean),
}
