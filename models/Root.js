const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RootSchema = new Schema({
  name: {
    type: String,
    default: "Root Node"
  },
  factories: [
    {
      factory: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Root = mongoose.model("root", RootSchema);
