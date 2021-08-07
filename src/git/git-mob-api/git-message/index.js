const fs = require('fs');
const os = require('os');
const path = require('path');

const { config, revParse } = require('../git-commands');

function fileExists(error) {
  return error.code !== 'ENOENT';
}

function append(messagePath, newAuthors) {
  return new Promise((resolve, reject) => {
    fs.readFile(messagePath, 'utf8', (error, data) => {
      if (error && fileExists(error)) reject(error);

      let result = newAuthors;
      if (data) {
        result = data.replace(/(\r\n|\r|\n){1,2}Co-authored-by.*/g, '') + newAuthors;
      }

      fs.writeFile(messagePath, result, error => {
        if (error) reject(error);

        resolve();
      });
    });
  });
}

function read(messagePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(messagePath, 'utf8', (error, data) => {
      if (error && fileExists(error)) reject(error);

      resolve(data);
    });
  });
}

function formatCoAuthorList(coAuthorList) {
  return coAuthorList
    .map(coAuthor => 'Co-authored-by: ' + coAuthor)
    .join(os.EOL);
}

function gitMessage(messagePath, appendFilePromise, readFilePromise) {
  const appendPromise = appendFilePromise || append;
  const readPromise = readFilePromise || read;

  return {
    writeCoAuthors: async coAuthorList => {
      const coAuthorText = formatCoAuthorList(coAuthorList);

      await appendPromise(messagePath, os.EOL + os.EOL + coAuthorText);
    },
    readCoAuthors: () => {
      return readPromise(messagePath);
    },
    removeCoAuthors: async () => {
      return appendPromise(messagePath, '');
    },
  };
}

function gitMessagePath() {
  return process.env.GITMOB_MESSAGE_PATH || revParse.gitPath('.gitmessage');
}

function commitTemplatePath() {
  return (
    process.env.GITMOB_MESSAGE_PATH ||
    config.get('commit.template') ||
    path.relative(revParse.topLevelDirectory(), gitMessagePath())
  );
}

module.exports = {
  gitMessage,
  gitMessagePath,
  commitTemplatePath,
  formatCoAuthorList,
};
