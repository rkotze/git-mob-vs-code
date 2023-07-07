const { CoAuthor } = require("./co-authors");
const { CoAuthorProvider } = require("./co-authors-provider");
const { RepoAuthor } = require("./repo-authors");

jest.mock("../mob-authors");
jest.mock("../vscode-git-extension/git-ext");

describe("Git author provider", function () {
  const jyn = new CoAuthor("Jyn Erso", "jyn@rebel.com", false, "je");
  const galen = new CoAuthor("Galen Erso", "galen@deathstar.com", false, "ge");
  const cassian = new RepoAuthor("Cassian Andor", "cassian@rebel.com", "ca");
  const coAuthorGroups = {
    select: jest.fn(),
    unselect: jest.fn(),
  };

  this.afterEach(() => {
    coAuthorGroups.select.mockReset();
    coAuthorGroups.unselect.mockReset();
  });

  it("Select one co-author", () => {
    const provider = new CoAuthorProvider(coAuthorGroups);
    provider.toggleCoAuthor(jyn, true);
    expect(provider.coAuthorGroups.select).toBeCalledWith([jyn]);
  });

  it("Unselect one co-author", () => {
    const provider = new CoAuthorProvider(coAuthorGroups);
    provider.toggleCoAuthor(galen, false);
    expect(provider.coAuthorGroups.unselect).toBeCalledWith([galen]);
  });

  it("toggle two co-authors to selected", () => {
    const provider = new CoAuthorProvider(coAuthorGroups);
    provider.multiSelected = [jyn, galen];
    provider.toggleCoAuthor(jyn, true);
    expect(provider.coAuthorGroups.select).toBeCalledWith([jyn, galen]);
  });

  it("when one co-author selected but click add action on different author", () => {
    const provider = new CoAuthorProvider(coAuthorGroups);
    provider.multiSelected = [jyn];
    provider.toggleCoAuthor(galen, true);
    expect(provider.coAuthorGroups.select).toBeCalledWith([galen]);
  });

  it("select RepoAuthor and two CoAuthors then only the CoAuthors should pass through", () => {
    const provider = new CoAuthorProvider(coAuthorGroups);
    provider.multiSelected = [jyn, galen, cassian];
    provider.toggleCoAuthor(galen, true);
    expect(provider.coAuthorGroups.select).toBeCalledWith([jyn, galen]);
  });
});
