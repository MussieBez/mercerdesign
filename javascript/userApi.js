const getPurchaseHistory = (userId, token) => {
    return fetch(`http://localhost:8080/api/orders/by/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const read = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const update = (userId, token, user) => {
    return fetch(`http://localhost:8080/api/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("jwt")) {
        let auth = JSON.parse(localStorage.getItem("jwt"));
        auth.user = user;
        localStorage.setItem("jwt", JSON.stringify(auth));
        next();
      }
    }
  };

  const getFavorites = (userId, token) => {
    return fetch(`http://localhost:8080/api/favorite/list/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  const getGallery = (userId, token) => {
    return fetch(`http://localhost:8080/api/gallery/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  
  const deleteFromFavorites = (productId, userId, token) => {
    return fetch(`http://localhost:8080/api/favorite/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };