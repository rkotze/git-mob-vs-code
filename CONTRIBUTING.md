# Contributing Guide

👋Thank you for taking the time to read this and I look forward to reviewing your contribution.

## Contribution instructions:

- Create a fork of the project on Github.
- Clone the fork on your local machine. Your remote repo on Github is called `origin`.
- Add the original repository as a remote called `upstream`.
- If you created your fork a while ago be sure to pull upstream changes into your local repository.
- Create a new branch to work on! Branch from `master`.
- Please make an issue to reference and implement/fix your feature.
- Please add unit tests, **jest** is the testing tool.
- Make a pull request (PR) to merge into `master` and make sure it passes the continuous integration pipeline.
- Ensure linting and unit tests all pass before submitting your PR. Run command `npm run ci`.
- You're PR will be reviewed as soon as possible.


## Getting Started

1. Run tests (Uses Jest)
   ```
   npm test
   npm test -- --watch
   ```
1. Debug extension:
   Press F5 in VS Code to launch the extension into a sandbox and you can place break points
1. Debug tests: In the debug tab you can change to `jest` from the dropdown
1. Optional - Install latest version of `git-mob`. Useful to check it's keeping in sync with CLI.
   ```
   npm i -g git-mob
   ```

### List of available [VS Code icons](https://microsoft.github.io/vscode-codicons/dist/codicon.html)

## Releasing

This section is for owner/maintainers with publish access to git-mob-vs-code on the extension marketplace.

1. Add release notes at https://github.com/rkotze/git-mob-vs-code/releases and update the CHANGELOG https://github.com/rkotze/git-mob-vs-code/blob/master/CHANGELOG.md
1. Bump the version at the appropriate level (major, minor, patch); e.g.
   ```
   npm version patch
   ```
1. Push the version commit and tag
   ```
   git push --follow-tags
   ```
1. New releases need to be manually triggered
   [Azure release pipeline](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_release?view=all&_a=releases&definitionId=1)

1. **Never to be used** only for reference: Manually release the package
   ```
   vsce publish -p <secret key>
   ```
