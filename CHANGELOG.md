# Change Log

Follows [Semantic Versioning](https://semver.org/).

## [1.1.0] -- 2019-05-15

### Added

- Search for & select an author from the "More Authors" list (all contributors to the repository).

### Fixed

- Fix security alert for dependency

## [1.0.2] -- 2019-04-10

### Fixed

- Git Mob title bar actions showing on other extension bars (see issue [#16](https://github.com/rkotze/git-mob-vs-code/issues/16))
- Add two EOL between co-authors meta data and message for VS Code Git text input field

## [1.0.1] -- 2019-02-09

### Fixed

- Install `git-mob` when the extension is installed to make it easier to get going (see issue [#9](https://github.com/rkotze/git-mob-vs-code/issues/9))

## [1.0.0] -- 2019-02-09

### Added

- Add a repo author into co-author file (see issue [#13](https://github.com/rkotze/git-mob-vs-code/issues/13))

### Fixed

- Allow co-author key to be longer than 3 characters and have other characters

## [0.4.0] -- 2019-01-27

### Added

- Show if using git-template or prepare-commit-msg hook in the status bar (see issue [#2](https://github.com/rkotze/git-mob-vs-code/issues/2))

### Fixed

- Git Mob will not run if a git repo is not open (see issue [#8](https://github.com/rkotze/git-mob-vs-code/issues/8))
- Entering text into SCM input box removed when added on refocusing of vs code (see issue [#12](https://github.com/rkotze/git-mob-vs-code/issues/12))

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
