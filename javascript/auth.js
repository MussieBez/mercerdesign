const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  function signUpUser(userData) {
    // console.log(userData)
    return fetch(`http://localhost:8080/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const signout = (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();
      return fetch(`http://localhost:8080/api/signout`, {
        method: "GET",
      })
        .then((response) => {
          console.log("signout", response);
        })
        .catch((err) => console.log(err));
    }
  };

  const loginUser = (userData) => {
    console.log(userData)
    return fetch(`http://localhost:8080/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };