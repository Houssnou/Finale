$(document).ready(function () {
  // global variables

  // ajax call to verify user session
  $.ajax({
    url: "api/users/status",
    method: "GET"
  }).then(userConnected => {
    var userId = userConnected.id;
    if (userConnected) {

      //disabled button login 
      $("#login").css("display", "none");
      $("#profileDropdown").removeClass("invisible");
    }

    $.ajax({
      url: "/api/users/" + userId,
      method: "GET"
    }).then(userInfo => {
      
      $("#user-avatar")
        .attr("src", userInfo.photo)
        .attr("alt", "user avatar")
      $(".userPagePic")
        .attr("src", userConnected.photo)
        .attr("alt", "profile page pic");
    });

    $.ajax({
      url: "/api/reviews/user/" + userId,
      method: "GET"
    }).then(userReviews => {
      console.log(`list of reviews`);
      console.log(userReviews);

      // get page information(description, #of reviews, and review merit score) of user page session
      $("#userPageGreeting").text(`Welcome ${userConnected.userName},`);
      $("#userPageJumbotronText").text("This is where you can see your review and comment history of the places you've visited. You can even see you own user stats here!");

      $("#profilePageDesc").append(userConnected.description);
      $("#numberOfReviews").append(userReviews.length);



      //dynamically make a card list
      // for each review, dymanically make a card per review
      userReviews.forEach(review => {
        console.log(review.Place.name);
        const $userReviewsListDiv = $("#userReviewsList");
        const reviewsCard = $("<div class='card'>");
        const reviewsCardHeaderContainer = $("<div class='container-fluid'>");
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

        reviewsCardHeaderContainer.append(reviewsCardHeader);
        // appending body parts together
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
          .append(reviewsCardHeaderContainer).appendTo($userReviewsListDiv)
          .append(reviewsCardBody);
      }); // End of for each loop to create cards display reviews card


    }); //end of reviews AJAX call

    // now make ajax call to get user comments
    $.ajax({
      url: "/api/comments/user/" + userId,
      method: "GET"
    }).then(userComments => {
      console.log(`these  r ur comments api list`);
      console.log(userComments);

      // now make another forEach loop boi
      userComments.forEach(comment => {
        // here comes a call of variables
        const $userCommentsListDiv = $("#userCommentsList");
        const userCommentsCard = $("<div class='card'>");
        const commentsHeaderContainer = $("<div class='container-fluid'>");
        const userCommentsHeader = $("<div class='row card-header'>");
        const commentHeaderCol1 = $("<div class='col d-flex justify-content-start'>");
        const commentFromReview = $("<h5 class='card-title'>").text(`Commented from: ${comment.Review.title}`);
        const commentHeaderCol2 = $("<div class='col d-flex justify-content-end'>");
        const commentDate = $("<h5>").text(comment.createdAt);

        const commentCardBody = $("<div class='card-body'>");
        const commentBodyRow = $("<div class='row'>");
        const commentBodyCol1 = $("<div class='col d-flex justify-content-start'>");
        const commentBodyCol2 = $("<div class='col d-flex justify-content-end'>");
        const cardVoteScore = $("<div>").text("Upvotes: 1 | Downvotes: 0");
        const commentDescription = $("<p class='card-text'>").text(comment.description);


        commentFromReview.appendTo(commentHeaderCol1);
        commentDate.appendTo(commentHeaderCol2);

        userCommentsHeader
          .append(commentHeaderCol1)
          .append(commentHeaderCol2);

        commentsHeaderContainer.append(userCommentsHeader);
        // append card body parts together and then attach it all to the div
        cardVoteScore.appendTo(commentBodyCol2);

        commentBodyRow
          .append(commentBodyCol1)
          .append(commentBodyCol2);

        commentCardBody
          .append(commentBodyRow)
          .append(commentDescription);

        // append to comment card and then to div!
        userCommentsCard
          .append(commentsHeaderContainer).appendTo($userCommentsListDiv)
          .append(commentCardBody);
      });


    });


  }); //end of ajax call that checks for status/user session


}); //end of docuement.ready function