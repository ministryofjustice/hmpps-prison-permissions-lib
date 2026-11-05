import hmppsConfig from '@ministryofjustice/eslint-config-hmpps'

export default [
  ...hmppsConfig({
    extraPathsAllowingDevDependencies: ['jest.config.mjs', 'rollup.config.ts'],
  }),
  {
    rules: {
      'import-x/prefer-default-export': 'off',
    },
  },
]
