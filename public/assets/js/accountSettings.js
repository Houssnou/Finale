$(document).ready(function () {


  $.ajax({
    url: "api/users/status",
    method: "GET"
  }).then(function (userConnected) {
    console.log(`user connected info here.`);
    console.log(userConnected);
    if (userConnected) {
      var userUpdatedId = userConnected.id;
      // if user connected then show profile stuff else show login button
      
    } 

    console.log("here");

    console.log(userUpdatedId);


    $("#saveAccountBtn").on("click", function () {
      event.preventDefault();

      const bioUpdate = {
        description: $("#accountBio").val().trim()
      }

      console.log(bioUpdate);

      $.ajax({
        url: "/api/users/" + userUpdatedId, //add a method to direct to the user that's being updated
        method: "PUT",
        data: bioUpdate
      }).then(updatedResult => {
        console.log(updatedResult);
        
      })

      $("#accountBio").val("");

      $("#bioInfo").empty();
      $("#bioInfo").append(bioUpdate.description);
    });

    // while we have the user id, make a GET method to show bio in a neat area. once i rework the bio area again....
    $.ajax({
      url: "/api/users/" + userUpdatedId,
      method: "GET"
    }).then(userInfo => {
      console.log(`userinfo is below. also ur dumb for taking this long to realize u missed a '/' in url causing 404 errors. hope this is a learning experience for u`);
      console.log(userInfo);
      console.log(userInfo.description);
      $("#username").append(userInfo.userName);
      $("#userEmail").append(userInfo.email);
      $("#bioInfo").append(userInfo.description);
    })




    //make button for upload pic functional
    



  }); //end if ajax call







});
