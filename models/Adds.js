const { model, Schema } = require("mongoose");

const addsSchema = new Schema({
  adds: [
    {
      _id: Schema.Types.ObjectId,
      searchOptions: {
        query: String,
        location: String,
        category: String,
      },
      url: String,
      title: String,
      img: String,
      price: String,
      description: String,
      postedAt: String,
      likedAt: String,
    },
  ],
  searchOptions: {
    id: Schema.Types.ObjectId,
    query: String,
    location: String,
    category: String,
    searchedAt: String,
  },
});

module.exports = model("Adds", addsSchema);
