$(document).ready(function () {
  const cardsDiv1 = $("#cardsDiv1");
  const userNameDiv = $("#userName");
  const userEmailDiv = $("#userEmail");
  const userRoleDiv = $("#userRole");
  const btnSubmit = $("#btnSubmit");
  const inputName = $("#inputName");
  const inputEmail = $("#inputEmail");
  const inputPassword = $("#inputPassword");
  const messageDiv = $("#message");

  if (isAuthenticated()) {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    let userName = isAuthenticated().user.name;
    let userEmail = isAuthenticated().user.email;
    let userRole = isAuthenticated().user.role;

    let userNameTag = $("<h5>")
      .attr("class", "text-bold")
      .text(`User Name: ${userName}`)
      .appendTo(userNameDiv);
    let userEmailTag = $("<h5>")
      .attr("class", "text-bold")
      .text(`User Email: ${userEmail}`)
      .appendTo(userEmailDiv);
    if (userRole === 1) {
      let userRoleTag = $("<h5>")
        .attr("class", "text-bold")
        .text(`User Role: admin`)
        .appendTo(userRoleDiv);
    } else {
      let userRoleTag = $("<h5>")
        .attr("class", "text-bold")
        .text(`User Role: registered user`)
        .appendTo(userRoleDiv);
    }

    btnSubmit.on("click", (event) => {
      event.preventDefault();

      const userData = {
        name: inputName.val().trim(),
        email: inputEmail.val().trim(),
        password: inputPassword.val().trim(),
      };

      update(userId, token, userData).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            messageDiv.append(
              $("<div>")
                .attr("class", "alert alert-info")
                .text("User info was updated!")
            );
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
        }
      });
    });
  } else {
    cardsDiv1.append(
      $("<h1>")
        .attr("class", "text-bold mx-auto mt-5")
        .attr("style", "color: red")
        .text("You need to be logged in to view information on profile page")
    );
  }
});
