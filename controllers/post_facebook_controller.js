const postFacebookModel = require("../models/post_facebook");
// const socketApi = require("../socket/socketApi");
var bodyParser = require("body-parser");

exports.manage = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let comments = [];
  let likes = [];
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
    if (data.comments) {
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
    }
    if (data.likes) {
      let resLike = await postFacebookModel.findOne({ _id: id });
      likes = resLike.likes;
      if (resLike.likes.length !== 0) {
        for (let [index, resData] of resLike.likes.entries()) {
          console.log("1", data.likes.userLike.idUserLike);
          console.log("2", resData.userLike.idUserLike);
          if (resData.userLike.idUserLike === data.likes.userLike.idUserLike) {
            await postFacebookModel.updateOne(
              { _id: id },
              {
                $set: {
                  ["likes." + index + ".userLike.like"]:
                    data.likes.userLike.like,
                },
              }
            );
            break;
          } 
          // else {
          //   likes.push(data.likes);
          //   data.likes = likes;
          //   await postFacebookModel
          //     .updateOne({ _id: id }, data)
          //     .then((result) => {
          //       // socketApi.sendComments(data.comments, id);
          //       res.status(200).json({
          //         status: true, //
          //         message: "UPDATE_SUCCESS", //
          //       });
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //       res.status(500).json({
          //         status: false, //
          //         message: "SYSTEM_FAIL", //
          //       });
          //     });
          //   break;
          // }
        }
      } else {
        likes.push(data.likes);
        data.likes = likes;
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
      }
    }
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
