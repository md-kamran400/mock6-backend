const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../models/black.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (token) {
      const existtingToken = await BlackListModel.findOne({
        blacklist: { $in: token },
      });
      if (existtingToken) {
        return res.status(400).send({ error: "Please Login Again" });
      }
      const decoded = jwt.verify(token, "Kamran");
      req.userID = decoded.userID;
      return next();
    } else {
      res.status(400).send("please Login First!");
    }
  } catch (error) {
    return res.status(400).send({ error: error.messgae });
  }
};

module.exports = auth
