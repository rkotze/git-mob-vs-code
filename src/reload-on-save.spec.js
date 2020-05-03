const { reloadOnSave } = require("./reload-on-save");
const { CONSTANTS } = require("./constants");
const vscode = require("../__mocks__/vscode");

const coAuthorProviderStub = {
  reloadData: jest.fn(),
  mobAuthors: {
    reset: jest.fn(),
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
  coAuthorProviderStub.mobAuthors.reset.mockReset();
  saveTrigger = null;
});

test("Reload co-author list when git-coauthors file saved", () => {
  reloadOnSave({ coAuthorProvider: coAuthorProviderStub });
  expect(vscode.workspace.onDidSaveTextDocument).toHaveBeenCalledWith(
    expect.any(Function)
  );
  saveTrigger(coAuthorTextDocStub);
  expect(coAuthorProviderStub.reloadData).toHaveBeenCalledTimes(1);
  expect(coAuthorProviderStub.mobAuthors.reset).toHaveBeenCalledTimes(1);
});

test("Do NOT reload co-author list when other files are saved", () => {
  reloadOnSave({ coAuthorProvider: coAuthorProviderStub });
  expect(vscode.workspace.onDidSaveTextDocument).toHaveBeenCalledWith(
    expect.any(Function)
  );
  saveTrigger(otherTextDocStub);
  expect(coAuthorProviderStub.reloadData).not.toHaveBeenCalled();
  expect(coAuthorProviderStub.mobAuthors.reset).not.toHaveBeenCalled();
});
