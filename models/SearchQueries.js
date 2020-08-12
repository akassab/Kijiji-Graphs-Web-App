const { model, Schema } = require("mongoose");

const searchQueriesSchema = new Schema({
    searchQueries: [
        {
            query: String,
            location: String,
            category: String,
            searchedAt: String,
        },
    ],
});

module.exports = model("SearchQueries", searchQueriesSchema);
