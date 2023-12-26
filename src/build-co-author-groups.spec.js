const { workspace } = require("../__mocks__/vscode");
const { buildCoAuthorGroups } = require("./build-co-author-groups");
const { CoAuthor } = require("./co-author-tree-provider/co-authors");
const {
  getAllAuthors,
  setCoAuthors,
  getSelectedCoAuthors,
  getPrimaryAuthor,
  repoAuthorList,
} = require("git-mob-core");
const { Author } = jest.requireActual("git-mob-core");

jest.mock("git-mob-core");

describe("Co-author list", function () {
  const author = new Author("Richard Kotze", "rkotze@email.com");

  beforeAll(function () {
    workspace.getConfiguration.mockReturnValue({
      get() {
        return "ascending";
      },
    });
    getPrimaryAuthor.mockReturnValue(author);
  });

  beforeEach(function () {
    getAllAuthors.mockReset();
    getSelectedCoAuthors.mockReset();
    repoAuthorList.mockReset();
  });

  it("Repo authors should not contain co-authors with same email", async function () {
    repoAuthorList.mockResolvedValueOnce([
      new Author("ts", "Tony Stark", "tony@stark.com"),
      new Author("CA", "Captian America", "captain@america.com"),
    ]);
    getAllAuthors.mockResolvedValueOnce([
      { key: "rk", name: "Richard Kotze", email: "rkotze@email.com" },
      { key: "ts", name: "Tony Stark", email: "tony@stark.com" },
    ]);
    getSelectedCoAuthors.mockReturnValueOnce([]);

    const coAuthorGroups = await buildCoAuthorGroups();
    let repoAuthors = await coAuthorGroups.getGitRepoAuthors();

    expect(repoAuthors).toHaveLength(1);
    expect(repoAuthors[0].email).toEqual("captain@america.com");
  });

  it("Remove author from repo authors", async function () {
    getAllAuthors.mockResolvedValueOnce([
      { key: "ts", name: "Tony Stark", email: "tony@stark.com" },
    ]);

    repoAuthorList.mockResolvedValueOnce([
      new Author("rk", "Richard Kotze", "rkotze@email.com"),
      new Author("CA", "Black Panther", "black@panther.com"),
    ]);

    getSelectedCoAuthors.mockReturnValueOnce([]);

    const coAuthorGroups = await buildCoAuthorGroups();
    const repoAuthors = await coAuthorGroups.getGitRepoAuthors();
    const repoAuthorEmails = repoAuthors.map((author) => author.email);

    expect(repoAuthorEmails).not.toEqual(
      expect.arrayContaining([author.email])
    );
  });

  it("Set selected co-authors only", async function () {
    getAllAuthors.mockResolvedValueOnce([
      {
        key: "rk",
        name: "Richard Kotze",
        email: "rkotze@email.com",
        selected: false,
      },
      {
        key: "ts",
        name: "Tony Stark",
        email: "tony@stark.com",
        selected: true,
      },
      {
        key: "pp",
        name: "Peter Parker",
        email: "peter@stark.com",
        selected: false,
      },
    ]);

    getSelectedCoAuthors.mockReturnValueOnce([]);

    const coAuthorGroups = await buildCoAuthorGroups();
    const selected = [
      new CoAuthor("Peter Parker", "peter@stark.com", false, "pp"),
    ];
    await coAuthorGroups.select(selected);
    const all = [
      ...coAuthorGroups.getSelected(),
      ...coAuthorGroups.getUnselected(),
    ];
    const pp = all.find((author) => author.commandKey == "pp");
    const ts = all.find((author) => author.commandKey == "ts");
    expect(pp.selected).toEqual(true);
    expect(ts.selected).toEqual(false);
    expect(setCoAuthors).toHaveBeenCalledWith(["pp"]);
  });
});
