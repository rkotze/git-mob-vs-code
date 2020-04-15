const os = require("os");
const { hasPrepareCommitMsgTemplate } = require("../prepare-commit-msg-file");

exports.replaceCoAuthors = function replaceCoAuthors(coAuthors) {
  return function (currentText) {
    const noCoAuthors = currentText.replace(
      /(\r\n|\r|\n)*Co-authored-by.*(\r\n|\r|\n)*/g,
      ""
    );
    if (hasPrepareCommitMsgTemplate()) return noCoAuthors;

    const coAuthorsMetadata = formatCoAuthors(coAuthors);

    if (coAuthorsMetadata.length > 0)
      return noCoAuthors + os.EOL + os.EOL + coAuthorsMetadata;

    return noCoAuthors + coAuthorsMetadata;
  };
};

function formatCoAuthors(authors) {
  return authors.map((author) => author.format()).join(os.EOL);
}
