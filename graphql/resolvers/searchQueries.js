const { AuthenticationError, UserInputError } = require("apollo-server");
const checkAuth = require("../../util/check-auth");
const Add = require("../../models/Add");
const Adds = require("../../models/Adds");
const SearchQuery = require("../../models/SearchQuery");
const SearchQueries = require("../../models/SearchQueries");

module.exports = {
  Query: {
    async getSearchQueries(_, a, context) {
      try {
        const { username } = checkAuth(context);
        const searchQueries = await SearchQuery.find({ username }).sort({
          searchedAt: -1,
        });
        return new SearchQueries({
          searchQueries,
        });
      } catch (err) {
        throw new AuthenticationError("Action not allowed");
      }
    },
  },
  Mutation: {
    async searchKijiji(
      _,
      { searchOptions: { query, location, category } },
      context
    ) {
      const { id, username } = checkAuth(context);
      const newAdd = new Add({
        url: "url", // returned to graphql
        img: "img", // returned to graphql
        title: "title", // returned to graphql
        price: "price", // returned to graphql
        description: "description", // returned to graphql
        postedAt: "postedAt", // returned to graphql
      });
      const newSearchQuery = new SearchQuery({
        user: id, // not returned by graphql
        username, // not returned by graphql
        query, // returned to graphql
        location, // returned to graphql
        category, // returned to graphql
        searchedAt: new Date().toISOString(), // returned to graphql
      });
      const searchQuery = await newSearchQuery.save();
      return new Adds({
        adds: [newAdd],
        searchOptions: {...searchQuery._doc, id: searchQuery._id},
      });
    },
    async deleteSearchQuery(_, {searchQueryId}, context) {
      try {
        const { username } = checkAuth(context);

        const searchQuery = await SearchQuery.findById(searchQueryId);
        if (searchQuery) {
          if (username === searchQuery.username) {
            await searchQuery.delete();
            return "Search Query deleted successfully";
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        }
        return "Search query doesn't exist"
      } catch (err) {
        throw new Error(err);
      }
    },
    async clearSearchQueries(_, a, context) {
      try {
        const { username } = checkAuth(context);
        const searchQuery = await SearchQuery.find({ username });
        if (searchQuery.length) {
          if (username === searchQuery[0].username) {
            await SearchQuery.deleteMany({ username });
            return "Search Query deleted successfully";
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        }
        return "Search Query deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
