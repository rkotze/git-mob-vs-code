const os = require("os");
const { RepoAuthor, createRepoAuthorList } = require("./repo-authors");

describe("Extract repository authors", function() {
  it("Given a list of authors extract the name and email", function() {
    //   3\tThiago <thiago_bordignon@live.com>\n     2	Benjamin Paske <bpaske@brightsolid.local>     2	David Elliott <delliott@findmypast.com>
    const listOfAuthorsString = `   33\tRichard Kotze <rkotze@email.com>${
      os.EOL
    }   53\tTony Stark <tony@stark.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).toEqual([
      new RepoAuthor(0, "Richard Kotze", "rkotze@email.com", "rkem"),
      new RepoAuthor(1, "Tony Stark", "tony@stark.com", "tsst")
    ]);
  });

  it("author has one name", function() {
    const listOfAuthorsString = `   33\tRichard <rkotze@email.com>${
      os.EOL
    }   53\tTony Stark <tony@stark.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).toEqual([
      new RepoAuthor(0, "Richard", "rkotze@email.com", "rem"),
      new RepoAuthor(1, "Tony Stark", "tony@stark.com", "tsst")
    ]);
  });

  it("author uses a private GitHub email", function() {
    const listOfAuthorsString = `   33\tRichard <rkotze@email.com>${
      os.EOL
    }   53\tTony Stark <20342323+tony@users.noreply.github.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).toEqual([
      new RepoAuthor(0, "Richard", "rkotze@email.com", "rem"),
      new RepoAuthor(
        1,
        "Tony Stark",
        "20342323+tony@users.noreply.github.com",
        "tsus"
      )
    ]);
  });

  it("only one author on repository", function() {
    const listOfAuthorsString = `   33\tRichard Kotze <rkotze@email.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).toEqual([
      new RepoAuthor(0, "Richard Kotze", "rkotze@email.com", "rkem")
    ]);
  });

  it("author has special characters in name", function() {
    const listOfAuthorsString = `   33\tRic<C4><8D>rd Kotze <rkotze@email.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).toEqual([
      new RepoAuthor(0, "Ric<C4><8D>rd Kotze", "rkotze@email.com", "rkem")
    ]);
  });

  it("exclude if fails to match author pattern in list", function() {
    const listOfAuthorsString = `   33\tRichard Kotze <rkotze.email.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).not.toEqual([expect.any(Error)]);
  });
});
