const vscode = require("vscode");
const { CoAuthorProvider } = require("./co-authors-provider");
const { updateSCMInput } = require("./update-scm-input");
const { reloadOnSave } = require("./reload-on-save");
const { reloadCommand } = require("./commands/reload");
const { openGitCoAuthor } = require("./commands/open-git-coauthors");
const { soloCommand } = require("./commands/solo");
const { addCoAuthor, removeCoAuthor } = require("./commands/co-author-actions");
const { gitMobHookStatus } = require("./status-bar/git-mob-hook-status");
const { isGitRepository } = require("./git/is-git-repository");

function setupGitMob(context) {
  if (isGitRepository()) {
    const coAuthorProvider = new CoAuthorProvider(context);
    const mobList = vscode.window.createTreeView("gitmob.CoAuthorsView", {
      treeDataProvider: coAuthorProvider
    });

    reloadCommand({ coAuthorProvider });
    addCoAuthor({ coAuthorProvider });
    removeCoAuthor({ coAuthorProvider });
    openGitCoAuthor({ coAuthorProvider });
    soloCommand({ coAuthorProvider });
    reloadOnSave(coAuthorProvider);

    const checkStatus = gitMobHookStatus({ context });
    checkStatus();

    coAuthorProvider.loaded = function() {
      mobList.onDidChangeVisibility(function({ visible }) {
        visible && coAuthorProvider.reloadData();
        visible && checkStatus();
      });
      vscode.commands.executeCommand("setContext", "gitmob.loaded", true);
    };

    vscode.window.onDidChangeWindowState(function({ focused }) {
      focused && mobList.visible && coAuthorProvider.reloadData();
    });

    coAuthorProvider.onChanged = function() {
      updateSCMInput(coAuthorProvider.mobAuthors.listAll);
    };
  }
}

exports.setupGitMob = setupGitMob;
