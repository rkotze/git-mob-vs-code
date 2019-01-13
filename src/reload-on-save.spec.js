const { reloadOnSave } = require("./reload-on-save");
const { CONSTANTS } = require("./constants");

const coAuthorProviderStub = {
  reloadData: jest.fn(),
  mobAuthors: {
    reset: jest.fn()
  }
};
const coAuthorTextDocStub = {
  fileName: `file/Path/to/${CONSTANTS.GIT_COAUTHORS_FILE}`
};
const otherTextDocStub = {
  fileName: `file/Path/to/other.js`
};

afterEach(() => {
  coAuthorProviderStub.reloadData.mockReset();
  coAuthorProviderStub.mobAuthors.reset.mockReset();
});

test("Reload co-author list when git-coauthors file saved", () => {
  const saveAction = reloadOnSave(coAuthorProviderStub);
  expect(saveAction).toEqual(expect.any(Function));
  saveAction(coAuthorTextDocStub);
  expect(coAuthorProviderStub.reloadData).toHaveBeenCalledTimes(1);
  expect(coAuthorProviderStub.mobAuthors.reset).toHaveBeenCalledTimes(1);
});

test("Do NOT reload co-author list when other files are saved", () => {
  const saveAction = reloadOnSave(coAuthorProviderStub);
  expect(saveAction).toEqual(expect.any(Function));
  saveAction(otherTextDocStub);
  expect(coAuthorProviderStub.reloadData).not.toHaveBeenCalled();
  expect(coAuthorProviderStub.mobAuthors.reset).not.toHaveBeenCalled();
});
