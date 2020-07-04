const { GitExt } = require("./git-ext");
const { vsCodeGit } = require("./vs-code-git");

jest.mock("./vs-code-git");

beforeAll(() => {
  vsCodeGit.mockImplementation(() => {
    return {
      repositories: [
        {
          ui: {
            selected: true,
          },
          rootUri: {
            fsPath: "project/fspath",
          },
        },
      ],
    };
  });
});

test("returns a selected repository file path", () => {
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual("project/fspath");
});
