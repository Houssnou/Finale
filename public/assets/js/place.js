$(document).ready(() => {
  //global var
  let placeId;
  let userId;
  //read the data back from local Storage
  const placeData = JSON.parse(localStorage.getItem("place"));
  //localStorage.removeItem("place");

  //function to display the result content
  const showPlaceinfos = (place) => {
    $("#h1").text(place.name);
    $("#h2").text(`Category: ${place.category}`);
    const nReviews = (place.Reviews) ? place.Reviews.length : 0;
    $("#h3").text(`Number review: ${nReviews}`);
    $("#h4").text(`Is this place open: ${place.is_Open}`);
  };

  //function to build reviews in form of list of cards
  const showPlaceReviews=(review)=>{
    const rowCard=$("<div class='row'>");
    const colCard=$("<div class='col-12'>");
    const card=$("<div class= 'card'>");
    const cardHeader=$("<div class='card-header'>");
    cardHeader.text(`User id: ${review.UserId} - ${review.createdAt} - ${review.upvotes} - ${review.downvotes}`);
    const cardBody=$("<div class='card-body'>");
    const cardTitle=$("<h5 class='card-title'>").text(review.title);
    const cardText=$("<p class='card-text'>").text(review.description);

  }

  //check if the place exist already in the db
  //and pull infos to display if it exists
  //ajax call to check if the place exists
  $.ajax({
    method: "GET",
    url: "/api/places/" + placeData.name
  }).then(res => {

    if (res) {
      //display current info available for this place
      console.log(res);
      //alert("add a review");
      showPlaceinfos(res);
      //get the value of placeID
      placeId = (res.id);
      res.Reviews.forEach(review => showPlaceReviews(review));
    } else {
      alert("Be the first to leave a review");
      //then its a new place that we will create in our database
      $("#add-review").on("click", () => {
        //create the place in the db
        $.ajax({
          method: "POST",
          url: "/api/places",
          data: placeData
        }).then(result => {
          console.log(result);
          showPlaceinfos(result);
          //get the value of placeID
          placeId = (result.id);
          
        }).catch(err => {
          console.log(err);
        });

      })
    }

  }).catch(err => {
    console.log(err);
  });

  //ajax call to display the user informations
  $.ajax({
    url: "/api/users/status",
    method: 'GET'
  }).then(function (userConnected) {
    console.log(userConnected);
    if (userConnected) {
      //get the value of userId 
      userId = userConnected.id;
      //enable button to let user reviews, comments and photo
      $("#add-review").removeClass("disabled");
      $("#add-photo").removeClass("disabled");

      //disabled button login 
      $("#login").addClass("disabled");
    }
  });

  //event listener for a click on save on the modal
  $("#save-review").on("click", (event) => {
    //prvent page to reload
    event.preventDefault();

    //build an object 
    const reviewData = {
      title: $("#title-input").val().trim(),
      description: $("#description-input").val().trim(),
      PlaceId: placeId,
      UserId: userId
    };
    console.log(reviewData);

    //ajax call to save review
    $.ajax({
      method: "POST",
      url: "/api/reviews",
      data: reviewData
    }).then(res => {
      console.log(res);
      $("#review-modal").modal("hide");
    }).catch(err => {
      console.log(err);
    });
  });
});