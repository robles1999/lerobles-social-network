const { Schema } = require("mongoose");

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// This will not be a model, but rather will be used as 
// the reaction field's subdocument schema in the Thought model. 
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timestamp.toLocaleString(), // Format the timestamp on query
    },
  },
  { _id: false } // Disable generating a separate _id for each reaction subdocument
);

module.exports = reactionSchema;
