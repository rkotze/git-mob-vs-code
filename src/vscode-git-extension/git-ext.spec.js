const { GitExt } = require("./git-ext");
const { vsCodeGit } = require("./vs-code-git");

jest.mock("./vs-code-git");

test("returns selected repository file path", () => {
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

test("returns first file path when there are repositories but none are selected", () => {
  vsCodeGitRepo([
    {
      ui: {
        selected: false,
      },
      rootUri: {
        fsPath: "first/project/fspath",
      },
    },
    {
      ui: {
        selected: false,
      },
      rootUri: {
        fsPath: "should/not/find/me",
      },
    },
  ]);
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual("first/project/fspath");
});

test("returns selected repo by matching rootUri.path", () => {
  vsCodeGitRepo([
    {
      ui: {
        selected: false,
      },
      rootUri: {
        fsPath: "first/project/fspath",
        path: "first/path",
      },
    },
    {
      ui: {
        selected: false,
      },
      rootUri: {
        fsPath: "second/project/find/me",
        path: "second/path",
      },
    },
  ]);
  const selectedPath = "second/path";
  const gitExt = new GitExt();
  gitExt.selectedRepositoryPath = selectedPath;
  expect(gitExt.rootPath).toEqual("second/project/find/me");
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
