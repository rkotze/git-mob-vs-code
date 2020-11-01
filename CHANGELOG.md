# Change Log

Follows [Semantic Versioning](https://semver.org/).

## 1.10.0 -- current

### Added

- Select multiple CoAuthors to mob program with [Issue 46](https://github.com/rkotze/git-mob-vs-code/issues/46)
- set `.git-coauthors` language to JSON
- Add linting to CI pipeline
- Make search options for Git repository and GitHub available in context menu
- Open Git Mob settings from context menu

## [1.9.0] -- 2020-10-18

### Added

- Support using Git Mob CLI as a dev dependency instead of global only using npx. Container will show install options if no cli version detected. [Issue 44](https://github.com/rkotze/git-mob-vs-code/issues/44)

## [1.8.0] -- 2020-10-04

### Added

- Enable user to search GitHub for users that don't exist in current repository. [Issue 15](https://github.com/rkotze/git-mob-vs-code/issues/15)
- Minor UI updates, show emails for co-authoring, unselected and author to make it clear which account is being used.

## [1.7.0] -- 2020-08-15

### Added

- Toggle setting to move selected co-authors to unselected after a commit, default false. [Issue 43](https://github.com/rkotze/git-mob-vs-code/issues/43)
- Toggle setting to expand "More authors" on start by default true.

## [1.6.0] -- 2020-08-01

### Added

- Change primary author from co-author list [Issue 42](https://github.com/rkotze/git-mob-vs-code/issues/42)
- Starting a new Git repo from VS Code editor will initialize Git Mob as well [Issue 41](https://github.com/rkotze/git-mob-vs-code/issues/41)

![Change primary author](https://user-images.githubusercontent.com/10452163/89105613-6d86a400-d41a-11ea-88ec-25b34a084598.gif)

## [1.5.4] -- 2020-07-04

### Fixed

- On Mac OS users opening workspaces might see an error notification appear when contacting Git Mob CLI [Issue 39](https://github.com/rkotze/git-mob-vs-code/issues/39)

## [1.5.3] -- 2020-05-10

### Fixed

- List updates when solo action clicked and "selected" is collapsed [Issue 36](https://github.com/rkotze/git-mob-vs-code/issues/36)
- Code improvements making it easier to reason about and is more idiomatic vscode extension code. [Issue 35](https://github.com/rkotze/git-mob-vs-code/issues/35)

## [1.5.2] -- 2020-04-26

### Fixed

- Fix timing issue with dependency on `vscode.git`. Sometimes Git Mob will trigger before the Git repositories are registered in VS code.

## [1.5.0] -- 2020-04-23

### Added

- Support workspaces, be able to select one of multiple Git repositories and update with co-author metadata [Issue 31](https://github.com/rkotze/git-mob-vs-code/issues/31)

<img alt="Workspace support" src="https://user-images.githubusercontent.com/10452163/80038666-08074b00-84ee-11ea-9565-26c9f755d512.gif" width="320" />

- Gitmoji, search and select from the standardized emojis for commit message [Issue 32](https://github.com/rkotze/git-mob-vs-code/issues/32)

![git emojis select list](https://user-images.githubusercontent.com/10452163/79442052-ef6bd200-7fcf-11ea-85c1-82789738add3.png)

### Fixed

- Prevent the main Git Mob action icons from showing on other views like "output" [Issue 34](https://github.com/rkotze/git-mob-vs-code/issues/34)

## [1.4.0] -- 2020-04-13

### Added

- Handle broken UI when no Git author or missing Git Mob list command [Issue 29](https://github.com/rkotze/git-mob-vs-code/issues/29)
- Enable users to input a co-author manually using VS code inputs [Issue 4](https://github.com/rkotze/git-mob-vs-code/issues/4)

### Fixed

- Update dependencies: latest vscode engine and security patches in dev dependencies
- Introduce End to End testing using Jest as the test runner

## [1.3.0] -- 2019-10-09

### Added

- Handle opening `.git-coauthors` file if users specify the path using environment variable `GITMOB_COAUTHORS_PATH`.
- Tweet action to encourage users to share extension. [Tweet about Git Mob](https://twitter.com/intent/tweet?hashtags=GitHub,WebDev&text=I%20use%20Git%20Mob%20for%20co-authoring%20commits.%20Try%20it%20out:%20https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob)

### Fixed

- Open VS Code in sub-directory of a project Git Mob does not show co-authors [Issue 26](https://github.com/rkotze/git-mob-vs-code/issues/26).
- Open git-coauthors file from sidebar doesn't work on Windows [Issue 21](https://github.com/rkotze/git-mob-vs-code/issues/21).

## [1.2.0] -- 2019-09-26

### Added

- Support Git Mob feature [overwrite main author](https://github.com/findmypast-oss/git-mob#overwrite-the-main-author) to excluding the main author in unselect or select list. Reduce confusion when you're the main author.

### Fixed

- Git Mob authors fails to show with private emails and special chars in initials key
- Upgrade dependencies to address GitHub security alerts

## [1.1.1] -- 2019-05-16

### Fixed

- Keep consistent behaviour of adding more authors to unselected list instead of straight to selected.

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
