const { CountDecorationProvider } = require("./count-decorator-provider");

describe("Count co-authors", function () {
  let mockCoAuthorProvider = {
    coAuthorGroups: {
      getUnselected: jest
        .fn()
        .mockReturnValue(new Array(5).fill({ selected: false })),
      getSelected: jest.fn().mockReturnValue(new Array(2)),
      getGitRepoAuthors: jest.fn(),
    },
    onDidChangeTreeData: jest.fn(),
  };

  it("should be two selected", async function () {
    let countDecorator = new CountDecorationProvider(mockCoAuthorProvider);
    await expect(
      countDecorator.provideFileDecoration({ path: "/selected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "2" }));
  });

  it("should be five unselected", async function () {
    let countDecorator = new CountDecorationProvider(mockCoAuthorProvider);
    await expect(
      countDecorator.provideFileDecoration({ path: "/unselected" })
    ).resolves.toEqual(expect.objectContaining({ badge: "5" }));
  });

  it("should have 30 more authors", async function () {
    mockCoAuthorProvider.coAuthorGroups.getGitRepoAuthors.mockResolvedValueOnce(
      new Array(30)
    );
    let countDecorator = new CountDecorationProvider(mockCoAuthorProvider);
    await expect(
      countDecorator.provideFileDecoration({ path: "/more-authors" })
    ).resolves.toEqual(expect.objectContaining({ badge: "30" }));
  });

  it("when 100+ show 99 in badge because limit is two characters", async function () {
    mockCoAuthorProvider.coAuthorGroups.getGitRepoAuthors.mockResolvedValueOnce(
      new Array(101)
    );
    let countDecorator = new CountDecorationProvider(mockCoAuthorProvider);
    await expect(
      countDecorator.provideFileDecoration({ path: "/more-authors" })
    ).resolves.toEqual(expect.objectContaining({ badge: "99" }));
  });
});
