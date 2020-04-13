# Git Mob <sup>VS Code extension</sup>

[![](https://vsmarketplacebadge.apphb.com/version-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![](https://vsmarketplacebadge.apphb.com/rating-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![Build Status](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_apis/build/status/rkotze.git-mob-vs-code?branchName=master)](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_build/latest?definitionId=1?branchName=master)

> Provides a **UI** for the command-line application [Git Mob](https://github.com/findmypast-oss/git-mob)

1. [Install](#install)
2. [Features](#features)
3. [Contributing](https://github.com/rkotze/git-mob-vs-code/blob/master/CONTRIBUTING.md)

Includes co-author meta data in commits when you collaborate on code. Use when **pair programming** or mobbing with your team.

![Git Mob in action](https://user-images.githubusercontent.com/10452163/51446144-cc3b6f80-1d05-11e9-87fa-96622a25eedc.gif)

The Git Mob project for [VS code co-author commits](https://www.richardkotze.com/projects/co-author-commits-with-git-mob)

Read our [blog post](http://tech.findmypast.com/co-author-commits-with-git-mob) to find out learn more about Git Mob.

## Install

Install Git Mob `npm i -g git-mob` _(See [git-mob](https://github.com/findmypast-oss/git-mob/#install) for more info)_

Search for "Git Mob" in **Extensions** and click **install**.

Ensure you have set your primary author in Git

```
$ git config --global user.name "Jane Doe"
$ git config --global user.email "jane@example.com"
```

## Features

- Select and unselect co-authors to be appended to commit messages
- View all your co-authors in source control tab
- [Search suggested co-authors](#search-suggested-co-authors) from the "More Authors" list (all contributors to the repository)
- [Add new co-authors](#add-new-co-authors) and manage them in `.git-coauthors` file
- [Add new co-authors from current repository](#add-new-co-authors-from-repository) into your `.git-coauthors` file
- Solo remove all co-authors from current commit
- Reload Git Mob and auto reload when updating `.git-coauthors` file in VS Code
- Status bar shows if using `template file` or `prepare-commit-msg` hook
- If you change co-authors using **Git Mob CLI** it will update in VS Code

### Add new co-authors

**Option 1:** `CTRL+shift+p` or `⌘+⇧+p` and search for "Add new co-author". Fill in all input fields.
(`ctrl+shift+p` -> "Open .git-coauthors file")

**Option 2:** Add your co-authors to the `.git-coauthors` files in your user folder.

![open_coauthors](https://user-images.githubusercontent.com/10452163/52169086-b167f280-272a-11e9-947d-0e00df3eefa4.png)

### Add new co-authors from repository

Click the **plus +** button on an author in **More Authors** list.

![image](https://user-images.githubusercontent.com/10452163/52488610-1d79a900-2bb8-11e9-8a9b-46529d4b9608.png)

### Search suggested co-authors

Click the search icon on the **More Authors** section or `CTRL+shift+p` or `⌘+⇧+p` and search for "Search suggested co-authors".

![image](https://user-images.githubusercontent.com/10452163/57807338-e2f44f00-7758-11e9-8fb1-6d8b8cb9d7ce.png)
