import Survey from "../models/survey.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
import moment from "moment";

const list = async (req, res) => {
  try {
    const current = moment();
    const surveys = await Survey.find({
      owner: req.auth._id,
    });
    res.json(surveys);
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const active = async (req, res) => {
  try {
    const current = moment().toDate();
    const surveys = await Survey.find({
      expirationDate: { $gte: current },
    });
    res.json(surveys);
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const create = async (req, res) => {
  try {
    const survey = new Survey(req.body);

    survey.owner = req.auth._id;
    await survey.save();
    res.status(201).json(survey);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const surveyByID = async (req, res, next, id) => {
  try {
    const survey = await Survey.findById(id);
    if (!survey) return res.status("400").json({ error: "Survey not found" });
    req.survey = survey;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve survey",
    });
  }
};

const read = (req, res) => {
  return res.json(req.survey);
};

const update = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId).exec();
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }
    extend(survey, req.body);
    survey.updatedAt = Date.now();
    await survey.save();
    res.json(survey);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId).exec();
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }
    const deletedSurvey = await survey.deleteOne();
    res.json(deletedSurvey);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { list, create, surveyByID, read, update, remove, active };
