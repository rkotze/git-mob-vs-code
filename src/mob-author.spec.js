const commands = require("./git/commands");
const { MobAuthors } = require("./mob-authors");

jest.mock("./git/commands");

test("Creates a co author", () => {
  commands.mob.listAll.mockReturnValue(
    `rk richard kotze rkotze@email.com\nts Tony Stark tony@stark.com`
  );

  let mobAuthors = new MobAuthors();
  let coAuthorList = mobAuthors.listAll;

  expect(commands.mob.listAll).toHaveBeenCalled();
  expect(coAuthorList).toHaveLength(2);
});
