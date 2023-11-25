import Survey from "../models/survey.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
import moment from "moment";

const list = async (req, res) => {
  try {
    const current = moment();
    const surveys = await Survey.find({
      owner: req.profile._id,
      activeDate: { $lte: current.toDate() },
      expirationDate: { $gte: current.toDate() },
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
    survey.owner = req.profile._id;
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
    let survey = req.survey;
    survey = extend(survey, req.body);
    survey.updated = Date.now();
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
    let survey = req.survey;
    let deletedSurvey = await survey.remove();
    res.json(deletedSurvey);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { list, create, surveyByID, read, update, remove };
