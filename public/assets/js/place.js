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
  const showPlaceReviews = (review) => {

    //for each review get user infos
    console.log("review info");
    console.log(review);


    //build a row for each review
    const rowCard = $("<div class='row my-2'>");
    const colCard = $("<div class='col-12'>");
    //build the card and its components
    const card = $("<div class= 'card'>");
    const cardHeader = $("<div class='card-header'>");

    const $firstRow = $("<div class='row'>");
    const $colAuthor = $("<div class='col-10'>");

    const $colAuthorText = $("<h3>").text(`User id: ${review.UserId} - ${review.createdAt} - ${review.upvotes} - ${review.downvotes}`).appendTo($colAuthor);
    // col-2 for the comments 
    const $colComment = $("<div class='col-2'>");
    const nComments = review.Comments.length;
    const $colCommentText = $(`<button class='comments btn btn-primary' data-review='${review.id}' data-user='${userId}' data-toggle='modal' data-target='#comment-modal'>`)
      .text("Comments: ").appendTo($colComment);
    const $colCommentNumber = $("<span class='badge badge-light' id='num-comments'>")
      .text(`${nComments}`).appendTo($colCommentText);
    $firstRow.append($colAuthor, $colComment);

    cardHeader.append($firstRow);

    const cardBody = $("<div class='card-body'>");
    const cardTitle = $("<h5 class='card-title'>").text(review.title).appendTo(cardBody);
    const cardText = $("<p class='card-text'>").text(review.description).appendTo(cardBody);
    //--------------//
    //let build the content of the comment section if reviews.comments exist

    const $listGroup = $("<div class='list-group table-striped w-75 mx-auto '>");

    if (review.Comments.length > 0) {
      //create new div at the bottom to display the comments
      const $divCommentContent = $("<div class='border border-dark'>");

      //build a list item for each comment
      review.Comments.forEach(comment => {
        //build the 
        const $rowComment = $("<div class='list-group-item list-group-item-action flex-column align-items-start my-2'>");
        const $rowInfos = $("<div class='row d-flex w-100 justify-content-start text-muted mb-2'>");
        const $colUsername = $("<div class='col-3' style='font-weight: bold'>").text(`Posted by: ${comment.UserId}`).appendTo($rowInfos);
        const $colCreatedAt = $("<div class='col-9' style='font-weight: bold'>").text(`On: ${moment(comment.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}`).appendTo($rowInfos);
        const $rowBody = $("<div class='row d-flex w-100 justify-content-between text-muted border-0'>");
        const $ptext = $("<div class='col-12'>").text(comment.description).appendTo($rowBody);

        //
        $rowComment.append($rowInfos, $rowBody)
        //
        $rowComment.appendTo($listGroup);
      });

      //then append to 
      $listGroup.appendTo($divCommentContent);
    }
    //append firstRow, linkRow, bodyRow all together to divCollape
    // $cardBody.append($firstRow, $linkRow, $lineBreak, $bodyRow, $lineBreak, $listGroup).appendTo($divCollapse);
    //--------------//
    //append the card header and body
    card.append(cardHeader, cardBody, $listGroup);
    //append the card to the col-12 and append it to the row
    colCard.append(card).appendTo(rowCard);
    //append the row to the jumbotroon
    $("#reviews").append(rowCard);

  };
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

      //display the review for each review
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
      location.reload();
    }).catch(err => {
      console.log(err);
    });
  });

  $(document).on("click", ".comments", function () {
    //get the values back from the data ()
    const reviewId = $(this).attr("data-review");
    //const UserId = $(this).attr("data-user");
    console.log(reviewId);

    //then on click on save comment
    $("#save-comment").on("click", (event) => {
      //avoid reload page
      event.preventDefault();

      const commentcontent = $("#comment-input").val().trim();
      //check if inputs are valid 
      if (commentcontent === "") {
        alert("Please enter a name and a valid comment!");
        return false;
      }
      //then build an object Comment
      const newComment = {
        ReviewId: reviewId,
        UserId: userId,
        description: commentcontent
      };
      console.log(newComment);
      //ajax call to create the comment with the reviewId as params
      $.ajax({
        url: "/api/comments/",
        method: "POST",
        data: newComment
      }).then(result => {
        //console.log(result);

        //empty the inputs fieds and get rid of the modal
        $("#username-input").val("");
        $("#comment-input").val("");

        location.reload();
      });
    });
  });
});