const { hasPrepareCommitMsgTemplate } = require("./../prepareCommitMsgFile");
const { gitMobHookStatus } = require("./git-mob-hook-status");

jest.mock("./../prepareCommitMsgFile");

describe("Hook or temaplate status", function() {
  let mockContext;
  beforeAll(function() {
    mockContext = {
      subscriptions: []
    };
  });

  afterEach(function() {
    hasPrepareCommitMsgTemplate.mockReset();
  });

  it("using git template for co-authors", () => {
    hasPrepareCommitMsgTemplate.mockReturnValue(false);
    const statusBar = gitMobHookStatus({ context: mockContext })();
    expect(statusBar).toEqual(
      expect.objectContaining({
        text: "$(file-code) Git Mob",
        tooltip: "Using .gitmessage template"
      })
    );
  });

  it("using git prepare commit msg for co-authors", () => {
    hasPrepareCommitMsgTemplate.mockReturnValue(true);
    const statusBar = gitMobHookStatus({ context: mockContext })();
    expect(statusBar).toEqual(
      expect.objectContaining({
        text: "$(zap) Git Mob",
        tooltip: "Using prepare-commit-msg hook"
      })
    );
  });
});
