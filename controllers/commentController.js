//import models dependency
const db = require("../models");

module.exports = {
  //create a Comment 
  createComment: (req, res) => {
    db
      .Comments
      .create(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Comment Creation Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all Comments
  getAllComments: (req, res) => {
    db
      .Comments
      .findAll({
        include: [db.Reviews, db.Users]
      })
      .then(dbComments => {
        res.json(dbComments);
      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all comment by review
  getAllCommentsByReview: (req, res) => {
    db
      .Comments
      .findAll({
        where:{
          ReviewId:req.params.reviewId
        },
        include: [db.Users]
      })
      .then(dbComments => {
        res.json(dbComments);
      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  getCommentsByUser: (req, res) => {
    db
      .Comments
      .findAll({
        where: {
          UserId: req.params.userId
        },
        include: [db.Reviews]
      })
        .then(dbComments => {
          res.json(dbComments);
        })
          .catch(error => {
            console.log(error);
            res.json(400).json(error)
          })
  },
  //delete a Comment
  deleteComment: (req, res) => {
    db
      .Comments
      .destroy({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Delete Comment Error: " + err);
        res.status(400).json(err);
      });
  }
}
