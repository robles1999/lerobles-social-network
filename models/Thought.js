const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//::::::::::::::::::::::::::::::::::::::::::::::::::::::
//              CREATING THE THOUGHT TABLE
//::::::::::::::::::::::::::::::::::::::::::::::::::::::
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Required field!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method to format the timestamp on query
      get: (timestamp) => timestamp.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    // These are like replies
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //     PLACE HOLDER FOR VIRTUAL KEY `reactionCount`
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//    CREATES A VIRTUAL `reactionCount` KEY IN THE THOUGHT TABLE
//    AND SETS THE VALUE TO THE LENGTH OF THE `reactions` array
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
