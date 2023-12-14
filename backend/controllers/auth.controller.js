import User from "../models/user.model.js";
import Survey from "../models/survey.model.js";
import Response from "../models/response.model.js";
import jwt from "jsonwebtoken";
import config from "./../config/config.js";

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.cookie("t", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.json({
      token,
      user: {
        _id: String(user._id),
        name: user.name,
        email: typeof user.email === "string" ? user.email : String(user.email),
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out",
  });
};

const customJwtMiddleware = (options = {}) => {
  const { secret, algorithms, userProperty } = options;

  return (req, res, next) => {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : req.query.token;

    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing" });
    }

    jwt.verify(token, secret, { algorithms }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req[userProperty] = decoded;
      next();
    });
  };
};

const requireSignin = customJwtMiddleware({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = async (req, res, next) => {
  try {
    if (req.baseUrl.includes("/api/users")) {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const authorized = req.auth && req.params.userId == req.auth._id;
      if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" });
      }
    } else if (req.baseUrl.includes("/api/surveys")) {
      const survey = await Survey.findById(req.params.surveyId);
      if (!survey) {
        return res.status(404).json({ error: "Survey not found" });
      }
      const authorized = survey.owner.equals(req.auth._id);
      if (!authorized) {
        return res
          .status(403)
          .json({ error: "User is not authorized to perform this action" });
      }
    } else if (req.baseUrl.includes("/api/responses")) {
      const response = await Response.findById(req.params.responseId);
      if (!response) {
        return res.status(404).json({ error: "Response not found" });
      }

      const authorized = response.user.equals(req.auth._id);
      if (!authorized) {
        return res
          .status(403)
          .json({ error: "User is not authorized to access this response" });
      }
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: "Error in authorization process" });
  }
};

export default { signin, signout, requireSignin, hasAuthorization };
