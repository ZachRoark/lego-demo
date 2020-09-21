let authUser = {};

export const getUser = () => {
  authUser = JSON.parse(sessionStorage.getItem("credentials"))
  return authUser
}

export const checkUser = (userObj) => {
  //should probably check username and email match
  return fetch(`http://localhost:8088/users?userName=${userObj.userName}`)
    .then(response => response.json())
    .then(parsedResponse => {
      authUser = parsedResponse;
      return authUser;
    })
}

export const addUser = (userObj) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
    .then(response => response.json())
    .then(parsedResponse => {
      authUser = parsedResponse;
      return authUser;
    })
}