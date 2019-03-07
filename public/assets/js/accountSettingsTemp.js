$(document).ready(function () {
  console.log(`accountSettingsTemp.js is loaded`);
   $.ajax({
    url: "api/users/status",
    method: "GET"
  }).then(function(userConnected) {
    console.log(`user connected info here.`);
    console.log(userConnected);
    if (userConnected) {
      var userUpdatId = userConnected.id;
    };
    
    console.log("here");

   console.log(userUpdatId);
 

  $("#saveAccountBtn").on("click", function() {
    event.preventDefault();
    
    const bioUpdate = {
      description: $("#accountBio").val().trim()
    }

    console.log(bioUpdate);

 /*    $.ajax({
      url: "/api/users/", //add a method to direct to the user that's being updated
      method: "PUT",
      data: bioUpdate
    }).then(updatedResult => {
      console.log("added new bio to your page.")
    }) */

    $("#accountBio").val("");
    //on submit make ajax call to insert/post description of bio
  });
});
});