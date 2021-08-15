const commands = require("./git/commands");
const { MobAuthors } = require("./mob-authors");
const { Author } = require("./co-author-tree-provider/author");
const { getAllAuthors } = require("./git/git-mob-api");

jest.mock("./git/commands");
jest.mock("./git/git-mob-api");

describe("Co-author list", function () {
  const mobAuthors = new MobAuthors();

  beforeEach(function () {
    getAllAuthors.mockReset();
    mobAuthors.reset();
  });

  it("Repo authors should not contain co-authors with same email", async function () {
    getAllAuthors.mockReturnValueOnce([
      { key: "rk", name: "richard kotze", email: "rkotze@email.com" },
      { key: "ts", name: "Tony Stark", email: "tony@stark.com" },
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

    getAllAuthors.mockReturnValueOnce([
      { key: "ts", name: "Tony Stark", email: "tony@stark.com" },
    ]);
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
