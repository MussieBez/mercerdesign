$(document).ready(function () {
  const btnSubmit = $("#btnSubmit");
  const inputName = $("#inputName");
  const inputEmail = $("#inputEmail");
  const inputPassword = $("#inputPassword");
  const messageDiv = $("#message");

  btnSubmit.on("click", function (event) {
    event.preventDefault();
    const userData = {
      name: inputName.val().trim(),
      email: inputEmail.val().trim(),
      password: inputPassword.val().trim(),
    };
    if (!userData.email || !userData.password || !userData.name) {
      messageDiv.append($("<div>").attr("class", "alert alert-warning").text("All fields are required! Please try again!"));
      return;
    }
    console.log(userData);

    signUpUser(userData)
    .then((data) => {
        if(data.error) {
          console.log(data.error)
        } else{
          console.log(data)
          messageDiv.append($("<div>").attr("class", "alert alert-info").text("New account was created. Please Log In"));
        }
      });
    inputName.val("");
    inputEmail.val("");
    inputPassword.val("");
  });


  
});
