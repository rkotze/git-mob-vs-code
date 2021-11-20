//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const myExtension = require("../extension");
const { CoAuthor } = require("../src/co-author-tree-provider/co-authors");
// jest.unmock("vscode");

describe("Co-authoring", function () {
  // let allAuthors = [];

  beforeAll(async () => {
    // allAuthors = await getAllAuthors();
  });

  afterAll(() => {
    vscode.window.showInformationMessage("All tests done!");
  });

  it("add a co-author to commit", async function () {
    const coAuthor = new CoAuthor("Chris", "r@c.com", false, "ckth");
    await vscode.commands.executeCommand("gitmob.addCoAuthor", coAuthor);
    const selected = await myExtension.selectedCoAuthors();
    expect(selected).toHaveLength(1);
    expect(selected[0].commandKey).toEqual(coAuthor.commandKey);
  });
});
