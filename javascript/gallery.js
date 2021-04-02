$(document).ready(function () {
  const cardsDiv1 = $("#cardsDiv1");
  const userNameDiv = $("#userName");
  const userEmailDiv = $("#userEmail");
  const userRoleDiv = $("#userRole");
  const messageDiv = $("#message");
  const photoDiv = $("#photoDiv");

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

    const getGalleryOnPage = (userId, token) => {
      getGallery(userId, token).then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else if (data.length < 1) {
          //   console.log(data)
          photoDiv.append(
            $("<h3>")
              .attr("class", "favorites-VMr6Om1 text-black")
              .text("You don't have favorites yet!")
          );
        } else {
          data.map((item, index) =>
            photoDiv.append(
              $("<div>")
                .attr("class", "col-md-3 mx-auto mb-3")
                .append(
                  $("<div>")
                    .attr("class", "card text-center h-100")
                    .attr("id", `${item._id}+1`)
                    .attr("style", "width: 18rem;")
                    .append(
                      $("<img>")
                        .attr("src", `${item.photo.data}`)
                        .attr("alt", "...")
                        .attr("style", "max-width: 100%; max-height: 100%;")
                        .attr("class", "card-img-top"),
                      $("<div>")
                        .attr("class", "card-body")
                        .append(
                          $("<p>")
                            .attr("class", "card-title")
                            .text(`${item.description}`),
                          $("<button>")
                            .attr("id", `${item._id}`)
                            .attr(
                              "class",
                              "btn btn-outline-danger btn-block removeFromFavorites"
                            )
                            .text("Remove from Gallery")
                        )
                    )
                )
            )
          );
        }
      });
    };

    getGalleryOnPage(userId, token);
  } else {
    cardsDiv1.append(
      $("<h1>")
        .attr("class", "text-bold mx-auto mt-5")
        .attr("style", "color: red")
        .text("You need to be logged in to view information on profile page")
    );
  }
});
