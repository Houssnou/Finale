$(document).ready(function () {
  // global variables

  // ajax call to verify user session
  $.ajax({
    url: "api/users/status",
    method: "GET"
  }).then(userConnected => {
    var userId = userConnected.id;
    console.log(`connect user id`);
    console.log(userConnected);

    $.ajax({
      url: "/api/reviews/user/" + userId,
      method: "GET"
    }).then(userReviews => {
      console.log(`list of reviews`);
      console.log(userReviews);

      // get page information(description, #of reviews, and review merit score) of user page session
      $(".userPagePic")
        .attr("src", userConnected.photo)
        .attr("alt", "profile page pic");

      $("#profilePageDesc").append(userConnected.description);
      $("#numberOfReviews").append(userReviews.length);
      


      //dynamically make a card list
      // for each review, dymanically make a card per review
      userReviews.forEach(review => {
        console.log(review.Place.name);
        const $userReviewsListDiv = $("#userReviewsList");
        const reviewsCard = $("<div class='card'>");
        const reviewsCardHeader = $("<div class='row card-header'>");
        const reviewsHeaderCol1 = $("<div class='col d-flex justify-content-start'>");
        const reviewsLocation = $("<h5>").text(review.Place.name);
        const reviewsHeaderCol2 = $("<div class='col d-flex justify-content-end'>");
        const reviewsDate = $("<h5>").text(review.createdAt);

        const reviewsCardBody = $("<div class='card-body'>");
        const cardBodyRow = $("<div class='row'>");
        const cardBodyCol1 = $("<div class='col d-flex justify-content-start'>");
        const cardBodyTitle = $("<h5 class='card-title'>").text(review.title);
        const cardBodyCol2 = $("<div class='col d-flex justify-content-end'>");
        const cardVoteScore = $("<div>").text("Upvotes: 1 | Downvotes: 0");
        const reviewsDescription = $("<p class='card-text'>").text(review.description);

        // append everything to reviewslist
        reviewsLocation.appendTo(reviewsHeaderCol1);
        reviewsDate.appendTo(reviewsHeaderCol2);

        reviewsCardHeader
          .append(reviewsHeaderCol1)
          .append(reviewsHeaderCol2);

        cardBodyTitle.appendTo(cardBodyCol1);
        cardVoteScore.appendTo(cardBodyCol2);

        cardBodyRow
          .append(cardBodyCol1)
          .append(cardBodyCol2);

        reviewsCardBody
          .append(cardBodyRow)
          .append(reviewsDescription);

        //this is the card header with all the info. now to work on card body then append body to reviewsCard
        reviewsCard
          .append(reviewsCardHeader).appendTo($userReviewsListDiv)
          .append(reviewsCardBody);
      }); // End of for each loop to create cards display reviews card

    
    }); //end of reviews AJAX call

    // make ajax call to get all user comments when getAllUserComments routes/controller is set up



  }); //end of ajax call that checks for status/user session


}); //end of docuement.ready function