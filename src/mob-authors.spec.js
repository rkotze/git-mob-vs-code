const commands = require("./git/commands");
const { gitAuthors } = require("./git/git-mob-api/git-authors");
const { MobAuthors } = require("./mob-authors");
const { Author } = require("./co-author-tree-provider/author");

jest.mock("./git/commands");
jest.mock("./git/git-mob-api/git-authors");

describe("Co-author list", function () {
  const mobAuthors = new MobAuthors();
  const gitAuthorsMockApi = {
    toList: jest.fn(),
    read: jest.fn(),
  };

  beforeAll(function () {
    gitAuthors.mockImplementation(() => gitAuthorsMockApi);
  });

  beforeEach(function () {
    gitAuthorsMockApi.toList.mockReset();
    mobAuthors.reset();
  });

  it("Repo authors should not contain co-authors with same email", async function () {
    gitAuthors().toList.mockReturnValueOnce([
      "rk richard kotze rkotze@email.com",
      "ts Tony Stark tony@stark.com",
    ]);

    commands.getRepoAuthors.mockResolvedValueOnce(
      `   33\tRichard Kotze <rkotze@email.com>\n   53\tCaptian America <captain@america.com>`
    );

    let repoAuthors = await mobAuthors.repoAuthorList();

    expect(repoAuthors).toHaveLength(1);
    expect(repoAuthors[0].email).toEqual("captain@america.com");
  });

  it("Remove author from repo authors", async function () {
    const author = new Author("Richard Kotze", "rkotze@email.com");
    jest.spyOn(mobAuthors, "author", "get").mockImplementation(() => author);

    gitAuthors().toList.mockReturnValueOnce(["ts Tony Stark tony@stark.com"]);
    commands.getRepoAuthors.mockResolvedValueOnce(
      `   33\tRichard Kotze <rkotze@email.com>\n   53\tBlack Panther <black@panther.com>`
    );

    const repoAuthors = await mobAuthors.repoAuthorList();
    const repoAuthorEmails = repoAuthors.map((author) => author.email);

    expect(repoAuthorEmails).not.toEqual(
      expect.arrayContaining([author.email])
    );
  });
});
