const router = require("express").Router();
const userController = require("../../controllers/userController");
const cloudinaryMiddleware = require('../../utils/middleware/userCloudinary');
const passport = require('../../utils/middleware/passport-local');

//method to handle user authentication login status and logout
router
  .route("/status")
  .get(userController.userCheck);

router
  .route("/login")
  .post(passport.authenticate('local'), userController.login);

router
  .route("/logout")
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

// methods for /api/user (GET and POST) 
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.register);

//methods for api/users/:id (PUT and DELETE)
router
  .route("/:id")
  .get(userController.getUserActivities)
  .put(cloudinaryMiddleware,userController.updateAccount)
  .delete(userController.deleteUser);

//method to change user password
  router
  .route("/changePassword/:id")
  .put(cloudinaryMiddleware,userController.changePassword);

module.exports = router;