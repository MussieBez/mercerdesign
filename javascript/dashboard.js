$(document).ready(function () {
  const logOut = $("#logout");
  const profileDiv = $("#profileDiv");
  const favoritesDiv = $("#favoritesDiv");
  const orderhistoryDiv = $("#orderhistoryDiv");
  const usergalleryDiv = $("#usergalleryDiv");

//   console.log(isAuthenticated());

  if (isAuthenticated()) {
    let userName = isAuthenticated().user.name;
    let userEmail = isAuthenticated().user.email;
    let userNameTag = $("<h3>")
      .attr("class", "text-bold")
      .text(`User Name: ${userName}`);
    let userEmailTag = $("<h3>")
      .attr("class", "text-bold")
      .text(`User Email: ${userEmail}`);
    let title = $("<h1>").attr("class", "text-center").text("User Info");
    profileDiv.append(title, userNameTag, userEmailTag);

    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    // console.log(userId, token)
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else if (data.length < 1) {
        orderhistoryDiv.append(
          $("<h3>")
            .attr("class", "order-history-VMr6Om1 text-black")
            .text("You don't have order history yet!")
        );
      } else {
        console.log(data);
      }
    });

    getFavorites(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else if (data.length < 1) {
        //   console.log(data)
        favoritesDiv.append(
          $("<h3>")
            .attr("class", "favorites-VMr6Om1 text-black")
            .text("You don't have favorites yet!")
        );
      } else {
        console.log(data);
        data.map((item, index) => (
            favoritesDiv.append(
                $("<p>")
                  .attr("class", "text-bold ")
                  .attr("style", "font-size: 22px")
                  .text(`Name: ${item.name}`), $("<p>")
                  .attr("class", "text-bold")
                  .attr("style", "font-size: 22px")
                  .text(`Price: ${item.price}$`), $("<hr/>")
        )))
      }
    });
  } else {
    profileDiv.append(
      $("<div>").attr("class", "profile-VMr6Om1 text-left").text("Profile")
    );
    favoritesDiv.append(
      $("<div>").attr("class", "favorites-VMr6Om text-left").text("Favorites")
    );
    orderhistoryDiv.append(
      $("<div>").attr("class", "order-history-VMr6Om").text("Order History")
    );
    usergalleryDiv.append(
      $("<div>")
        .attr("class", "userphoto-gallery-C61RwL text-left")
        .text("User Gallery")
    );
  }

  logOut.on("click", function (e) {
    e.preventDefault();
    signout(() => {
      console.log("Success!!!!");
      window.location.replace("home.html");
    });
  });
});
