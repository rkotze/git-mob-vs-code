const { CountDecorationProvider } = require("./count-decorator-provider");

describe("Count co-authors", function () {
  it("for selected co-authors", function () {
    let countDecorator = new CountDecorationProvider({
      mobAuthors: {
        listAll: new Array(5),
        listCurrent: new Array(2),
        repoAuthorList: jest.fn().mockResolvedValue(new Array(30)),
      },
      onCoAuthorChange: jest.fn(),
    });

    expect(
      countDecorator.provideFileDecoration({ path: "/selected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "2" }));
  });
});
