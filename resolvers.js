const { PubSub } = require("apollo-server");

const Users = require("./models/Users");
const Books = require("./models/Books");

const pubsub = new PubSub();

const USER_CREATED = "USER-CREATED";

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
            const newGuy = await user.save();
            pubsub.publish(USER_CREATED, { newUser: newGuy });
            return newGuy;
        },

        book: async (a, { title, author }) => {
            const book = new Books({ title, author });
            const bk = await book
                .save()
                .then((b) => b.populate("author").execPopulate());
            return bk;
        },
    },

    Subscription: {
        newUser: {
            subscribe: () => pubsub.asyncIterator([USER_CREATED]),
        },
    },
};

module.exports = resolvers;
