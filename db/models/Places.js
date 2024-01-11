import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true, match: [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)?/gi], },
  mapURL: { type: String, required: true, match: [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)?/gi] },
  description: { type: String, required: true },
  comments: { type: [Schema.Types.ObjectId], ref: "Comments" },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
