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
  const showPlaceReviews = (review, index) => {
    //build the card
    const $card = $("<card>");
    //the header
    const $cardheader = $(`<div class='card-header' id='heading${index + 1}'>`);
    //div row to wrap the line : title dates comments
    //inside the header we will have a row with 3colums 2-8-2
    const $row = $("<div class='row'>");
    const $Title = $("<div class='col-12 d-flex align-content-start'>");

    //button to make the title clikable
    const $buttonTitle = $(
      `<button class='btn btn-link' type='button' 
              data-toggle='collapse' data-target='#review${index + 1}'
              aria-expanded='false' aria-controls='review${index + 1}'
              style='color: black; font-weight: bold; text-decoration: none'>`
    ).text(review.title).appendTo($Title);


    //append the title to the row and append this row to the cardHeader
    $row.append($Title).appendTo($cardheader);

    const $divCollapse = $(
      `<div id='review${index + 1}' aria-labelledby='heading${index + 1}' data-parent='#accordion'>`);

    //quick check to determine if it should be a class collapse show or not        
    (index === 0) ? $divCollapse.addClass("collapse show") : $divCollapse.addClass("collapse");

    const $cardBody = $("<div class='card-body'>");
    //row => col-10 for the author and date
    const $firstRow = $("<div class='row'>");
    const $colAuthor = $("<div class='col-10'>");
    const $colAuthorText = $("<h4>").text(`Reviewed by: ${review.UserId} 
On: ${moment(review.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}`).appendTo($colAuthor);

    const $colComment = $("<div class='col-2'>");
    const $colCommentText = $(`<button class='comments btn btn-primary' data-review='${review.id}' data-toggle='modal' data-target='#comment-modal'>`)
      .text("Comments: ").appendTo($colComment);
    const $colCommentNumber = $("<span class='badge badge-light' id='num-comments'>")
      .text(`${review.Comments.length}`).appendTo($colCommentText);

    $firstRow.append($colAuthor, $colComment);


    // row =>=> col-12 => span  for the description 
    const $bodyRow = $("<div class='row'>");

    const $colDesc = $("<div class='col-12'>");
    const $colDescText = $("<span class='border-0'>");
    $colDescText.text(review.description)
      .appendTo($colDesc);

    $bodyRow.append($colDesc);
    const hr = $("<hr>");

    //let build the content of the comment section if reviews.comments exist
    if (review.Comments.length > 0) {
      //create new div at the bottom to display the comments
      const $divCommentContent = $("<div class='border border-dark'>");

      const $listGroup = $("<div class='list-group table-striped w-75 mx-auto'>");
      //build a list item for each comment
      review.Comments.forEach(comment => {
        //build the 
        const $rowComment = $("<div class='list-group-item list-group-item-action flex-column align-items-start my-2'>");
        const $rowInfos = $("<div class='row d-flex w-100 justify-content-start text-muted'>");
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
      //append firstRow, linkRow, bodyRow all together to divCollape
      $cardBody.append($firstRow, hr, $bodyRow, hr, $listGroup).appendTo($divCollapse);

    } else {
      //then display the reviews infos w/o building the comment section
      //append firstRow, linkRow, bodyRow all together to divCollape
      $cardBody.append($firstRow, hr, $bodyRow).appendTo($divCollapse);
    };
    //build the card content
    $card.append($cardheader, $divCollapse).appendTo("#accordion");

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
      res.Reviews.forEach((review, index) => showPlaceReviews(review,index));
      //get the value of placeID
      placeId = (res.id);
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
          //console.log(result);
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
    console.log(`below is user connected`)
    console.log(userConnected);
    if (userConnected) {
      //get the value of userId 
      userId = userConnected.id;
      //enable button to let user reviews, comments and photo
      $("#add-review").prop("disabled", false);
      $("#add-photo").prop("disabled", false);

      //disabled button login 
      $("#login").css("display", "none");
      $("#profileDropdown").removeClass("invisible");
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