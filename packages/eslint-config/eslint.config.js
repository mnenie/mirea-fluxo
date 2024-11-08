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
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 10 },
        multiline: { max: 1 },
      }],
    },
  },
  {
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
    },
  },
  {
    ignores: [
      'core/client/src/components/ui/*',
    ],
  },
)
