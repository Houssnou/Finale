const router = require("express").Router();

// importing all api routes user,place, review, comment and photo
const userRoutes = require("./userRoutes");
const placeRoutes = require("./placeRoutes");
const reviewRoutes = require("./reviewRoutes");
const commentRoutes = require("./commentRoutes");
const photoRoutes = require("./photoRoutes");

// prefix api routes with their specific endpoint name
router.use("/users", userRoutes);
router.use("/places", placeRoutes);
router.use("/reviews", reviewRoutes);
router.use("/comments", commentRoutes);
router.use("/photos", photoRoutes)

module.exports = router;