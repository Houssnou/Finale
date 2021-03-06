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
  //delete a review
  SelectReview: (req, res) => {
    db
      .Reviews
      .findOne({
        where: {
          id: req.params.id
        },include
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Select Review Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all Reviews 
  getAllReviews: (req, res) => {
    db
      .Reviews
      .findAll({
        include: [db.Users, db.Places,db.Comments]
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
      .Reviews
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
  getReviewsByUser: (req, res) =>{
    db
      .Reviews
      .findAll({
          where: {
            UserId: req.params.userId
          },
          include: [db.Places]
      })
        .then(dbReviews => {
          res.json(dbReviews);
        })
        .catch(error => {
          console.log(`Select reviews by userId error: ${error}`);
          res.status(400).json(error);
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
  },
  //update a review (upvote/downvote) 
  updateReview: (req, res) => {
    db
      .Reviews
      .update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Review Update Error: " + err);
        res.status(400).json(err);
      });
  }
}
