const { composeGitHubUser } = require("./compose-github-user");

const gitHubUser = {
  login: "jenwalters",
  name: "Jen Walters",
  id: 39283,
  email: null,
};

test("Compose author from GitHub data with no email", () => {
  expect(composeGitHubUser(gitHubUser)).toEqual({
    name: "Jen Walters",
    commandKey: "jenwalters",
    email: "39283+jenwalters@users.noreply.github.com",
  });
});

test("Compose author from GitHub data with valid email", () => {
  const gitHubUserEmail = { ...gitHubUser, email: "jen.walters@she-hulk.com" };

  expect(composeGitHubUser(gitHubUserEmail)).toEqual({
    name: "Jen Walters",
    commandKey: "jenwalters",
    email: "jen.walters@she-hulk.com",
  });
});

test("Compose author from GitHub data with no email and no name", () => {
  const gitHubNoName = { ...gitHubUser, name: null };
  expect(composeGitHubUser(gitHubNoName)).toEqual({
    name: "jenwalters",
    commandKey: "jenwalters",
    email: "39283+jenwalters@users.noreply.github.com",
  });
});
