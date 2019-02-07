const { CoAuthor, createAuthor } = require("./co-authors");

describe("Co-author creation", function() {
  it("reads and creates a co-author", function() {
    let coAuthorList = createAuthor(`rk richard kotze rkotze@email.com`);

    expect(coAuthorList).toEqual(
      new CoAuthor("richard kotze", "rkotze@email.com", false, "rk")
    );
  });

  it("can have other character for key than a-z", function() {
    let coAuthorList = createAuthor(`ri3-h richard kotze rkotze@email.com`);

    expect(coAuthorList).toEqual(
      new CoAuthor("richard kotze", "rkotze@email.com", false, "ri3-h")
    );
  });
});
