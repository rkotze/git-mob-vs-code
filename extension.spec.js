const { activate } = require("./extension");
const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const {
  installGitCoAuthorFile,
} = require("./src/install/install-git-coauthor-file");

jest.mock("./src/setup-git-mob");
jest.mock("./src/vscode-git-extension/git-ext");
jest.mock("./src/install/install-git-coauthor-file");

describe("Activate Git Mob extension", function () {
  const onDidOpenRepositoryMock = jest.fn((callback) => {
    callback();
  });

  beforeAll(() => {
    GitExt.mockImplementation(() => {
      return {
        gitApi: {
          onDidOpenRepository: onDidOpenRepositoryMock,
          repositories: [
            {
              rootUri: { fsPath: "/path/to/repo" },
              inputBox: { value: "" },
            },
          ],
        },
      };
    });
  });

  it("confirm execution order", async function () {
    await activate();
    const first = installGitCoAuthorFile.mock.invocationCallOrder[0];
    const second = GitExt.mock.invocationCallOrder[0];
    const third = setupGitMob.mock.invocationCallOrder[0];

    expect(first).toBeLessThan(second);
    expect(second).toBeLessThan(third);
    expect(installGitCoAuthorFile).toHaveBeenCalledTimes(1);
    expect(GitExt).toHaveBeenCalledTimes(1);
    expect(onDidOpenRepositoryMock).toHaveBeenCalledTimes(1);
    expect(setupGitMob).toHaveBeenCalledTimes(1);
  });
});
