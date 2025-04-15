import { PrisonerPermission, prisonerPermission, PrisonerPermissions } from './PrisonerPermissions'
import { Operations } from '../Operations'
import { CorePersonRecordPermission } from '../domains/person/CorePersonRecordPermissions'
import { PersonHealthAndMedicationPermission } from '../domains/person/PersonHealthAndMedicationPermissions'
import { PersonPersonalRelationshipsPermission } from '../domains/person/PersonPersonalRelationshipsPermissions'
import { PersonCommunicationNeedsPermission } from '../domains/personPlanAndNeeds/PersonCommunicationNeedsPermissions'

describe('Prisoner Permissions', () => {
  const prisonerPermissions = (allTrue: boolean): PrisonerPermissions => {
    const crudOperations: Operations = { create: allTrue, read: allTrue, update: allTrue, delete: allTrue }
    return {
      'prisoner:basic': { read: allTrue },

      // domainGroups: {
      //   person: {
      //     corePersonRecord: {
      //       'prisoner:core-person-record:height': crudOperations,
      //       'prisoner:core-person-record:weight': crudOperations,
      //     },
      //     personHealthAndMedication: {
      //       'prisoner:person-health-and-medication:pregnancy': crudOperations,
      //       'prisoner:person-health-and-medication:type-of-diet': crudOperations,
      //     },
      //     personPersonalRelationships: {
      //       'prisoner:person-personal-relationships:domestic-status': crudOperations,
      //       'prisoner:person-personal-relationships:number-of-children': crudOperations,
      //     },
      //   },
      //   personPlanAndNeeds: {
      //     personCommunicationNeeds: {
      //       'prisoner:person-communication-needs:writing-level': crudOperations,
      //       'prisoner:person-communication-needs:numeracy': crudOperations,
      //     },
      //   },
      // },
    } as PrisonerPermissions
  }

  it.each([
    [CorePersonRecordPermission.height, true],
    [CorePersonRecordPermission.height, false],
    [CorePersonRecordPermission.weight, true],
    [CorePersonRecordPermission.weight, false],
  ])('Can check Core Person Record permission: %s is %s', (permission: PrisonerPermission, allTrue: boolean) => {
    checkCrudOperations(allTrue, permission)
  })

  it.each([
    [PersonHealthAndMedicationPermission.pregnancy, true],
    [PersonHealthAndMedicationPermission.pregnancy, false],
    [PersonHealthAndMedicationPermission.typeOfDiet, true],
    [PersonHealthAndMedicationPermission.typeOfDiet, false],
  ])('Can check Health and Medication permission: %s is %s', (permission: PrisonerPermission, allTrue: boolean) => {
    checkCrudOperations(allTrue, permission)
  })

  it.each([
    [PersonPersonalRelationshipsPermission.numberOfChildren, true],
    [PersonPersonalRelationshipsPermission.numberOfChildren, false],
    [PersonPersonalRelationshipsPermission.domesticStatus, true],
    [PersonPersonalRelationshipsPermission.domesticStatus, false],
  ])(
    'Can check Person Personal Relationships permission: %s is %s',
    (permission: PrisonerPermission, allTrue: boolean) => {
      checkCrudOperations(allTrue, permission)
    },
  )

  it.each([
    [PersonCommunicationNeedsPermission.writingLevel, true],
    [PersonCommunicationNeedsPermission.writingLevel, false],
    [PersonCommunicationNeedsPermission.numeracy, true],
    [PersonCommunicationNeedsPermission.numeracy, false],
  ])(
    'Can check Person Communication Needs permission: %s is %s',
    (permission: PrisonerPermission, allTrue: boolean) => {
      checkCrudOperations(allTrue, permission)
    },
  )

  function checkCrudOperations(allTrue: boolean, permission: PrisonerPermission) {
    expect(prisonerPermission(permission, prisonerPermissions(allTrue)).create).toBe(allTrue)
    expect(prisonerPermission(permission, prisonerPermissions(allTrue)).read).toBe(allTrue)
    expect(prisonerPermission(permission, prisonerPermissions(allTrue)).update).toBe(allTrue)
    expect(prisonerPermission(permission, prisonerPermissions(allTrue)).delete).toBe(allTrue)
  }
})
