const router = require("express").Router();
const placeController = require("../../controllers/placeController");

//method for /api/place
router
.route("/")
.get(placeController.getAllPlaces)
.post(placeController.createPlace);

//method for /api/place/fullName
router
.route("/:fullName")
.get(placeController.getOnePlace);

//method for /api/placeId
router
.route("/:id")
.put(placeController.updatePlace);

module.exports = router;
