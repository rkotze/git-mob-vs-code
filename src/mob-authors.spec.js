const { workspace } = require("../__mocks__/vscode");
const commands = require("./git/commands");
const { MobAuthors, buildCoAuthorGroups } = require("./mob-authors");
const { Author } = require("./co-author-tree-provider/author");
const { CoAuthor } = require("./co-author-tree-provider/co-authors");
const {
  getAllAuthors,
  setCoAuthors,
  updateGitTemplate,
  getSelectedCoAuthors,
  getPrimaryAuthor,
} = require("git-mob-core");

jest.mock("./git/commands");
jest.mock("git-mob-core");

describe("Co-author list", function () {
  const mobAuthors = new MobAuthors();
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
    mobAuthors.reset();
  });

  it("Repo authors should not contain co-authors with same email", async function () {
    getAllAuthors.mockResolvedValueOnce([
      { key: "rk", name: "Richard Kotze", email: "rkotze@email.com" },
      { key: "ts", name: "Tony Stark", email: "tony@stark.com" },
    ]);
    getSelectedCoAuthors.mockReturnValueOnce([]);

    commands.getRepoAuthors.mockResolvedValueOnce(
      `   33\tRichard Kotze <rkotze@email.com>\n   53\tCaptian America <captain@america.com>`
    );

    const coAuthorGroups = await buildCoAuthorGroups();
    let repoAuthors = await coAuthorGroups.getGitRepoAuthors();

    expect(repoAuthors).toHaveLength(1);
    expect(repoAuthors[0].email).toEqual("captain@america.com");
  });

  it("Remove author from repo authors", async function () {
    getAllAuthors.mockResolvedValueOnce([
      { key: "ts", name: "Tony Stark", email: "tony@stark.com" },
    ]);
    commands.getRepoAuthors.mockResolvedValueOnce(
      `   33\tRichard Kotze <rkotze@email.com>\n   53\tBlack Panther <black@panther.com>`
    );
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
    expect(setCoAuthors).toBeCalledWith(["pp"]);
  });

  it("Update local git template if used", async function () {
    const coAuthorList = [
      {
        key: "ts",
        name: "Tony Stark",
        email: "tony@stark.com",
        selected: true,
      },
    ];

    getAllAuthors.mockResolvedValueOnce(coAuthorList);
    getSelectedCoAuthors.mockReturnValueOnce([]);
    commands.mob.usingLocalTemplate.mockReturnValueOnce(true);

    await buildCoAuthorGroups();

    expect(updateGitTemplate).toHaveBeenCalled();
  });

  it("Using global git template do not update local", async function () {
    const coAuthorList = [
      {
        key: "ts",
        name: "Tony Stark",
        email: "tony@stark.com",
        selected: true,
      },
    ];

    getAllAuthors.mockReturnValueOnce(coAuthorList);
    getSelectedCoAuthors.mockReturnValueOnce([]);
    commands.mob.usingLocalTemplate.mockReturnValueOnce(false);

    await buildCoAuthorGroups();

    expect(updateGitTemplate).not.toHaveBeenCalled();
  });
});
