import hmppsConfig from '@ministryofjustice/eslint-config-hmpps'

export default hmppsConfig({
  extraPathsAllowingDevDependencies: ['jest.config.mjs', 'rollup.config.ts'],
})
