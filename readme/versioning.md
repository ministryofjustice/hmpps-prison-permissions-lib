[< Back](../README.md)
---

## Versioning

When making changes to the library, this is the current guidance for versioning:

* Major version bump for breaking changes
  * Anything that would potentially break how clients integrate with the library
  * Major permission logic changes that affect multiple clients

* Minor version bump for new permissions, new permission features or permissions logic changes that have limited impact
  or affect only a single service

* Patch version bump for bug fixes and code refactors

It is expected that changes are accompanied by an entry in the [CHANGELOG](../CHANGELOG.md).
