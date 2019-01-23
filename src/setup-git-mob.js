const vscode = require("vscode");
const { CoAuthorProvider } = require("./co-authors-provider");
const { updateSCMInput } = require("./update-scm-input");
const { reloadOnSave } = require("./reload-on-save");
const { reloadCommand } = require("./commands/reload");
const { openGitCoAuthor } = require("./commands/open-git-coauthors");
const { soloCommand } = require("./commands/solo");
const { setContextPrepareMessage } = require("./prepareCommitMsgFile");

function setupGitMob(context) {
  const coAuthorProvider = new CoAuthorProvider(context);
  const mobList = vscode.window.createTreeView("gitmob.CoAuthorsView", {
    treeDataProvider: coAuthorProvider
  });

  reloadCommand({ coAuthorProvider });
  openGitCoAuthor({ coAuthorProvider });
  soloCommand({ coAuthorProvider });
  reloadOnSave(coAuthorProvider);

  setContextPrepareMessage();

  coAuthorProvider.loaded = function() {
    mobList.onDidChangeVisibility(function({ visible }) {
      visible && coAuthorProvider.reloadData();
    });
  };

  vscode.window.onDidChangeWindowState(function({ focused }) {
    focused && mobList.visible && coAuthorProvider.reloadData();
  });

  coAuthorProvider.onUpdated = function() {
    updateSCMInput(coAuthorProvider.mobAuthors.listAll);
  };

  let disposableAddCoAuthor = vscode.commands.registerCommand(
    "gitmob.addCoAuthor",
    function(author) {
      coAuthorProvider.toggleCoAuthor(author, true);
    }
  );

  context.subscriptions.push(disposableAddCoAuthor);

  let disposableRemoveCoAuthor = vscode.commands.registerCommand(
    "gitmob.removeCoAuthor",
    function(author) {
      coAuthorProvider.toggleCoAuthor(author, false);
    }
  );

  context.subscriptions.push(disposableRemoveCoAuthor);
}

exports.setupGitMob = setupGitMob;
