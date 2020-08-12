const { model, Schema } = require("mongoose");

const SearchQuerySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: String,
    query: String,
    location: String,
    category: String,
    searchedAt: String,

});

module.exports = model("SearchQuery", SearchQuerySchema);
