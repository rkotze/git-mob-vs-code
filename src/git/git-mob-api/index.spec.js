const { applyCoAuthors } = require(".");
const { mob, config } = require("../commands");
const { Author } = require("./author");
const { gitAuthors } = require("./git-authors");
const { gitMessage } = require("./git-message");
const {
  resolveGitMessagePath,
  setCommitTemplate,
} = require("./resolve-git-message-path");

jest.mock("../commands");
jest.mock("./git-authors");
jest.mock("./git-message");
jest.mock("./resolve-git-message-path");

describe("Git Mob API", () => {
  function buildAuthors(keys) {
    const authorMap = new Map();
    for (let key of keys) {
      authorMap.set(
        key,
        new Author(key, key + " lastName", key + "@email.com")
      );
    }
    return authorMap;
  }
  function buildMockGitAuthors(keys) {
    const authors = buildAuthors(keys);
    return function mockGitAuthors() {
      return {
        toList: jest.fn(() => authors),
        read: jest.fn(() => Promise.resolve()),
      };
    };
  }

  it("apply co-authors to git config and git message", async () => {
    const authorKeys = ["ab", "cd"];
    const authorList = buildAuthors(authorKeys);
    const mockWriteCoAuthors = jest.fn();
    gitAuthors.mockImplementation(buildMockGitAuthors(authorKeys));
    gitMessage.mockImplementation(() => ({
      writeCoAuthors: mockWriteCoAuthors,
    }));

    const coAuthors = await applyCoAuthors(authorKeys);

    expect(mob.gitAddCoAuthor).toBeCalledTimes(2);
    expect(mockWriteCoAuthors).toBeCalledWith(authorList);
    expect(coAuthors).toEqual(authorList);
  });
});
