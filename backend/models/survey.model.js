import mongoose from "mongoose";

const { Schema, model } = mongoose;

const optionSchema = new Schema({
  text: String,
});

const questionSchema = new Schema({
  type: {
    type: String,
    enum: ["multipleChoice", "agreeDisagree", "shortAnswer"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

const surveySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    activeDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    responses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Response",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Survey", surveySchema);
