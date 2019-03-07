$(document).ready(function () {
  //event listener for a click on cancel login
  $("#cancel-login").on("click", () => {
    //clear input fields
    $("#email-input").val("");
    $("#password-input").val("");
  });
  //event listener for a click on cancel registration
  $("#cancel-registration").on("click", () => {
    //clear input fields
    $("#username-input").val("");
    $("#email-input").val("");
    $("#password-input").val("");
    $("#cpassword-input").val("");
  });

  //event listener for a click on submit registration
  $("#register").on("click", event => {
    //prevent page to reload
    event.preventDefault();

    //build an object user
    const userData = {
      userName: $("#username-input").val().trim(),
      email: $("#email-input").val().trim(),
      password: $("#password-input").val().trim()
    };

    console.log(userData);

    //ajax call to create the user
    $.ajax({
      url: "/api/users",
      method: "POST",
      data: userData
    })
      .then((userCreated) => {
        // console.log(userCreated);
        location.replace(userCreated);
      }).catch(err => {
        console.log(err);
      });
  });

  //event listener for a click on submit registration
  $("#login").on("click", event => {
    //prevent page to reload
    event.preventDefault();

    //build userlogin
    const user = {
      email: $("#login-email-input").val().trim(),
      password: $("#login-password-input").val().trim()
    };

    console.log(user);

    $.ajax({
      url: "/api/users/login",
      method: "POST",
      data: user
    }).then(userconnected => {
      console.log(userconnected);
      location.replace(userconnected);
    }).catch(err => {
      console.log(err);
    })

  });
});