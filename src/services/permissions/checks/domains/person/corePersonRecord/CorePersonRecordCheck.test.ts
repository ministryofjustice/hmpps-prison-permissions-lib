import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { CorePersonRecordPermission } from '../../../../../../types/public/permissions/domains/person/corePersonRecord/CorePersonRecordPermissions'
import { baseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { prisonerProfileEditCheckScenarios } from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheckScenarios'
import { photoReadScenarios } from './photo/PhotoReadScenarios'
import inActiveCaseLoadAndUserHasSomeRolesFromScenarios from '../../../sharedChecks/inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { prisonerProfileSensitiveEditCheckScenarios } from '../../../sharedChecks/prisonerProfileSensitiveEditCheck/PrisonerProfileSensitiveEditCheckScenarios'

describe('Core Person Record', () => {
  scenarioTests<CorePersonRecordPermission>({
    [CorePersonRecordPermission.read_physical_characteristics]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_physical_characteristics]: prisonerProfileEditCheckScenarios,
    [CorePersonRecordPermission.read_photo]: photoReadScenarios,
    [CorePersonRecordPermission.edit_photo]: inActiveCaseLoadAndUserHasSomeRolesFromScenarios([
      Role.PrisonerProfileSensitiveEdit,
      Role.PrisonerProfilePhotoUpload,
    ]),
    [CorePersonRecordPermission.read_place_of_birth]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_place_of_birth]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_military_history]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_military_history]: prisonerProfileEditCheckScenarios,
    [CorePersonRecordPermission.read_name_and_aliases]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_name_and_aliases]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_date_of_birth]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_date_of_birth]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_address]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_address]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_nationality]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_nationality]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_identifiers]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_identifiers]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_phone_numbers]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_phone_numbers]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_email_addresses]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_email_addresses]: prisonerProfileSensitiveEditCheckScenarios,
    [CorePersonRecordPermission.read_distinguishing_marks]: baseCheckScenarios,
    [CorePersonRecordPermission.edit_distinguishing_marks]: prisonerProfileSensitiveEditCheckScenarios,
  })
})
