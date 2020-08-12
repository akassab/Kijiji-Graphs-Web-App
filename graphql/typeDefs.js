const { gql } = require("apollo-server");

module.exports = gql`
  type Folder {
    name: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    folders: [Folder]!
    folderCount: Int!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type SearchOptions {
    id: ID
    query: String!
    location: String!
    category: String!
    searchedAt: String # can be null when directly in an Add object, used for the AddsBox (Adds)
  }
  type Add {
    id: ID ## NUll searched adds, not null for liked adds
    searchOptions: SearchOptions #  NUll searched adds, not null for liked adds
    url: String!
    img: String!
    title: String!
    price: String!
    postedAt: String!
    description: String!
    folder: String
    likedAt: String ## 1. used for getLikes output and not used for searchKijiji output
  }
  type Adds {
    adds: [Add]!
    addCount: Int!
    searchOptions:  SearchOptions ## 1. used for searchKijiji not used for getlikes
  }
  type SearchQueries {
    searchQueries: [SearchOptions]!
    searchCount: Int!
  }
  
  input SearchOptionsInput {
    query: String!
    location: String!
    category: String!
  }
  input LikedAdd {
    searchOptions: SearchOptionsInput!
    url: String!
    title: String!
    price: String!
    description: String! 
    postedAt: String! 
  }

  type Query {
    getLikes: Adds!
    getSearchQueries: SearchQueries!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    likeAdd(add: LikedAdd!, folder: String): Add!
    unLikeAdd(addId: ID!): String!
    searchKijiji(searchOptions: SearchOptionsInput): Adds!
    deleteSearchQuery(searchQueryId: ID!): String!
    clearSearchQueries: String!
    createFolder(folderName: String!): User!
    
  }
`;
