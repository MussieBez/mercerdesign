$(document).ready(function () {
  const cardsDiv1 = $("#cardsDiv1");
  const submitBtn = $("#submitBtn");

  if (isAuthenticated()) {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    const addToCart = (e) => {
      let savedProduct = e.target;
      if (e.target.matches(".addToCart")) {
        addItem(savedProduct.id, () => {
          console.log(savedProduct.id);
        });
      }
    };

    $(document).on("click", addToCart);

    const getFavoritesOnPage = (userId, token) => {
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
          data.map((item, index) =>
            cardsDiv1.append(
              $("<div>")
                .attr("class", "col-md-3 mx-auto mb-3")
                .append(
                  $("<div>")
                    .attr("class", "card text-center h-100")
                    .attr("id", `${item.id}+1`)
                    .attr("style", "width: 18rem;")
                    .append(
                      $("<img>")
                        .attr("src", "../img/supream-1-600x600@1x.png")
                        .attr("alt", "...")
                        .attr("style", "width: 10rem; height: 10rem;")
                        .attr("class", "card-img-top"),
                      $("<div>")
                        .attr("class", "card-body")
                        .append(
                          $("<p>")
                            .attr("class", "card-title")
                            .text(`Name: ${item.name}`),
                          $("<p>")
                            .attr("class", "card-text")
                            .text(`Price: ${item.price}$`),
                          $("<button>")
                            .attr("id", `${item._id}`)
                            .attr(
                              "class",
                              "btn btn-outline-success btn-block addToCart"
                            )
                            .text("Add to the Cart"),
                          $("<button>")
                            .attr("id", `${item._id}`)
                            .attr(
                              "class",
                              "btn btn-outline-danger btn-block removeFromFavorites"
                            )
                            .text("Remove from Favorites")
                        )
                    )
                )
            )
          );
        }
      });
    };

    getFavoritesOnPage(userId, token);

    const removeFavorite = (e) => {
      let product = e.target;
      if (e.target.matches(".removeFromFavorites")) {
        console.log(product.id);
        deleteFromFavorites(product.id, userId, token).then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
          }
        });
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    };

    $(document).on("click", removeFavorite);
  } else {
    cardsDiv1.append(
      $("<h1>")
        .attr("class", "text-bold mx-auto")
        .attr("style", "margin-top: 20%; text-decoration: underline; color: red")
        .text("You need to be logged in to view favorites")
    );
  }
});
