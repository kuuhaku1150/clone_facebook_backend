const postFacebookModel = require("../models/post_facebook");
const socketApi = require("../socket/socketApi");

exports.manage = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let comments = [];
  if (!id) {
    await postFacebookModel
      .create(data)
      .then((result) => {
        res.status(200).json({
          status: true, //
          message: "POST_FACEBOOK_SUCCESS",
          data: result,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: false, //
          message: "SYSTEM_FAIL", //
        });
      });
    return 0;
  } else {
    let resComment = await postFacebookModel.findOne({ _id: id });
    comments = resComment.comments;
    comments.push(data.comments);
    data.comments = comments;
    await postFacebookModel
      .updateOne({ _id: id }, data)
      .then((result) => {
        // socketApi.sendComments(data.comments, id);
        res.status(200).json({
          status: true, //
          message: "UPDATE_SUCCESS", //
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: false, //
          message: "SYSTEM_FAIL", //
        });
      });
    return 0;
  }
};

exports.show = async (req, res) => {
  await postFacebookModel
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

exports.get = async (req, res) => {
  const id = req.params.id;
  await postFacebookModel
    .findOne({ _id: id })
    .select(["-__v"])
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "GET_CATEGORIES_SUCCESS",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        message: "SYSTEM_FAIL",
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const where = {
    _id: id,
  };

  await postFacebookModel
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
