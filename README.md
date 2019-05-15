# Git Mob <sup>VS Code extension</sup>

[![](https://vsmarketplacebadge.apphb.com/version-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![](https://vsmarketplacebadge.apphb.com/rating-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![Build Status](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_apis/build/status/rkotze.git-mob-vs-code?branchName=master)](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_build/latest?definitionId=1?branchName=master)

> Provides a **UI** for the command-line application [Git Mob](https://github.com/findmypast-oss/git-mob)

1. [Setup](#setup)
1. [Features](#features)
1. [Contributing](https://github.com/rkotze/git-mob-vs-code/blob/master/CONTRIBUTING.md)

Includes co-authors in commits when you collaborate on code. Use when pairing with a buddy or mobbing with your team.

Read our blog post to find out why git-mob exists: http://tech.findmypast.com/co-author-commits-with-git-mob

![Git Mob in action](https://user-images.githubusercontent.com/10452163/51446144-cc3b6f80-1d05-11e9-87fa-96622a25eedc.gif)

## Setup

NPM `git-mob` will be installed globally with this extension.

If not installed run this: `npm i -g git-mob` (Please follow the setup instructions on git-mob)

Please use latest version of `git-mob`.

### Add new co-authors

Add your co-authors to the `.git-coauthors` files in your user folder.
(`ctrl+shift+p` -> "Open .git-coauthors file")

![open_coauthors](https://user-images.githubusercontent.com/10452163/52169086-b167f280-272a-11e9-947d-0e00df3eefa4.png)

### Add authors from repository

Click the plus button on authors items under **More Authors**.

![image](https://user-images.githubusercontent.com/10452163/52488610-1d79a900-2bb8-11e9-8a9b-46529d4b9608.png)

## Features

- Add and remove co-authors from commit messages
- View all your co-authors in SCM (git) tab
- Search for & select an author from the "More Authors" list (all contributors to the repository).
- Manage your co-authors in `.git-coauthors` file
- Add authors from current repository into your `.git-coauthors` file
- Solo remove all co-authors from current commit
- Reload Git Mob and auto reload when updating `.git-coauthors` file in VS Code
- Status bar shows if using `template file` or `prepare-commit-msg` hook
- If you change co-authors in **command line** it will update in VS Code
