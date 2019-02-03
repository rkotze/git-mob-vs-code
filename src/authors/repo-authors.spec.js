const os = require("os");
const { RepoAuthor, createRepoAuthorList } = require("./repo-authors");

describe("Extract repository authors", function() {
  it("Given a list of authors extract the name and email", function() {
    const listOfAuthorsString = `33 Richard Kotze <rkotze@email.com>${
      os.EOL
    }53 Tony Stark <tony@stark.com>`;
    const listOfAuthors = createRepoAuthorList(listOfAuthorsString);
    expect(listOfAuthors).toEqual([
      new RepoAuthor("Richard Kotze", "rkotze@email.com"),
      new RepoAuthor("Tony Stark", "tony@stark.com")
    ]);
  });
});
