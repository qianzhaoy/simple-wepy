module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    __isProd: true,
    getRegExp: true,
    wx: true,
    getCurrentPages: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    'camelcase': [0, { 'properties': 'never' }],
    'indent': ['error', 4],
    'quotes': [2, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'comma-dangle': [2, 'never'],
    'no-var': 2,
    'prefer-const': 2,
    'linebreak-style': 'off',
    'no-param-reassign': 0,
    'func-names': [2, 'as-needed'],
    'space-before-function-paren': ['error', 'never'],
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0
  }
}
