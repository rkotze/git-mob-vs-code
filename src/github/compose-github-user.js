const { RepoAuthor } = require("../co-author-tree-provider/repo-authors");

function composeGitHubUser(gitHubUser) {
  const { login, email, id, name } = gitHubUser;
  const repoAuthor = new RepoAuthor(
    name || login,
    composeEmail(email, id, login),
    login
  );

  return repoAuthor;
}

function composeEmail(email, id, username) {
  if (email) {
    return email;
  }
  return `${id}+${username}@users.noreply.github.com`;
}

exports.composeGitHubUser = composeGitHubUser;
