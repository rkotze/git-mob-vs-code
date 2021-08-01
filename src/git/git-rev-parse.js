const { silentRun } = require("./silent-run");

/**
 * Extracts the git version into an array format.
 * @param {string} version a string containing a semver format
 * @returns {array} [major, minor, patch]
 */
function gitVersion(version) {
  const [, major, minor, patch] = /(\d)\.(\d*)\.(\d*)/gm.exec(version);
  return [major, minor, patch];
}

function gitPath(path) {
  const version = silentRun("git --version").stdout.trim();
  const [major, minor] = gitVersion(version);

  if (major >= 2 && minor >= 13) {
    return silentRun(`git rev-parse --git-path ${path}`).stdout.trim();
  }

  // Git pre-v2.13 does not give relative path to GIT_DIR for `rev-parse --git-path`.
  // Prefix relative path with `--show-cdup`.
  // Git release notes: https://github.com/git/git/blob/master/Documentation/RelNotes/2.13.0.txt#L71-L74
  const relativePath = silentRun(
    `git rev-parse --show-cdup && git rev-parse --git-path ${path}`
  ).stdout.trim();
  return relativePath.replace(/(\r\n|\r|\n)/, "");
}

/**
 * Computes the path to the top-level directory of the git repository.
 * @returns {string} Path to the top-level directory of the git repository.
 */
function topLevelDirectory() {
  return silentRun("git rev-parse --show-toplevel").stdout.trim();
}

/**
 * Checks if the current working directory is inside the working tree of a git repository.
 * @returns {boolean} Is the cwd in a git repository?
 */
function insideWorkTree() {
  return silentRun("git rev-parse --is-inside-work-tree").status === 0;
}

module.exports = {
  topLevelDirectory,
  gitPath,
  insideWorkTree,
};
