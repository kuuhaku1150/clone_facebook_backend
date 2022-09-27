const express = require("express");
const router = express();

//import file
const postFacebookRoute = require("./route_facebook/post_facebook_router")
const userRoute = require("./route_facebook/user_router")

//use route
router.use("/postFacebook", postFacebookRoute);
router.use("/auth", userRoute);


module.exports = router;