import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/html-self-closing': ['warn', {
        html: {
          void: 'always',
          normal: 'never',
        },
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 10 },
        multiline: { max: 1 },
      }],
      'vue/multi-word-component-names': 'warn',
    },
  },
  {
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
    },
  },
)
