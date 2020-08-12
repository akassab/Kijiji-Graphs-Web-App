const { model, Schema } = require("mongoose");

const addSchema = new Schema({
    searchOptions: {
        query: String,
        location: String,
        category: String,
    },
    url: String,
    img: String,
    title: String,
    price: String,
    description: String,
    postedAt: String,
});

module.exports = model("Add", addSchema);
