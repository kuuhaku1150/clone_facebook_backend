const express = require("express");
const router = express.Router();

const postFacebookController = require("../../controllers/post_facebook_controller")

router.post("/manage/:id?", postFacebookController.manage);
router.get("/get", postFacebookController.show);
router.get("/get/:id", postFacebookController.get);
router.delete("/delete/:id", postFacebookController.delete);

module.exports = router;