//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// const myExtension = require('../extension');
// Defines a Mocha test suite to group tests of similar kind together
describe("Extension Tests", function () {
  afterAll(() => {
    vscode.window.showInformationMessage("All tests done!");
  });
  // Defines a Mocha unit test
  it("Something 1", function () {
    expect(-1).toEqual([1, 2, 3].indexOf(5));
    expect(-1).toEqual([1, 2, 3].indexOf(0));
  });
});
