const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/jwt_decode");

exports.login = async (req, res) => {
  try {
    let { password, username } = req.body;
    let user = await userModel.findOne({ username: username });
    if (!user) {
      return res.status(400).send({
        message: "USERNAME_NOT_FOUND",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(500).send({
        message: "login failed",
        success: false,
      });
    } else {
      const token = jwt.sign(
        {
          user,

          session: {
            created_at: Date.now(),
            expiresIn: 86400,
            expiresTXT: "1d",
          },
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).send({
        data: user,
        message: "login success",
        success: true,
        token: token,
        expiresIn: 86400,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      status: 500,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const data = req.body;
    bcrypt.hash(data.password, 12).then(async (password) => {
      data.password = password;

      await userModel.create(data).then((result) => {
        res.status(200).json({
          status: true, //
          message: "CREATE_USER_SUCCESS",
          data: result,
        });
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      status: 500,
    });
  }
};

exports.show = async (req, res) => {
  await userModel
    .find()
    .select(["-__v"])
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "SUCCESS",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        message: error,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const where = {
    _id: id,
  };

  await userModel
    .findOneAndDelete(where)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "DELETE_SUCCESS",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        message: error,
      });
    });
};
