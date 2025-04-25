const vscode = require("vscode");
const { CoAuthor } = require("../co-author-tree-provider/co-authors");
const { moveToCoAuthoring } = require("../ext-config/config");
const { saveNewCoAuthors } = require("git-mob-core");
const { inputAuthorData } = require("./shared/input-author-data");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      const moveToSelected = moveToCoAuthoring();

      if (author) {
        await saveNewCoAuthors([{ ...author, key: author.commandKey }]);
        const coAuthor = new CoAuthor(
          author.name,
          author.email,
          false,
          author.commandKey
        );
        coAuthorProvider.coAuthorGroups.addNew([coAuthor]);
        if (moveToSelected) {
          await coAuthorProvider.toggleCoAuthor(coAuthor, true);
        }
      } else {
        const newAuthor = await inputAuthorData([
          { key: "name", label: "Author name" },
          { key: "email", label: "Author email" },
          { key: "key", label: "Author initials" },
        ]);
        if (newAuthor) {
          await saveNewCoAuthors([newAuthor]);
          const coAuthor = new CoAuthor(
            newAuthor.name,
            newAuthor.email,
            false,
            newAuthor.key
          );
          coAuthorProvider.coAuthorGroups.addNew([coAuthor]);
          if (moveToSelected) {
            await coAuthorProvider.toggleCoAuthor(coAuthor, true);
          }
        }
      }

      if (!moveToSelected) {
        coAuthorProvider.reloadData();
      }
    }
  );
}

exports.addRepoAuthorToCoauthors = addRepoAuthorToCoauthors;
