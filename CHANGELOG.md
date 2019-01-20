# Change Log

Follows [Semantic Versioning](https://semver.org/).

## [0.3.0] -- 2019-01-20

### Added

- Add reload action for when `.git-coauthors` changes
- Change `.git-coauthors` in VS Code and the Git Mob UI list will update
- UI updated to include icons for selected and unselected co-authors

### Fixed

- On Mac opening the `.git-coauthors` file failed
- Attached the open `.git-coauthors` button on other extension title bars

## [0.2.0] -- 2019-01-12

### Added

- Open the `.git-coauthors` file from Git Mob title bar
- Can action git solo from the "Selected" group
- Icon added to Author and Co-Author items

## [0.1.1] -- 2018-12-30

### Added

- Query installed Git Mob terminal app to find co-authors status for commit
- Add and remove co-authors for commit messages
- Supports adding co-authors to SCM input box or via git `prepare-commit-message` hook
- Changing co-authors in the terminal is reflected in the UI when returning to VS code

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.
