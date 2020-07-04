const { GitExt } = require("./git-ext");
const { vsCodeGit } = require("./vs-code-git");

jest.mock("./vs-code-git");

test("returns a selected repository file path", () => {
  vsCodeGitRepo([
    {
      ui: {
        selected: true,
      },
      rootUri: {
        fsPath: "project/fspath",
      },
    },
  ]);
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual("project/fspath");
});

test("returns null when no repositories", () => {
  vsCodeGitRepo([]);
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual(null);
});

function vsCodeGitRepo(repositories) {
  vsCodeGit.mockImplementation(() => {
    return {
      repositories,
    };
  });
}
