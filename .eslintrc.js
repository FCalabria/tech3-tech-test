module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/recommended",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "overrides": [
    {
      "files": [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
        "**/tests/integration/**/*.spec.{j,t}s?(x)"
      ],
      "env": {
        "jest": true
      }
    }
  ]
}