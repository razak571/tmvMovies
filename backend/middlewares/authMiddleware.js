import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

//check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read jwt from jwt cookie

  token = req.signedCookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Check if the user is Admin or not
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
