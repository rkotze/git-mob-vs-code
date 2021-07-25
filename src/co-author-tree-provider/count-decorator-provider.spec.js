const { CountDecorationProvider } = require("./count-decorator-provider");

describe("Count co-authors", function () {
  let decoratorOptions = {
    mobAuthors: {
      listAll: jest
        .fn()
        .mockResolvedValue(new Array(5).fill({ selected: false })),
      listCurrent: jest.fn().mockResolvedValue(new Array(2)),
      repoAuthorList: jest.fn().mockResolvedValue(new Array(30)),
    },
    onDidChangeTreeData: jest.fn(),
  };

  it("should be two selected", async function () {
    let countDecorator = new CountDecorationProvider(decoratorOptions);
    await expect(
      countDecorator.provideFileDecoration({ path: "/selected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "2" }));
  });

  it("should be five unselected", async function () {
    let countDecorator = new CountDecorationProvider(decoratorOptions);
    await expect(
      countDecorator.provideFileDecoration({ path: "/unselected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "5" }));
  });

  it("should have 30 more authors", async function () {
    let countDecorator = new CountDecorationProvider(decoratorOptions);
    await expect(
      countDecorator.provideFileDecoration({ path: "/more-authors" })
    ).resolves.toEqual(expect.objectContaining({ badge: "30" }));
  });

  it("when 100+ show 99 in badge because limit is two characters", async function () {
    const decoratorOptionsCopy = { ...decoratorOptions };
    decoratorOptionsCopy.mobAuthors = {
      ...decoratorOptions.mobAuthors,
      repoAuthorList: jest.fn().mockResolvedValue(new Array(101)),
    };
    let countDecorator = new CountDecorationProvider(decoratorOptionsCopy);
    await expect(
      countDecorator.provideFileDecoration({ path: "/more-authors" })
    ).resolves.toEqual(expect.objectContaining({ badge: "99" }));
  });
});
