const vscode = require("vscode");
const { CoAuthorProvider } = require("./co-authors-provider");
const { reloadOnSave } = require("./reload-on-save");
const { reloadCommand } = require("./commands/reload");
const { tweetCommand } = require("./commands/tweet");
const { openGitCoAuthor } = require("./commands/open-git-coauthors");
const { soloCommand } = require("./commands/solo");
const { addCoAuthor, removeCoAuthor } = require("./commands/co-author-actions");
const { addRepoAuthorToCoauthors } = require("./commands/add-co-author");
const {
  searchRepositoryUsers,
} = require("./commands/search-repository-authors");
const { searchGitEmojis } = require("./commands/search-git-emojis");
const { gitMobHookStatus } = require("./status-bar/git-mob-hook-status");
const { GitExt } = require("./vscode-git-extension/git-ext");
const {
  replaceCoAuthors,
} = require("./vscode-git-extension/format-scm-input-text");

function setupGitMob(context) {
  const gitExt = new GitExt();
  if (gitExt.hasRepositories) {
    const coAuthorProvider = new CoAuthorProvider(context);
    const mobList = vscode.window.createTreeView("gitmob.CoAuthorsView", {
      treeDataProvider: coAuthorProvider,
    });

    tweetCommand({ coAuthorProvider });
    reloadCommand({ coAuthorProvider });
    addCoAuthor({ coAuthorProvider });
    removeCoAuthor({ coAuthorProvider });
    addRepoAuthorToCoauthors({ coAuthorProvider });
    searchRepositoryUsers({ coAuthorProvider });
    openGitCoAuthor({ coAuthorProvider });
    soloCommand({ coAuthorProvider });
    searchGitEmojis({ coAuthorProvider });
    reloadOnSave(coAuthorProvider);

    const checkStatus = gitMobHookStatus({ context });
    checkStatus();

    coAuthorProvider.loaded = function () {
      mobList.onDidChangeVisibility(function ({ visible }) {
        visible && coAuthorProvider.reloadData();
        visible && checkStatus();
        vscode.commands.executeCommand("setContext", "gitmob.loaded", visible);
      });
      vscode.commands.executeCommand("setContext", "gitmob.loaded", true);
    };

    vscode.window.onDidChangeWindowState(function ({ focused }) {
      focused && mobList.visible && coAuthorProvider.reloadData();
    });

    gitExt.selectedRepository.ui.onDidChange(function() {
      coAuthorProvider.reloadData();
    });

    coAuthorProvider.onChanged = function () {
      gitExt.updateSelectedInput(
        replaceCoAuthors(coAuthorProvider.mobAuthors.listCurrent)
      );
    };
  }
}

exports.setupGitMob = setupGitMob;
