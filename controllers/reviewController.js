//import models dependency
const db = require("../models");

module.exports = {
  //create a Reviews 
  createReview: (req, res) => {
    db
      .Reviews
      .create(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Review Creation Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all Reviews 
  getAllReviews: (req, res) => {
    db
      .Reviews
      .findAll({
        include: [db.Users, db.Places]
      })
      .then(dbReviews => {
        res.json(dbReviews);
      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  //select Reviews by Places
  getReviewsByPlace: (req, res) => {
    db
      .Reviewss
      .findAll({
        where: {
          PlaceId: req.params.placeId
        },
        include: [db.Comments]
      })
      .then(dbReviewss => {
        res.json(dbReviewss);
      })
      .catch(err => {
        console.log("Select Reviews by PlaceId Error: " + err);
        res.status(400).json(err);
      });
  },
  //delete a review
  deleteReview: (req, res) => {
    db
      .Reviews
      .destroy({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Delete Review Error: " + err);
        res.status(400).json(err);
      });
  }
}
