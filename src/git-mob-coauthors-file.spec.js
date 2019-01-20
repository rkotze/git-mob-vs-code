const os = require("os");
const path = require("path");
const { coAuthorsFile } = require("./git-mob-coauthors-file");

jest.mock("os");
jest.mock("path");

describe("Git coauthors path", function() {
  path.join.mockImplementation(function() {
    // simple mock so I can test drive letter or foward slash
    return [].slice.call(arguments, 0).join("");
  });

  afterEach(function() {
    os.homedir.mockReset();
  });

  it("return absolute path without starting drive letter (Windows)", () => {
    os.homedir.mockReturnValue("C:\\this\\work\\");
    expect(coAuthorsFile.path).toEqual("this\\work\\.git-coauthors");
  });

  it("return absolute path without starting forward slash (Unix)", () => {
    os.homedir.mockReturnValue("/diff/work/");
    expect(coAuthorsFile.path).toEqual("diff/work/.git-coauthors");
  });
});
