# Changelog
All notable change to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.4] - 2023-02-09
### Changed
- Update readme to include info about adding the new repo to the team responsible for it
### Removed
- express-jwt dependency since service-common handles the expressJwt() logic now so it is no longer needed
### Security
- resolve audit vulnerabilities

## [2.1.2] - 2022-07-06
### Security
- Upgrade Postgres for Travis build

## [2.1.1] - 2022-06-20
### Changed
- update readme for service-common integration

## [2.1.0] - 2022-06-14
### Changed
- integrate service-common features: service context, error classes, error handling, start-up and terminus

## [2.0.0] - 2022-06-01
### Changed
- Bump all mylo modules
- Added engines; Major version bump because of dependency on node 16
- Audit fix

## [1.9.1] - 2021-12-17
### Changed
- Put example endpoint on example route
- reversed content type for echo (easier to demo)

## [1.9.0] - 2021-12-13
### Added
- Error classes
- error handling middleware
- route and service examples for using new errors

## [1.8.1] - 2021-10-29
### Added
- Instructions for what to do with this repo

## [1.8.0] - 2021-10-29
### Added
- Updated dependencies
- Node 16

## [1.6.0] - 2020-08-24
### Added
- Add SQS functionality
- Add example event handler for SQS

## [1.5.2] - 2020-08-20
### Fixed
- `npm audit fix` and `npm upgrade`
- bring `@mylo` packages up to date with latest

## [1.4.11] - 2020-02-05
### Changed
- Updated README documentation to include docker variables

## [1.4.10] - 2020-06-25
### Fixed
- Update node to 12 in README

## [1.4.6] - 2020-01-24
### Changed
- Update node to 12

## [1.4.5] - 2020-01-21
### Changed
- Update dependencies
- Update hotfix process

## [1.4.2] - 2019-12-13
### Changed
- Fixed typo in README

## [1.4.0] - 2019-12-3
### Added
- Danger configuration

## [1.3.2] - 2019-10-15
### Added
- New postgres reference in build
- Coverage minimums
- Diagnostic endpoints route
### Changed
- Updated node to v10
### Removed
- No more coverage push

## [1.3.1] - 2019-10-07
### Added
- Changelog
