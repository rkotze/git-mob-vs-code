const { reloadOnSave } = require("./reload-on-save");
const { CONSTANTS } = require("./constants");
const vscode = require("../__mocks__/vscode");

const coAuthorTextDocStub = {
  fileName: `file/Path/to/${CONSTANTS.GIT_COAUTHORS_FILE}`,
};
const otherTextDocStub = {
  fileName: `file/Path/to/other.js`,
};

let saveTrigger = null;
beforeEach(() => {
  vscode.workspace.onDidSaveTextDocument.mockImplementation((cb) => {
    saveTrigger = cb;
  });
});

afterEach(() => {
  saveTrigger = null;
});

test("Reload co-author list when git-coauthors file saved", async () => {
  reloadOnSave();
  expect(vscode.workspace.onDidSaveTextDocument).toHaveBeenCalledWith(
    expect.any(Function)
  );
  await saveTrigger(coAuthorTextDocStub);
  expect(vscode.commands.executeCommand).toHaveBeenCalledTimes(1);
  expect(vscode.commands.executeCommand).toHaveBeenCalledWith("gitmob.reload");
});

test("Do NOT reload co-author list when other files are saved", async () => {
  reloadOnSave();
  expect(vscode.workspace.onDidSaveTextDocument).toHaveBeenCalledWith(
    expect.any(Function)
  );
  await saveTrigger(otherTextDocStub);
  expect(vscode.commands.executeCommand).not.toHaveBeenCalled();
  expect(vscode.commands.executeCommand).not.toHaveBeenCalledWith(
    "gitmob.reload"
  );
});
