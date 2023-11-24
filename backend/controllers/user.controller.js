import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  try {
    const user = new User(req.body);

    user.hashedPassword = req.body.password;

    await user.save();

    const token = user.generateJWT();

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    console.error("User creation error:", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    console.error("User list error:", err);
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    console.error("User retrieval error:", err);
    return res.status(500).json({
      error: "Could not retrieve user",
    });
  }
};

const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const userProfile = { ...user.toObject() };

    delete userProfile.hashed_password;
    delete userProfile.salt;

    return res.json(userProfile);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    extend(user, req.body);
    user.updated = Date.now();

    await user.save();

    const userProfile = { ...user.toObject() };
    delete userProfile.hashed_password;
    delete userProfile.password;
    delete userProfile.salt;

    res.json(userProfile);
  } catch (err) {
    console.error("User update error:", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const deletedUser = await user.deleteOne();

    const deletedUserProfile = { ...deletedUser.toObject() };

    delete deletedUserProfile.password;
    delete deletedUserProfile.salt;

    return res.json(deletedUserProfile);
  } catch (err) {
    console.error("Error removing user:", err);
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
