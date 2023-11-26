import Response from "../models/response.model.js";
import Survey from "../models/survey.model.js";
import errorHandler from "./error.controller.js";
import extend from "lodash/extend.js";

const list = async (req, res) => {
  try {
    const responses = await Response.find({ survey: req.survey._id })
      .sort({ updatedAt: -1 })
      .exec();
    res.json(responses);
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const create = async (req, res) => {
  try {
    const response = new Response(req.body);
    response.survey = req.survey._id;

    if (req.profile) {
      response.respondent = req.profile._id;
    }

    await response.save();

    await Survey.findByIdAndUpdate(req.survey._id, {
      $push: { responses: response._id },
    });

    res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const responseByID = async (req, res, next, id) => {
  try {
    const response = await Response.findById(id);
    if (!response)
      return res.status("400").json({ error: "Response not found" });
    req.response = response;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve response",
    });
  }
};

const read = (req, res) => {
  return res.json(req.response);
};

const update = async (req, res) => {
  try {
    let response = req.response;
    response = extend(response, req.body);
    response.updated = Date.now();
    await response.save();
    res.json(response);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let response = req.response;
    let deletedResponse = await response.remove();
    res.json(deletedResponse);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByAuthenticatedUser = async (req, res) => {
  try {
    const userId = req.auth._id;
    const responses = await Response.find({ respondent: userId });
    res.json(responses);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user responses",
    });
  }
};

export default {
  list,
  create,
  responseByID,
  read,
  update,
  remove,
  listByAuthenticatedUser,
};
