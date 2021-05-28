const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  nodeId: { type: String },
  nodeName: { type: String },
  description: { type: String },
  ports: { type: Object },
  creationDate: {
    type: String,
    default: Date.now(),
  },
  lastRequest: { type: String },
  lastModifier: { type: String },
});

module.exports = mongoose.model("node", NodeSchema);
