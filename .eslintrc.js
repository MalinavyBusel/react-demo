module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['react'],
  extends: ['airbnb', 'airbnb-typescript'],
  root: true,
  env: {
    es2021: true,
  },
  ignorePatterns: ['**/*.js', '**/*.html', '**/*.css', 'node_modules', 'dist'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    camelcase: 2,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],

    'no-warning-comments': [
      'error',
      { terms: ['todo', 'fixme'], location: 'start' },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'function', next: 'function' },
      { blankLine: 'always', prev: 'function', next: 'block' },
      { blankLine: 'always', prev: 'block', next: 'function' },
    ],
    'no-useless-escape': 0,
    'lines-between-class-members': ['error', 'always'],
    'newline-before-return': 1,
    'no-console': 1,
    'implicit-arrow-linebreak': 'off',
  },
};
