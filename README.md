# <img src="https://user-images.githubusercontent.com/10452163/79142596-a808fa00-7db3-11ea-9a02-2d020e0b29d7.png" width="80" alt="VS Code Git Mob logo" /> Co-author commits

[![](https://vsmarketplacebadge.apphb.com/version-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![](https://vsmarketplacebadge.apphb.com/rating-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![Build Status](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_apis/build/status/rkotze.git-mob-vs-code?branchName=master)](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_build/latest?definitionId=1?branchName=master) ![](https://vsmarketplacebadge.apphb.com/installs/RichardKotze.git-mob.svg)

> VS Code extension to easily _co-author a commit_ message from the source control panel.

Helpful when **pair programming**.

![Git Mob in action](https://user-images.githubusercontent.com/10452163/156645932-8f5629f5-24b6-42cd-b24a-767164364353.gif)

1. [Install](#install)
2. [Quick start](#quick-start)
3. [Features](#features)
4. [Notable changes](#notable-changes)
5. [Settings](#settings)
6. [Contributing](https://github.com/rkotze/git-mob-vs-code/blob/master/CONTRIBUTING.md)

## Install

Open VS Code and search for **"git-mob"** in **Extensions panel**.

OR

Via the terminal `code --install-extension RichardKotze.git-mob`

Available in [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) and [open VSX registry](https://open-vsx.org/extension/RichardKotze/git-mob)

If you also use _[git-mob cli](https://github.com/rkotze/git-mob/#install)_ they work fine together.

## Quick start

### Key commands

**Select co-authors** - `CTRL+shift+p` or `⌘+⇧+p` -> "Select co-authors". Use the multi-selector to add and remove co-authors.

**Solo** - clear all selected co-authors: `CTRL+shift+p` or `⌘+⇧+p` -> "Solo: remove all co-authors"

Add new co-authors from [repository contributors](#search-repository-contributors-co-authors) or add directly to your co-authors file [`.git-coauthors`](#add-new-co-authors).

## Features

- Append _multiple co-authors_ to a commit message
- Select multiple co-authors (`shift` or `ctrl` or `⌘`) in SCM panel view
- Easily add co-author data by [searching repository contributors co-authors](#search-repository-contributors-co-authors) from the "More Authors" list.
- **After a commit** [remove all selected co-authors](#post-commit---solo) 
- [Workspace support](#workspace-support), multiple Git repositories
- **Search and add** co-authors from **GitHub** using anonymous email
- [Change primary author](#change-primary-author)
- Right-click and copy co-author data.
- Add [emojis](#git-emojis) to commits (Gitmojis)
- Configurable see [setting options](#settings)

### Notable changes:

1. [Global Git Mob](https://github.com/rkotze/git-mob-vs-code/discussions/120) meaning switch between projects will have same co-authors selected. (`v1.17.0`)
2. `prepare-commit-msg` hook support **removed** (`v1.12.0`)

### Add new co-authors

**Option 1:** `CTRL+shift+p` or `⌘+⇧+p` -> "Add new co-author". Fill in all input fields.

**Option 2:** `ctrl+shift+p` or `⌘+⇧+p` -> "Open .git-coauthors file" or use UI to open co-authors file `.git-coauthors`.

### Add from repository contributors

Click the **plus +** button on an author in **More Authors** list.

### Search repository contributors co-authors

Click the search icon on the **More Authors** section or `CTRL+shift+p` or `⌘+⇧+p` -> "Search Git repository for co-authors".

![image](https://user-images.githubusercontent.com/10452163/57807338-e2f44f00-7758-11e9-8fb1-6d8b8cb9d7ce.png)

### Workspace support

Select one of multiple open Git repositories and add co-author metadata to source control input field. You can have different co-authors applied to all the open Git repositories.

### Git Emojis

Using the **standardised** list from [Gitmoji](https://github.com/carloscuesta/gitmoji).

Search and select an emoji to add to the Git message input field. 

`CTRL+shift+p` or `⌘+⇧+p` -> "Search Gitmojis - emojis"

![git emojis select list](https://user-images.githubusercontent.com/10452163/79442052-ef6bd200-7fcf-11ea-85c1-82789738add3.png)

### Change primary author

`CTRL+shift+p` or `⌘+⇧+p` -> "Change primary author"

## Settings

### Post commit -> Solo

After a commit remove selected co-authors. If you commit in the command-line the UI will update as well.

`Default: false`

### Author list -> Expand more authors

Expand 'More Authors' tree when UI starts.

`Default: true`

### Author list -> More Authors To Co-authoring

Add a new author directly to 'Co-authoring' from 'More Authors'.

`Default: true`

### Github -> Personal Access Token

*Optional*: if you want the users public email then you will need the PAT.

Default will return the anonymous GitHub email.

1.  Visit [GitHub > settings > tokens](https://github.com/settings/tokens)
2.  Click "generate new token"
3.  Select "user:read" _(This allows GitMob to fetch a users public email)_

`Default: <empty>`

### Co-authors -> Sort direction

Co-author list sorting direction.

`Default: ascending`
