const { CoAuthor } = require("./co-authors");
const { CoAuthorProvider } = require("./co-authors-provider");
const { RepoAuthor } = require("./repo-authors");

jest.mock("../mob-authors");
jest.mock("../vscode-git-extension/git-ext");

describe("Git author provider", function () {
  const jyn = new CoAuthor("Jyn Erso", "jyn@rebel.com", false, "je");
  const galen = new CoAuthor("Galen Erso", "galen@deathstar.com", false, "ge");
  const cassian = new RepoAuthor("Cassian Andor", "cassian@rebel.com", "ca");

  it("toggle one co-author to selected", () => {
    const provider = new CoAuthorProvider();
    provider.toggleCoAuthor(jyn, true);
    expect(provider.mobAuthors.setCurrent).toBeCalledWith([jyn], true);
  });

  it("toggle two co-authors to selected", () => {
    const provider = new CoAuthorProvider();
    provider.multiSelected = [jyn, galen];
    provider.toggleCoAuthor(jyn, true);
    expect(provider.mobAuthors.setCurrent).toBeCalledWith([jyn, galen], true);
  });

  it("when one co-author selected but click add action on different author", () => {
    const provider = new CoAuthorProvider();
    provider.multiSelected = [jyn];
    provider.toggleCoAuthor(galen, true);
    expect(provider.mobAuthors.setCurrent).toBeCalledWith([galen], true);
  });

  it("select RepoAuthor and two CoAuthors then only the CoAuthors should pass through", () => {
    const provider = new CoAuthorProvider();
    provider.multiSelected = [jyn, galen, cassian];
    provider.toggleCoAuthor(galen, true);
    expect(provider.mobAuthors.setCurrent).toBeCalledWith([jyn, galen], true);
  });
});
