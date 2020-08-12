const likeResolvers = require('./likes');
const usersResolvers = require('./users')
const searchQueryResolvers = require('./searchQueries');
const folderResolvers = require('./folders');
module.exports = {
    User: {
        folderCount: (parent) => parent.folders.length,
    },
    Adds: {
        addCount: (parent) => parent.adds.length,
    },
    SearchQueries: {
        searchCount: (parent) => parent.searchQueries.length,
    },
    Query: {
        ...likeResolvers.Query,
        ...searchQueryResolvers.Query

    },
    Mutation: {
        ...likeResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...searchQueryResolvers.Mutation,
        ...folderResolvers.Mutation
    },
};
