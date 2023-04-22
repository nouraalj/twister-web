const mongoose = require("mongoose");

const twistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    img: {
      type: String,
    },
    likes: {
      type: [String],
      required: true,
      default: [],
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamps: Number,
        },
      ],
      required: true,
      default: [],
    },
    retwists: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
  },
  {
    timestamps: true,
  }
);
const TwistModel = mongoose.model("twist", twistSchema);

module.exports = TwistModel;
