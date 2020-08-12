const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  folders: [{ id: Schema.Types.ObjectId, name: String }],
  createdAt: String,
});

module.exports = model("User", userSchema);
