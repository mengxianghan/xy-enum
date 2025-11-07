import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: {
      html: true,
      markdown: true,
    },
    typescript: true,
  },
  {
    files: ['example/**/*.{ts,html}'],
    rules: {
      'no-console': 'off',
    },
  },
)
