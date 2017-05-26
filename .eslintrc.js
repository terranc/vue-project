module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'vue',
  ],
  "env": {
    'browser': true,
    'jquery': true,
    'amd': true,
    'node': true,
    'es6': true,
  },
  // add your custom rules here
  'rules': {
    'eol-last': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'semi': [2, "always", {"omitLastInOneLineBlock": true}],
    'comma-dangle': [2, "only-multiline"],
    'space-before-function-paren': 0,
    'space-unary-ops': 0,
    'no-multiple-empty-lines': [2, {'max': 2, 'maxEOF': 1 }],
    'import/no-unresolved': 0,
    'indent': [2, 2, { 'SwitchCase': 1, 'VariableDeclarator': {'var': 2, 'let': 2, 'const': 3} }],
    // 'no-console': [2, {allow: ['warn', 'error', 'log']}],
    'no-trailing-spaces': 0,  //可以在行末出现空格和tab
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': 0,
  }
}
