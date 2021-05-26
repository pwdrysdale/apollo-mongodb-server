const Users = require("./models/Users");
const Books = require("./models/Books");

const resolvers = {
    Query: {
        user: (_, { _id }) => Users.findById(_id),
        users: () => Users.find({}),
        book: (a, { _id }) => Books.findById(_id).populate("author"),
        books: () => Books.find({}).populate("author"),
    },

    Mutation: {
        user: async (a, { name }) => {
            const user = new Users({ name });
            await user.save();
            return user;
        },

        book: async (a, { title, author }) => {
            const book = new Books({ title, author });
            const bk = await book
                .save()
                .then((b) => b.populate("author").execPopulate());
            return bk;
        },
    },
};

module.exports = resolvers;
