const vscode = require("vscode");
const {
  CoAuthorProvider,
} = require("./co-author-tree-provider/co-authors-provider");
const { reloadOnSave } = require("./reload-on-save");
const { reloadCommand } = require("./commands/reload");
const { openGitCoAuthor } = require("./commands/open-git-coauthors");
const { soloCommand } = require("./commands/solo");
const {
  addCoAuthor,
  removeCoAuthor,
  addFromFavourite,
} = require("./commands/co-author-actions");
const { addRepoAuthorToCoauthors } = require("./commands/add-co-author");
const {
  searchRepositoryUsers,
} = require("./commands/search-repository-authors");
const { changePrimaryAuthor } = require("./commands/change-primary-author");
const { searchGitEmojis } = require("./commands/search-git-emojis");
const { openSettings } = require("./commands/open-settings");
const { searchGithubAuthors } = require("./commands/github-authors");
const { copyCoAuthor } = require("./commands/copy-co-author");
const { soloAfterCommit } = require("./ext-config/solo-after-commit");
const { logIssue } = require("./errors/log-issue");
const {
  CountDecorationProvider,
} = require("./co-author-tree-provider/count-decorator-provider");
const { updateConfig, messageFormatter } = require("git-mob-core");
const { buildCoAuthorGroups } = require("./build-co-author-groups");
const {
  InputCompletionProvider,
} = require("./co-author-tree-provider/input-completion-provider");

async function setupGitMob(context, gitExt) {
  return bootGitMob(context, gitExt);
}

async function bootGitMob(context, gitExt) {
  updateConfig("processCwd", gitExt.rootPath);
  try {
    const coAuthorProvider = new CoAuthorProvider(await buildCoAuthorGroups());

    coAuthorProvider.onDidChangeTreeData(function () {
      try {
        gitExt.updateSelectedInput((text) =>
          messageFormatter(text, coAuthorProvider.coAuthorGroups.getSelected())
        );
      } catch (err) {
        logIssue("Failed to update input: " + err.message);
      }
    });

    const disposables = [
      openSettings(),
      reloadCommand({ coAuthorProvider }),
      addCoAuthor({ coAuthorProvider }),
      removeCoAuthor({ coAuthorProvider }),
      addFromFavourite({ coAuthorProvider }),
      addRepoAuthorToCoauthors({ coAuthorProvider }),
      searchRepositoryUsers({ coAuthorProvider }),
      openGitCoAuthor({ coAuthorProvider }),
      soloCommand({ coAuthorProvider }),
      searchGitEmojis(),
      changePrimaryAuthor({ coAuthorProvider }),
      searchGithubAuthors({ coAuthorProvider }),
      new CountDecorationProvider(coAuthorProvider),
      new InputCompletionProvider(coAuthorProvider),
      copyCoAuthor(),
    ];

    disposables.forEach((dispose) => context.subscriptions.push(dispose));

    reloadOnSave();
    soloAfterCommit(coAuthorProvider);

    gitExt.onDidChangeUiState(async function () {
      if (gitExt.repositories.length === 1) return;
      if (this.ui.selected) {
        gitExt.selectedRepositoryPath = this.rootUri.path;
        updateConfig("processCwd", gitExt.rootPath);
        await vscode.commands.executeCommand("gitmob.reload");
      }
    });

    const mobList = vscode.window.createTreeView("gitmob.CoAuthorsView", {
      treeDataProvider: coAuthorProvider,
      canSelectMany: true,
    });

    mobList.onDidChangeSelection(function (evt) {
      coAuthorProvider.multiSelected = evt.selection;
    });
  } catch (error) {
    logIssue(error.message);
    console.log("SETUP ERROR: ", error);
  }
}

exports.setupGitMob = setupGitMob;
