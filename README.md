# Git Mob <sup>VS Code extension</sup>

[![](https://vsmarketplacebadge.apphb.com/version-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![](https://vsmarketplacebadge.apphb.com/rating-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![Build Status](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_apis/build/status/rkotze.git-mob-vs-code?branchName=master)](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_build/latest?definitionId=1?branchName=master)

> Provides a **UI** for the command-line application [Git Mob](https://github.com/findmypast-oss/git-mob)

1. [Setup](#setup)
1. [Features](#features)

Includes co-authors in commits when you collaborate on code. Use when pairing with a buddy or mobbing with your team.

Read our blog post to find out why git-mob exists: http://tech.findmypast.com/co-author-commits-with-git-mob

![Git Mob in action](https://user-images.githubusercontent.com/10452163/51446144-cc3b6f80-1d05-11e9-87fa-96622a25eedc.gif)

## Setup

**In Beta** -> _it might break and not all features are available yet_

`npm i -g git-mob` (Please follow the setup instructions here)

Must use `git-mob` version `0.3.0` or higher.

Please add your co-authors to the `.git-coauthors` files in your user folder.
(`ctrl+shift+p` -> "Open .git-coauthors file")

## Features

- Add and remove co-authors from commit messages
- View all your co-authors in SCM (git) tab
- Manage your co-authors in `.git-coauthors` file
- Solo remove all co-authors from current commit
- Reload Git Mob and auto reload when updating `.git-coauthors` file in VS Code
- If you change co-authors in terminal it will update in VS Code
