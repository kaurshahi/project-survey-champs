import express from "express";
import surveyCtrl from "../controllers/survey.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/surveys")
  .get(authCtrl.requireSignin, surveyCtrl.list)
  .post(authCtrl.requireSignin, surveyCtrl.create);

router
  .route("/api/surveys/:surveyId")
  .get(surveyCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, surveyCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, surveyCtrl.remove);

router.param("surveyId", surveyCtrl.surveyByID);

export default router;
