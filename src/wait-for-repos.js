async function waitForRepos(gitExt, bootFn, retries = 5) {
  if (gitExt.hasRepositories) {
    return bootFn();
  } else {
    if (retries > 0) {
      setTimeout(() => waitForRepos(gitExt, bootFn, retries - 1), 1000);
    }
  }
}

exports.waitForRepos = waitForRepos;
