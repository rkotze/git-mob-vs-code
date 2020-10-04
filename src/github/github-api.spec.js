const { workspace } = require("../../__mocks__/vscode");
const { fetch } = require("./fetch");
const { get } = require("./github-api");

jest.mock("./fetch");

describe("requests to github api", function () {
  it("fetch data successfully", async function () {
    workspace.getConfiguration.mockReturnValue({
      get() {
        return "abc";
      },
    });
    fetch.mockResolvedValue(`{"items":[1]}`);
    const result = await get("search/users");
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0].toString()).toEqual(
      "https://api.github.com/search/users"
    );
    expect(fetch.mock.calls[0][1]).toEqual({
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token abc",
      },
      method: "GET",
    });

    expect(result).toEqual({ data: { items: [1] } });
  });
});
