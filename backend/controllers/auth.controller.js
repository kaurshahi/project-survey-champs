import User from "../models/user.model.js";
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
      secure: process.env.NODE_ENV === "production", // Use secure cookie in production
      sameSite: "strict", // Enforce same-site cookie attribute
      expiresIn: 3600000, // 1 hour expiration
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
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
    // Get token from request header or query parameter
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

      req[userProperty] = decoded; // Attach the decoded user object to the request
      next();
    });
  };
};

const requireSignin = customJwtMiddleware({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.params.userId && req.auth && req.params.userId == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }

  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
