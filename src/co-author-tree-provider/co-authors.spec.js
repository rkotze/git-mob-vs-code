const { CoAuthor, createAuthor } = require("./co-authors");
const { ErrorAuthor } = require("./error-author");

describe("Co-author creation", function () {
  it("reads and creates a co-author", function () {
    let coAuthorList = createAuthor(`rk richard kotze rkotze@email.com`);

    expect(coAuthorList).toEqual(
      new CoAuthor("richard kotze", "rkotze@email.com", false, "rk")
    );
  });

  it("can have symbol character for key", function () {
    let coAuthorList = createAuthor(`ri3-h richard kotze rkotze@email.com`);

    expect(coAuthorList).toEqual(
      new CoAuthor("richard kotze", "rkotze@email.com", false, "ri3-h")
    );
  });

  it("can have special character for key", function () {
    let coAuthorList = createAuthor(`ričßh richard kotze rkotze@email.com`);

    expect(coAuthorList).toEqual(
      new CoAuthor("richard kotze", "rkotze@email.com", false, "ričßh")
    );
  });

  it("author uses a private GitHub email", function () {
    let coAuthorList = createAuthor(
      `tsus Tony Stark 20342323+tony@users.noreply.github.com`
    );

    expect(coAuthorList).toEqual(
      new CoAuthor(
        "Tony Stark",
        "20342323+tony@users.noreply.github.com",
        false,
        "tsus"
      )
    );
  });

  it("empty string returns an ErrorAuthor object", function () {
    let coAuthorList = createAuthor("");

    expect(coAuthorList).toEqual(new ErrorAuthor());
  });
});
