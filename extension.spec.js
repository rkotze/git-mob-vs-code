const { activate } = require("./extension");
const { mob } = require("./src/git/commands");
const { setupGitMob } = require("./src/setup-git-mob");
const { waitForRepos } = require("./src/wait-for-repos");
const { installCli } = require("./src/commands/install-cli");
const { setContextNotInstalled } = require("./src/set-context/notInstalled");

jest.mock("./src/git/commands");
jest.mock("./src/setup-git-mob");
jest.mock("./src/vscode-git-extension/git-ext");
jest.mock("./src/wait-for-repos");
jest.mock("./src/commands/install-cli");
jest.mock("./src/set-context/notInstalled");

describe("Activate Git Mob extension", function () {
  beforeAll(() => {
    waitForRepos.mockImplementation((_git, callback) => {
      callback();
    });

    installCli.mockImplementation((_context, callback) => {
      callback();
    });
  });

  it("cli not installed provide install options", function () {
    mob.gitMobLatest.mockReturnValue(1);
    activate();

    expect(setContextNotInstalled).nthCalledWith(1, true);
    expect(installCli).toBeCalledTimes(1);
    expect(setContextNotInstalled).nthCalledWith(2, false);
    expect(setupGitMob).toBeCalledTimes(1);
  });

  it("cli is installed call setup", function () {
    mob.gitMobLatest.mockReturnValue(0);
    activate();

    expect(installCli).not.toBeCalled();
    expect(setupGitMob).toBeCalledTimes(1);
  });
});
