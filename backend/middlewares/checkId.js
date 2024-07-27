import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    throw new Error(`Invalid object of: ${req.params.id}`);
  }
  next();
}

export default checkId;
