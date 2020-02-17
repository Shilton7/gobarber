module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off', //Não obrigar usar o this
    'no-param-reassign': 'off', //Sequelize
    camelcase: 'off', //Uso de variavel fora do padrão
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], //Declarar variavel next mesmo sem usar
  },
};
