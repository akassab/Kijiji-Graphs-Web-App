const { model, Schema } = require("mongoose");

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  username: String,
  searchOptions: {
    query: String,
    location: String,
    category: String,
  },

  url: String,
  title: String,
  price: String,
  description: String,
  postedAt: String,
  likedAt: String,
});

module.exports = model("Like", likeSchema);
