const os = require("os");
const { coAuthorsFile } = require("./git-mob-coauthors-file");

jest.mock("os");

describe("Git coauthors path", function() {
  it("return absolute path without starting drive letter (Windows)", () => {
    os.homedir.mockReturnValue("C:\\this\\work");
    expect(coAuthorsFile.path).toEqual("this\\work\\.git-coauthors");
  });
});
