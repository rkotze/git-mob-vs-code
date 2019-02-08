const commands = require("./git/commands");
const { MobAuthors } = require("./mob-authors");

jest.mock("./git/commands");

describe("Co-author list", function() {
  const mobAuthors = new MobAuthors();
  beforeEach(function() {
    commands.mob.listAll.mockReset();
    mobAuthors.reset();
  });

  it("reads and creates a list", function() {
    commands.mob.listAll.mockReturnValueOnce(
      `rk richard kotze rkotze@email.com\nts Tony Stark tony@stark.com`
    );

    let coAuthorList = mobAuthors.listAll;

    expect(commands.mob.listAll).toHaveBeenCalledTimes(1);
    expect(coAuthorList).toHaveLength(2);
  });

  it("Co-author list can have other character for key than a-z", function() {
    commands.mob.listAll.mockReturnValueOnce(
      `ri3h richard kotze rkotze@email.com\nsta-k Tony Stark tony@stark.com`
    );

    let coAuthorList = mobAuthors.listAll;

    expect(commands.mob.listAll).toHaveBeenCalledTimes(1);
    expect(coAuthorList).toHaveLength(2);
  });

  it("Repo authors should not contain co-authors with same email", async function() {
    commands.mob.listAll.mockReturnValueOnce(
      `rk richard kotze rkotze@email.com\nts Tony Stark tony@stark.com`
    );

    commands.getRepoAuthors.mockResolvedValueOnce(
      `   33\tRichard Kotze <rkotze@email.com>\n   53\tCaptian America <captain@america.com>`
    );

    let repoAuthors = await mobAuthors.repoAuthorList();

    expect(repoAuthors).toHaveLength(1);
    expect(repoAuthors[0].email).toEqual("captain@america.com");
  });
});
