const router = require("express").Router();


//routes
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/places", (req, res) => {
  res.render("places");
});

router.get("/mapbox", (req, res) => {
  res.render("mapbox");
});

router.get("/user", (req, res) => {
  res.render("user");
});

/* router.get("/burgers", (req, res) => {
  cnx.query("Select * from burgers",(err,dbBurgers) =>{
    if(err){
      console.log(err);
    }
    //console.log(dbBurgers);

    res.render("burgers",{burgers:dbBurgers});
  });
}); */

module.exports = router;