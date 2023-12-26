const { activate } = require("./extension");
const { setupGitMob } = require("./src/setup-git-mob");
const { waitForRepos } = require("./src/wait-for-repos");
const {
  installGitCoAuthorFile,
} = require("./src/install/install-git-coauthor-file");

jest.mock("./src/setup-git-mob");
jest.mock("./src/vscode-git-extension/git-ext");
jest.mock("./src/wait-for-repos");
jest.mock("./src/install/install-git-coauthor-file");

describe("Activate Git Mob extension", function () {
  beforeAll(() => {
    waitForRepos.mockImplementation((_git, callback) => {
      callback();
    });
  });

  it("confirm execution order", async function () {
    await activate();
    const first = installGitCoAuthorFile.mock.invocationCallOrder[0];
    const second = waitForRepos.mock.invocationCallOrder[0];
    const third = setupGitMob.mock.invocationCallOrder[0];

    expect(first).toBeLessThan(second);
    expect(second).toBeLessThan(third);
    expect(installGitCoAuthorFile).toHaveBeenCalledTimes(1);
    expect(waitForRepos).toHaveBeenCalledTimes(1);
    expect(setupGitMob).toHaveBeenCalledTimes(1);
  });
});
