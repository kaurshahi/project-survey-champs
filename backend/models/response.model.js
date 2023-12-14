import mongoose from "mongoose";

const { Schema, model } = mongoose;

const responseOptionSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  response: Schema.Types.Mixed,
});

const responseSchema = new Schema(
  {
    survey: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    respondent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    responses: [responseOptionSchema],
  },
  {
    timestamps: true,
  }
);

export default model("Response", responseSchema);
