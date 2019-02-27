//import models dependency
const db = require("../models");

module.exports = {
  //create a Photo 
  createPhoto: (req, res) => {
    db
      .Photos
      .create(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Photo Creation Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all Photos
  getAllPhotos: (req, res) => {
    db
      .Photos
      .findAll({
        include: [db.Places, db.Users]
      })
      .then(dbPhotos => {
        res.json(dbPhotos);
      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all Photo by review
  getAllPhotosByPlace: (req, res) => {
    db
      .Photos
      .findAll({
        where:{
          PlaceId:req.params.placeId
        },
        include: [db.Users]
      })
      .then(dbPhotos => {
        res.json(dbPhotos);
      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  //delete a Photo
  deletePhoto: (req, res) => {
    db
      .Photos
      .destroy({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Delete Photo Error: " + err);
        res.status(400).json(err);
      });
  },
  //delete a Photo by PlaceId
  deletePhotoByPlaceId: (req, res) => {
    db
      .Photos
      .destroy({
        where: {
          PlaceId: req.params.placeId
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Delete Photo Error: " + err);
        res.status(400).json(err);
      });
  }
}
