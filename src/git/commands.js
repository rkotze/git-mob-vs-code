const { exec } = require("child_process");
const { promisify } = require("util");
const { logIssue } = require("../errors/log-issue");
const { compare } = require("../semver/compare");
const { GitExt } = require("../vscode-git-extension/git-ext");
const { silentRun } = require("./silent-run");

/**
 * Runs the given command in a shell.
 * @param {string} command The command to execute
 * @returns {Promise}
 */
async function silentExec(command) {
  const execAsync = promisify(exec);
  try {
    const response = await execAsync(command, cmdOptions());

    return response.stdout;
  } catch (err) {
    logIssue(`GitMob silentExec: "${command}" ${err.message}`);
    return "";
  }
}

function handleResponse(query) {
  try {
    const response = silentRun(query);
    if (response.status !== 0) {
      logIssue(`GitMob handleResponse: "${query}" ${response.stderr.trim()}`);
      return "";
    }

    return response.stdout.trim();
  } catch (err) {
    logIssue(`GitMob catch: "${query}" ${err.message}`);
    return "";
  }
}

function getAll(key) {
  return handleResponse(`git config --get-all ${key}`);
}

function get(key) {
  return handleResponse(`git config --get ${key}`);
}

function has(key) {
  return silentRun(`git config ${key}`).status === 0;
}

function add(key, value) {
  return silentRun(`git config --add ${key} "${value}"`);
}

// Sets the option, overwriting the existing value if one exists.
function set(key, value) {
  const { status } = silentRun(`git config ${key} "${value}"`);
  if (status !== 0) {
    const message = `Option ${key} has multiple values. Cannot overwrite multiple values for option ${key} with a single value.`;
    logIssue(`GitMob set: ${message}`);
  }
}

function gitAddCoAuthor(coAuthor) {
  return add("git-mob.co-author", coAuthor);
}

function gitMobLatest() {
  const version = silentRun("npx git mob -v");
  if (version.status !== 0) return 1;
  return compare("1.1.0", version.stdout);
}

function installGitMob(local) {
  const flag = local ? "-D" : "-g";
  return silentExec(`npm i git-mob ${flag}`);
}

async function getRepoAuthors() {
  return silentExec(`git shortlog -sen HEAD`);
}

function removeGitMobSection() {
  return silentRun(`git config --remove-section git-mob`);
}

function cmdOptions(extendOptions = {}) {
  const gitExt = new GitExt();
  return {
    ...extendOptions,
    encoding: "utf8",
    cwd: gitExt.rootPath,
  };
}

module.exports = {
  config: {
    getAll,
    get,
    has,
    set,
  },
  mob: {
    removeGitMobSection,
    gitMobLatest,
    installGitMob,
    gitAddCoAuthor,
  },
  getRepoAuthors,
};
