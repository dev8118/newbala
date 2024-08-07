var express = require("express");
var router = express.Router();
const AdminRoute = require("./admin");
const HomeRoute = require("./HomeRoute");
const NavigationRoute = require("./NavigationRoute");
const CategoryRoute = require("./CategoryRoute");
const PostRoute = require("./PostRoute");
const ContactRoute = require("./ContactRoute");
const FormRoute = require("./FormRoute");

router.use("/admin", AdminRoute);
router.use("/home", HomeRoute);
router.use("/navigations", NavigationRoute);
router.use("/categories", CategoryRoute);
router.use("/posts", PostRoute);
router.use("/contact", ContactRoute);
router.use("/form", FormRoute);


module.exports = router;
