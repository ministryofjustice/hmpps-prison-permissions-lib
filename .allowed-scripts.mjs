import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    // Needed by jest for running tests in watch mode
    'node_modules/fsevents@2.3.3': 'ALLOW',
    // Native solution to quickly resolve module paths, used by jest and eslint
    'node_modules/unrs-resolver@1.10.1': 'ALLOW',
  },
})
