import mongoose from "mongoose";

const vectorSchema = new mongoose.Schema({
  text: String,

  source: String,

  embedding: {
    type: [Number],
    required: true,
  },
});

export default mongoose.model("Vector", vectorSchema);
