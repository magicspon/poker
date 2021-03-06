process.env.BABEL_ENV = "test"

module.exports = function (wallaby) {
	return {
		files: [
			{ pattern: ".env", instrument: false },
			"jest.config.js",
			"__tests__/**/*.js",
			"**/*.js?(x)",
			"!**/*.test.js?(x)",
		],

		filesWithNoCoverageCalculated: [
			"**/*.stories.js",
			"src/style/**/*.js",
			"__tests__/__mocks__/*.js",
			"__tests__/utils/*.js",
		],

		tests: ["**/*.test.js?(x)"],

		env: {
			type: "node",
			params: {
				env: "wallaby=test",
			},
		},

		compilers: {
			"**/*.js?(x)": wallaby.compilers.babel(),
		},

		testFramework: "jest",

		debug: false,

		// eslint-disable-next-line no-shadow
		setup() {
			const path = require("path")
			const config = require(path.join(process.env.PWD, "./jest.config"))

			config.rootDir = "./"

			config.setupFilesAfterEnv = [
				path.join(process.env.PWD, "./scripts/setup-tests.js"),
			]
			// config.setupFilesAfterEnv = './__tests__/utils/test-setup.ts'
			wallaby.testFramework.configure(config)
		},
	}
}
