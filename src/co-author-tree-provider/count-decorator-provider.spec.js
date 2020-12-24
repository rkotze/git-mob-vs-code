const { CountDecorationProvider } = require("./count-decorator-provider");

describe("Count co-authors", function () {
  let countDecorator = new CountDecorationProvider({
    mobAuthors: {
      listAll: new Array(5).fill({ selected: false }),
      listCurrent: new Array(2),
      repoAuthorList: jest.fn().mockResolvedValue(new Array(30)),
    },
    onCoAuthorChange: jest.fn(),
  });

  it("should be two selected", function () {
    expect(
      countDecorator.provideFileDecoration({ path: "/selected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "2" }));
  });

  it("should be five unselected", function () {
    expect(
      countDecorator.provideFileDecoration({ path: "/unselected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "5" }));
  });

  it("should have 30 more authors", function () {
    expect(
      countDecorator.provideFileDecoration({ path: "/more-authors" })
    ).resolves.toEqual(expect.objectContaining({ badge: "30" }));
  });
});
