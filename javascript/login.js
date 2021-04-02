$(document).ready(function () {
  const btnSubmit = $("#btnSubmit");
  const emailInput = $("#emailInput");
  const passwordInput = $("#passwordInput");
  const messageDiv = $("#message");

  btnSubmit.on("click", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);

    loginUser(userData).then((data) => {
      if (data.error) {
        console.log(data.error);
        messageDiv.append(
          $("<div>")
            .attr("class", "alert alert-danger")
            .text(`${data.error}! Please try again!`)
        );
      } else {
        authenticate(data, () => {
          console.log(data);
          window.location.replace("dashboard.html");
        });
      }
    });
    emailInput.val("");
    passwordInput.val("");
  });
});
