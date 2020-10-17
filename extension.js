const { mob } = require("./src/git/commands");
const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const { waitForRepos } = require("./src/wait-for-repos");
const { installCli } = require("./src/commands/install-cli");
const { setContextNotInstalled } = require("./src/set-context/notInstalled");

function activate(context) {
  const gitExt = new GitExt();
  waitForRepos(gitExt, () => {
    if (mob.gitMobLatest() === 1) {
      setContextNotInstalled(true);
      installCli(context, () => {
        setContextNotInstalled(false);
        setupGitMob(context, gitExt);
      });
    } else {
      setupGitMob(context, gitExt);
    }
  });
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
