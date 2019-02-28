const router = require("express").Router();

// import html and api routes
const apiRoutes=require("./api");


//fire up all routes 
//router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

module.exports = router;