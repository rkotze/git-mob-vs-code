# Change Log

Follows [Semantic Versioning](https://semver.org/).

## Next version

## 1.22.0

### Added

- Integrate `git-mob-core v0.10.0` wit new message formatter function.

### Fixed

- Fix Git Mob start up error with new project and initialising a new Git repo.

## 1.21.1

### Fixed

- When executing the solo sequence post-commit the unselected author gets the "plus" action instead a "minus" icon. [Issue 380](https://github.com/rkotze/git-mob-vs-code/issues/380)

## 1.21.0

### Added

- Update the list Gitmoji's to latest - thanks @regisbsb

### Removed

- Clean up documentation PAT config not used any more for any commands.

## 1.20.1

### Added

- Use `git-mob-core` to search GitHub users replacing what is in the extension. The limitation is core API does not allow a PAT key and won't get authors selected email (will just return GH anonymous email). Less code to maintain across tools.

### Fixed

- On launching vs code error modal appears, when no path set for the commit template, default to the global template. [Issue 302](https://github.com/rkotze/git-mob-vs-code/issues/302)
- Save to commit template on reload or start of vs code if any authors are selected. List object was in wrong format.

## 1.20.0

### Added

- Integrate features from `git-mob-core` `v0.8.2` - see [PR 266](https://github.com/rkotze/git-mob-vs-code/pull/266) for details
  - Create new `.git-coauthors` file and temp one for UI tests
  - Use core `Author` class
  - Remove usage of old `gitAuthors` internal function, was moved into test folder as it's needed there.
  - Get repo contributors `repoAuthorList`
  - Fetch user from GitHub
  - Removed old Git commands and rev parse exec files.
- Integrate breaking changes from `git-mob-core` `v0.9.x`
  - `getPrimaryAuthor`, `getSelectedCoAuthors`, `setPrimaryAuthor` now use promises
  - Remove usage of old `gitAuthors` internal function in UI test folder replace with `git-mob-core` library

### Fixed

- VS code UI not updated after saved changes in `.git-coauthor` file.
- After UI tests run clean up temporary files, `.git-coauthors` and `.gitmessage`.

## 1.19.0

### Added

- Refactor approach for managing the co-author group lists by using a memorized and facade approach. There is less logic involved and making it easier to read.
- Performance gain to render the list UI in the SCM panel.
- Removed most of the old `git-mob-api` which is replaced by the new `git-mob-core` API, part of the migration.

## 1.18.0

### Added

- Integrated `git-mob-core` v0.5.0 new shared library between Git Mob cli and VS Code.
- New feature: add `.git-coauthors` file to your Git repository will be used instead of global one.

## 1.17.2

### Fixed

- Stop the Git Mob list from reloading and making it difficult to update the commit message text input.
- On reload co authors in selected would duplicate in unselected lists
- Ensure counts are correct when selecting a co author

## 1.17.1

### Fixed

- Extension breaks if the user's name is empty from GitHub [issue 152](https://github.com/rkotze/git-mob-vs-code/issues/152). Replaced empty name property with `username` (`login` property).

### Note

- CI build step in GitHub actions.
- Add publish step for GitHub actions
- Published to [open VSX registry](https://open-vsx.org/extension/RichardKotze/git-mob). Addresses [issue 122](https://github.com/rkotze/git-mob-vs-code/issues/122).

## 1.17.0

### Added

- Global Git Mob means that you will have the same selected co-authors when switching between projects. Read more on [migrating from local commit template](https://github.com/rkotze/git-mob-vs-code/discussions/120).
- Reload icon added to project folder item.
- By default fetch anonymous email from GitHub [issue 101](https://github.com/rkotze/git-mob-vs-code/issues/101)

## 1.16.0 -- 2020-03-03

### Added

- Use command palette to select co-authors from unselected and repo contributors [issue 82](https://github.com/rkotze/git-mob-vs-code/issues/82) This also enables adding multiple repo contributors at once with the multi-selector command palette.
- Right-click on co-author item and copy co-author to clipboard [issue 79](https://github.com/rkotze/git-mob-vs-code/issues/79)

### Fixes

- Clean up unused icons and use VS Code provided icons to match the editors UI.
- When selecting a repo contributor from search command palette, fix flow of adding them to selected for co-authoring if setting is enabled.

## 1.15.0 -- 2022-01-22

### Added

- Toggle authors in alphabetical order ascending or descending [issue 73](https://github.com/rkotze/git-mob-vs-code/issues/73) - see settings to toggle sort. Thanks to @viperet.
- New core integration tests added using @vscode/test-electron and mocha. Added to Azure CI pipeline.

### Fixes

- Small stability fixes:
  - app is ready check for tests
  - set git template path on solo function (edge case)

## 1.14.1 -- 2021-11-14

### Fixed

- Cannot read property 'inputBox' of undefined for workspaces [issue 80](https://github.com/rkotze/git-mob-vs-code/issues/80) and related [issue 61](https://github.com/rkotze/git-mob-vs-code/issues/61). When there are two or more repositories open and Git Mob **cannot** reliably workout the selected repository it fails.
- Author **not** changing when switching between repositories in workspaces.
- Setting the commit template first time usage on a repository was done incorrectly and essentially failing to write the changes into the template file. This prevented the co-author metadata from being added into the inputBox. See [issue 81](https://github.com/rkotze/git-mob-vs-code/issues/81)

## 1.14.0 -- 2021-11-09

### Added

- Sort co-author list by alphabetical order in [issue 11](https://github.com/rkotze/git-mob-vs-code/issues/11) - thanks to @viperet
- Add co-author from "more authors" directly into "selected" [issue 76](https://github.com/rkotze/git-mob-vs-code/issues/76)

### Fixed

- Listen to repo change event to sync Git Mob UI rather than VS Code UI change events, which run more often even if co-authors have not changed.
- Loosen the author email matcher for "more authors" to ensure all contributors are listed.
- Open extension settings correctly by showing only GitMob settings.

## 1.13.0 -- 2021-08-29

### Added

- Use Git Mob API [PR 67](https://github.com/rkotze/git-mob-vs-code/pull/67)
- Simplifies the extension and no need to check if CLI is installed including which version.
- Performance, UI responds faster when adding, selecting and listing co-authors. Most notable on Windows.
- Still keeps in sync with Git Mob CLI and can be used in conjunction.
- Addresses the errors of missing "npx git mob" commands "could not determine executable to run NPM ERR!" [PR 49](https://github.com/rkotze/git-mob-vs-code/pull/49)

## 1.12.0 -- 2021-06-02

### Added

- Stop support for prepare-commit-msg no longer option in `git-mob v2` [Issue 62](https://github.com/rkotze/git-mob-vs-code/issues/62)
- Stop continuous loading of co-author list when interacting with SCM UI
- Show error message if no GitHub PAT is set [Issue 58](https://github.com/rkotze/git-mob-vs-code/issues/58)

## 1.11.0 -- 2021-01-06

### Added

- Add a total count for Selected and Unselected co-authors [Issue 3](https://github.com/rkotze/git-mob-vs-code/issues/3)
- Updated gif demo of Git Mob

### Fixed

- Watch for commit failed ENOENT: no such file or directory `\.git\COMMIT_EDITMSG` [Issue 56](https://github.com/rkotze/git-mob-vs-code/issues/56)

## 1.10.1 -- 2020-11-11

### Fixed

- When selecting a co-author error "Cannot read property 'inputBox' of undefined". [Issue 48](https://github.com/rkotze/git-mob-vs-code/issues/48) **Note** related VS Code issues logged in ticket.

## 1.10.0 -- 2020-11-01

### Added

- Select multiple CoAuthors to mob program with. [Issue 46](https://github.com/rkotze/git-mob-vs-code/issues/46)
- set `.git-coauthors` language to JSON
- Add linting to CI pipeline
- Make search options for Git repository and GitHub available in context menu
- Open Git Mob settings from context menu

### Fixed

- Pressing ESC on GitHub search input should not trigger a search

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
