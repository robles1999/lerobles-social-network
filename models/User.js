const { Schema, model } = require("mongoose");

//::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                   USERS TABLE
//::::::::::::::::::::::::::::::::::::::::::::::::::::::
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Must match a valid email address!",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //      PLACE HOLDER FOR VIRTUAL KEY `friendsCount`
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::
  {
    toJSON: {
      // Indicates that we want virtuals to be included with our response
      virtuals: true,
    },
    id: false,
  }
);

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//    CREATES A VIRTUAL `friendCount` KEY IN THE USERS TABLE
//    AND SETS THE VALUE TO THE LENGTH OF THE `friends` array
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
