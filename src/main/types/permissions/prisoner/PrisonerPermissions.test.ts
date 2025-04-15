import { PrisonerPermission, checkPrisonerAccess, PrisonerPermissions } from './PrisonerPermissions'
import { CorePersonRecordPermission } from '../domains/person/CorePersonRecordPermissions'
import { PersonHealthAndMedicationPermission } from '../domains/person/PersonHealthAndMedicationPermissions'
import { PersonPersonalRelationshipsPermission } from '../domains/person/PersonPersonalRelationshipsPermissions'
import { PersonCommunicationNeedsPermission } from '../domains/personPlanAndNeeds/PersonCommunicationNeedsPermissions'

describe('Prisoner Permissions', () => {
  const prisonerPermissions = (allowed: boolean): PrisonerPermissions => {
    return {
      'prisoner:base-record:read': allowed,

      domainGroups: {
        person: {
          corePersonRecord: {
            'prisoner:core-person-record:height:read': allowed,
            'prisoner:core-person-record:weight:read': allowed,
          },
          personHealthAndMedication: {
            'prisoner:person-health-and-medication:pregnancy:read': allowed,
            'prisoner:person-health-and-medication:type-of-diet:read': allowed,
          },
          personPersonalRelationships: {
            'prisoner:person-personal-relationships:domestic-status:read': allowed,
            'prisoner:person-personal-relationships:number-of-children:read': allowed,
          },
        },
        personPlanAndNeeds: {
          personCommunicationNeeds: {
            'prisoner:person-communication-needs:writing-level:read': allowed,
            'prisoner:person-communication-needs:numeracy:read': allowed,
          },
        },
      },
    } as unknown as PrisonerPermissions
  }

  it.each([
    [CorePersonRecordPermission.read_height, true],
    [CorePersonRecordPermission.read_height, false],
    [CorePersonRecordPermission.read_weight, true],
    [CorePersonRecordPermission.read_weight, false],
  ])('Can check Core Person Record permission: %s is %s', (permission: PrisonerPermission, allowed: boolean) => {
    checkAccess(allowed, permission)
  })

  it.each([
    [PersonHealthAndMedicationPermission.read_pregnancy, true],
    [PersonHealthAndMedicationPermission.read_pregnancy, false],
    [PersonHealthAndMedicationPermission.read_type_of_diet, true],
    [PersonHealthAndMedicationPermission.read_type_of_diet, false],
  ])('Can check Health and Medication permission: %s is %s', (permission: PrisonerPermission, allowed: boolean) => {
    checkAccess(allowed, permission)
  })

  it.each([
    [PersonPersonalRelationshipsPermission.read_number_of_children, true],
    [PersonPersonalRelationshipsPermission.read_number_of_children, false],
    [PersonPersonalRelationshipsPermission.read_domestic_status, true],
    [PersonPersonalRelationshipsPermission.read_domestic_status, false],
  ])(
    'Can check Person Personal Relationships permission: %s is %s',
    (permission: PrisonerPermission, allowed: boolean) => {
      checkAccess(allowed, permission)
    },
  )

  it.each([
    [PersonCommunicationNeedsPermission.read_writing_level, true],
    [PersonCommunicationNeedsPermission.read_writing_level, false],
    [PersonCommunicationNeedsPermission.read_numeracy, true],
    [PersonCommunicationNeedsPermission.read_numeracy, false],
  ])(
    'Can check Person Communication Needs permission: %s is %s',
    (permission: PrisonerPermission, allowed: boolean) => {
      checkAccess(allowed, permission)
    },
  )

  function checkAccess(allowed: boolean, permission: PrisonerPermission) {
    expect(checkPrisonerAccess(permission, prisonerPermissions(allowed))).toBe(allowed)
    expect(checkPrisonerAccess(permission, prisonerPermissions(allowed))).toBe(allowed)
    expect(checkPrisonerAccess(permission, prisonerPermissions(allowed))).toBe(allowed)
    expect(checkPrisonerAccess(permission, prisonerPermissions(allowed))).toBe(allowed)
  }
})
