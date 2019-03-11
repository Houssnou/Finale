$(document).ready(function () {
var userId;

  $.ajax({
    url: "api/users/status",
    method: "GET"
  }).then(function (userConnected) {
  
      var userUpdatedId = userConnected.id;
      
    $("#saveAccountBtn").on("click", function (event) {
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
      location.reload();
      /* $("#accountBio").val("");

      $("#bioInfo").empty();
      $("#bioInfo").append(bioUpdate.description); */
    });

    // while we have the user id, make a GET method to show bio in a neat area. once i rework the bio area again....
    $.ajax({
      url: "/api/users/" + userUpdatedId,
      method: "GET"
    }).then(userInfo => {
      console.log(`this is the user info`)
      console.log(userInfo);
      
      $("#username").append(userInfo.userName);
      $("#userEmail").append(userInfo.email);
      $("#bioInfo").append(userInfo.description);
      $("#user-avatar")
        .attr("src", userInfo.photo)
        .attr("alt", "user avatar")
      $("#profilePlaceHolder")
        .attr("src", userInfo.photo)
        .attr("alt", "profile pic");
    })




    //make button for upload pic functional

    //event listener for picture upload
    $("#profile-input-upload").on("change", function() {
      const imagePath = $(this)[0].value;
      const imgExtn = imagePath.substring(imagePath.lastIndexOf('.') + 1).toLowerCase();

      if (imgExtn === "gif" || imgExtn === "png" || imgExtn === "jpg" || imgExtn === "jpeg") {
        if (typeof (FileReader) != "undefined") {
          var imageHolder = $(".profilePicDivContainer");
          imageHolder.empty();

          var reader = new FileReader();
          reader.onload = function(event) {
            $("<img />", {
              "src": event.target.result,
              "class": "thumb-image profilePicture",
            }).appendTo(imageHolder);
            $("#profilePlaceHolder").empty(); //empty the imageplaceholder when pic is added
            // will probably have to add a line of code to empty #profilePicDivContainer too later. REMEMBER THIS
          }

          reader.readAsDataURL($(this)[0].files[0]);
        } else {
          alert("browser does not accept FileReader");
          return false;
        }
      } else {
        alert("please use a proper image format.");
        return false;
      }
    });

    // button event listen to save profile picture
    $("#uploadProfilePic").on("click", function() {
    
      
      const form = new FormData();
      const imageData = document.getElementById("profile-input-upload").files[0];
      if (imageData === undefined) {
        alert("it appears you don't have a new photo to upload");
        return false;
      } else {
        console.log(`false`);
      }
      console.log(imageData);
      form.append("photo", imageData, imageData.name);
      console.log(`form:`)
      console.log(form);
      // ajax call up upload photo
      $.ajax({
        url: "api/users/" + userUpdatedId,
        method: "PUT",
        data: form,
        cache: false,
        contentType: false,
        processData: false
      }).then(data => {
        console.log(data);
        location.reload();

      })
    }); //end uploadProfilePic
  
    

  }); //end if ajax call







});
