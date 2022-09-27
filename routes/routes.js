const express = require("express");
const router = express();

//import file
const facebookRoute = require("./facebook")

//use route
router.use("/facebook", facebookRoute);

module.exports = router
