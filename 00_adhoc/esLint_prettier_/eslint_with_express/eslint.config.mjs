import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{
		languageOptions: { globals: globals.node },
		rules: {
			// Indentation rule: tabs
			indent: ["error", "tab"],
			// Space before function parenthesis
			"space-before-function-paren": ["error", "always"],
			// No space inside parentheses
			"space-in-parens": ["error", "never"],
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
