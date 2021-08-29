# <img src="https://user-images.githubusercontent.com/10452163/79142596-a808fa00-7db3-11ea-9a02-2d020e0b29d7.png" width="80" alt="VS Code Git Mob logo" /> Co-author commits

[![](https://vsmarketplacebadge.apphb.com/version-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![](https://vsmarketplacebadge.apphb.com/rating-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![Build Status](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_apis/build/status/rkotze.git-mob-vs-code?branchName=master)](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_build/latest?definitionId=1?branchName=master) ![](https://vsmarketplacebadge.apphb.com/installs/RichardKotze.git-mob.svg)

> VS Code extension to make it easy to _co-author commits_, managed all from the source control panel.

Helpful when **pair programming** or **mobbing**.

![Git Mob in action](https://user-images.githubusercontent.com/10452163/103484860-d323f580-4de9-11eb-9819-bb8d6602a21e.gif)

1. [Install](#install)
2. [Features](#features)
3. [Settings](#settings)
4. [Contributing](https://github.com/rkotze/git-mob-vs-code/blob/master/CONTRIBUTING.md)

## Install

Open VS Code and search for "git-mob" in **Extensions** panel and click **install**.

Set your primary author in Git.

```
$ git config --global user.name "Jane Doe"
$ git config --global user.email "jane@example.com"
```

Optional, can be used with _[git-mob cli](https://github.com/findmypast-oss/git-mob/#install)_


## Features

- Apply co-author meta data to commit message
- Select multiple co-authors to add to commit (`shift` or `ctrl` or `⌘`)
- [Search suggested co-authors](#search-suggested-co-authors) from the "More Authors" list ([Add from local repository](#add-new-co-authors-from-repository))
- Add co-authors from **GitHub**, see [setting options](#settings) to learn more.
- [Change primary author](#change-primary-author)
- [Workspace support](#workspace-support)
- Add [emojis](#git-emojis) to commits (Gitmojis)
- Manually [add new co-authors](#add-new-co-authors) via input 
- Button to open co-author file (`.git-coauthors`) in VS Code
- [Remove co-authors from input](#post-commit---solo) after a commit
- Configurable see [setting options](#settings)

`prepare-commit-msg` hook support **removed** in `v1.12.0`

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

### Workspace support

Select one of multiple open Git repositories and add co-author metadata to source control input field.

<img alt="workspace-support" src="https://user-images.githubusercontent.com/10452163/80038666-08074b00-84ee-11ea-9565-26c9f755d512.gif" width="320" />

### Git Emojis

Using the **standardised** list from [Gitmoji](https://github.com/carloscuesta/gitmoji).

Search and select an emoji to add to the Git message input field

![git emojis select list](https://user-images.githubusercontent.com/10452163/79442052-ef6bd200-7fcf-11ea-85c1-82789738add3.png)

### Change primary author

![Change primary author](https://user-images.githubusercontent.com/10452163/89105613-6d86a400-d41a-11ea-88ec-25b34a084598.gif)

## Settings

### Post commit -> Solo

After a commit remove selected co-authors from input to unselected. If you commit in the command-line the UI will update as well.

`Default: false`

### Author list -> Expand more authors

Expand 'More Authors' tree when UI starts.

`Default: true`

### Github -> Personal Access Token

Search for co-authors on GitHub you will need to generate a PAT.

1.  Visit [GitHub > settings > tokens](https://github.com/settings/tokens)
2.  Click "generate new token"
3.  Select "user:read" _(This allows GitMob to fetch a users public email)_

`Default: <empty>`
