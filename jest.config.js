module.exports = {
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"src/**/*.js",
	],
	setupFilesAfterEnv: ["<rootDir>/scripts/setup-tests.js"],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/.next/",
		"/.storybook/",
		"/scripts/",
		"/styles/",
	],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
		"^.+\\.css$": "<rootDir>/scripts/cssTransform.js",
	},
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
	moduleNameMapper: {
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
	},
}
