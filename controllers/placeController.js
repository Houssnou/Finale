//import models dependency
const db = require("../models");

module.exports = {
  //create a place 
  createPlace: (req, res) => {
    db
      .Places
      .create(req.body)
      .then(result => {
        console.log("Place created!");
        res.json(result);
      })
      .catch(err => {
        console.log("Place Creation Error: " + err);
        res.status(400).json(err);
      });
  },
  //select all places 
  getAllPlaces: (req, res) => {
    db
      .Places
      .findAll({
        include: [db.Reviews, db.Photos]
      })
      .then(dbPlaces => {
        res.json(dbPlaces);
      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  //select a specific place 
  getOnePlace: (req, res) => {
    db
      .Places
      .findOne({
        where: {
          name: req.params.fullName
        },
        include: [db.Photos, {model: db.Reviews, include: [{model: db.Comments,include:[db.Users]},db.Users]}]
      })
      .then(dbPlaces => {
        res.json(dbPlaces);
      })
      .catch(err => {
        console.log("Select One Place Error: " + err);
        res.status(400).json(err);
      });
  },
  //get a place by location
  //get a place by city
  //get a place by state
  //update a place info 
  updatePlace: (req, res) => {
    db
      .Places
      .update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Place Update Error: " + err);
        res.status(400).json(err);
      });
  }
}
