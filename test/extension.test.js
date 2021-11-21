const vscode = require("vscode");
const expect = require("chai").expect;
const {
  getAllAuthors,
  getSelectedCoAuthors,
} = require("../src/git/git-mob-api");

const { CoAuthor } = require("../src/co-author-tree-provider/co-authors");

describe("GitMob core tests", function () {
  // this.timeout(5000);
  let allAuthors = [];
  before(async function () {
    allAuthors = await getAllAuthors();
  });

  it("add a co-author to commit", async function () {
    const coAuthor = new CoAuthor("Chris", "r@c.com", false, "ckth");
    await vscode.commands.executeCommand("gitmob.addCoAuthor", coAuthor);
    const selected = getSelectedCoAuthors(allAuthors);
    expect(selected).to.have.lengthOf(1);
    expect(selected[0].key).to.equal(coAuthor.commandKey);
  });

  it("run solo no co-authors should be selected", async function () {
    await vscode.commands.executeCommand("gitmob.solo");
    const selected = getSelectedCoAuthors(allAuthors);
    expect(selected).to.have.lengthOf(0);
  });
});
