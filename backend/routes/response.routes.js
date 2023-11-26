import express from "express";
import responseCtrl from "../controllers/response.controller.js";
import surveyCtrl from "../controllers/survey.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/surveys/:surveyId/responses")
  .get(authCtrl.requireSignin, responseCtrl.list)
  .post(responseCtrl.create);

router
  .route("/api/responses/:responseId")
  .get(authCtrl.requireSignin, responseCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, responseCtrl.update)
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    responseCtrl.remove
  );

router.get(
  "/api/responses",
  authCtrl.requireSignin,
  responseCtrl.listByAuthenticatedUser
);

router.param("surveyId", surveyCtrl.surveyByID);

router.param("responseId", responseCtrl.responseByID);

export default router;
