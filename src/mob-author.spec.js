const { mob } = require("./commands");

jest.mock("./commands", () => {
  return jest.fn().mockImplementation(() => {
    return {
      mob: {
        listAll: function() {
          return "rk richard kotze <rkotze@email.com>";
        }
      }
    };
  });
});

const { MobAuthors } = require("./mob-authors");

test("Creates a co author", () => {
  let a = new MobAuthors();

  expect(a.listAll).toHaveLength(1);
});
