const { logIssue } = require("../errors/log-issue");
const { silentRun } = require("./silent-run");

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

function usingLocalTemplate() {
  return has("--local commit.template");
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
  return add("--global git-mob.co-author", coAuthor);
}

function removeGitMobSection() {
  return silentRun(`git config --global --remove-section git-mob`);
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
    gitAddCoAuthor,
    usingLocalTemplate,
  },
};
