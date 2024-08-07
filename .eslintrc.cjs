// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  settings: {
    'import/resolver': {
      typescript: { project: ['./tsconfig.node.json', './tsconfig.web.json'] }, // 确保你已经安装了eslint-import-resolver-typescript
      alias: {
        map: [
          ['@', './src'],
          ['@renderer', './src/renderer/src']
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json']
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/electron',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-ts/eslint-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error',
    'import/no-unresolved': 'error',
    // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    'array-bracket-spacing': [2, 'never'],
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [2, 'never'],
    // 控制逗号前后的空格
    'comma-spacing': [2, { before: false, after: true }],
    // 控制逗号在行尾出现还是在行首出现
    'comma-style': [2, 'last'],
    // 使用 === 替代 ==
    eqeqeq: [2, 'allow-null'],
    strict: 2, //使用严格模式
    yoda: [2, 'never'], //禁止尤达条件
    'no-alert': 0, //禁止使用alert confirm prompt
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-empty-character-class': 2, //正则表达式中的[]内容不能为空
    'no-eq-null': 2, //禁止对null使用==或!=运算符
    'no-multiple-empty-lines': [1, { max: 2 }], //空行最多不能超过2行
    quotes: [1, 'single'] //引号类型 `` "" ''
  }
};
