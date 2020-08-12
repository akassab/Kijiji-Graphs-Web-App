const { AuthenticationError, UserInputError } = require("apollo-server");
const Like = require("../../models/Like");
const Adds = require("../../models/Adds");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getLikes(_, a, context) {
      try {
        const { username } = checkAuth(context);
        const likes = await Like.find({ username }).sort({ likedAt: -1 });
        console.log(likes.length);
        const boxedLikes = new Adds({
          adds: likes,
        });
        return boxedLikes;
      } catch (err) {
        console.log("failure");
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async likeAdd(
      _,
      {
        add: {
          searchOptions: { query, location, category },
          url,
          title,
          price,
          description,
          postedAt,
        },
      },
      context
    ) {
      console.log("POSTED AT", postedAt);
      const user = checkAuth(context);
      const newLike = new Like({
        user: user.id,
        username: user.username,
        searchOptions: {
          query,
          location,
          category,
        },
        url,
        title,
        price,
        description,
        postedAt,
        likedAt: new Date().toISOString(),
      });
      const like = await newLike.save();
      return like;
    },
    async unLikeAdd(_, { addId }, context) {
      try {
        const user = checkAuth(context);
        const add = await Like.findById(addId);
        if (user.username === add.username) {
          await add.delete();
          return "Add un-liked successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
