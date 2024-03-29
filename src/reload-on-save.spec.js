const { reloadOnSave } = require("./reload-on-save");
const { CONSTANTS } = require("./constants");
const vscode = require("../__mocks__/vscode");

const coAuthorProviderStub = {
  reloadData: jest.fn(),
  coAuthorGroups: {
    reloadData: jest.fn(),
  },
};
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
  coAuthorProviderStub.reloadData.mockReset();
  coAuthorProviderStub.coAuthorGroups.reloadData.mockReset();
  saveTrigger = null;
});

test("Reload co-author list when git-coauthors file saved", async () => {
  reloadOnSave({ coAuthorProvider: coAuthorProviderStub });
  expect(vscode.workspace.onDidSaveTextDocument).toHaveBeenCalledWith(
    expect.any(Function)
  );
  await saveTrigger(coAuthorTextDocStub);
  expect(coAuthorProviderStub.reloadData).toHaveBeenCalledTimes(1);
  expect(coAuthorProviderStub.coAuthorGroups.reloadData).toHaveBeenCalledTimes(
    1
  );
});

test("Do NOT reload co-author list when other files are saved", async () => {
  reloadOnSave({ coAuthorProvider: coAuthorProviderStub });
  expect(vscode.workspace.onDidSaveTextDocument).toHaveBeenCalledWith(
    expect.any(Function)
  );
  await saveTrigger(otherTextDocStub);
  expect(coAuthorProviderStub.reloadData).not.toHaveBeenCalled();
  expect(coAuthorProviderStub.coAuthorGroups.reloadData).not.toHaveBeenCalled();
});
