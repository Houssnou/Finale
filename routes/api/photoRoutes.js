const router = require("express").Router();
const photoController = require("../../controllers/photoController");
const cloudinaryMiddleware = require('../../utils/middleware/photoCloudinary');

//method for /api/photo
router
.route("/")
.get(photoController.getAllPhotos)
.post(cloudinaryMiddleware,photoController.createPhoto);

//method for /api/photo/placeId
router
.route("/:placeId")
.get(photoController.getAllPhotosByPlace)
.delete(photoController.deletePhotoByPlaceId)

//method for /api/photoId
router
.route("/:id")
.put(photoController.deletePhoto);

module.exports = router;