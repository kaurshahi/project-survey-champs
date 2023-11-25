import express from "express";
import responseCtrl from "../controllers/response.controller.js";
import surveyCtrl from "../controllers/survey.controller.js"; // Import survey controller for surveyByID middleware
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Routes for handling responses to a survey
router
  .route("/api/surveys/:surveyId/responses")
  .get(authCtrl.requireSignin, responseCtrl.list) // List all responses for a survey
  .post(responseCtrl.create); // Create a new response (allows anonymous)

// Routes for specific response operations
router
  .route("/api/responses/:responseId")
  .get(authCtrl.requireSignin, responseCtrl.read) // Read a specific response
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, responseCtrl.update) // Update a specific response
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    responseCtrl.remove
  ); // Delete a response

// Middleware to fetch a survey based on surveyId
router.param("surveyId", surveyCtrl.surveyByID);

// Middleware to fetch a response based on responseId
router.param("responseId", responseCtrl.responseByID);

export default router;
