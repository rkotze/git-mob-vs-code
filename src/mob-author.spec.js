// const commandsMock = {
//   mob: {
//     listAll: jest.fn()
//   }
// };

const commands = require("./commands");
const { MobAuthors } = require("./mob-authors");

jest.mock("./commands");

test("Creates a co author", () => {
  commands.mob.listAll.mockReturnValue(
    `rk richard kotze rkotze@email.com\nts Tony Stark tony@stark.com`
  );
  // const listAll = jest.fn().mockReturnValue(
  //   `rk richard kotze <rkotze@email.com>
  //   ts Tony Stark <tony@stark.com>`
  // );
  // commands.mockImplementation(() => ({
  //   mob: {
  //     listAll
  //   }
  // }));

  let mobAuthors = new MobAuthors();
  let coAuthorList = mobAuthors.listAll;

  expect(commands.mob.listAll).toHaveBeenCalled();
  expect(coAuthorList).toHaveLength(2);
});
