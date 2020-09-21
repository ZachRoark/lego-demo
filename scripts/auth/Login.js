import { checkUser, getUser, addUser } from "./AuthProvider.js";

const contentTarget = document.querySelector("#container");
const eventHub = document.querySelector("main");

eventHub.addEventListener("click", event => {
  if (event.target.id === "btn-login") {
    let creds = {
      userName: document.querySelector("#userName").value,
      email: document.querySelector("#email").value
    }
    //check db for user
    checkUser(creds)
      .then(checkedResponse => {
        console.log("checkedResponse", checkedResponse)
        if (checkedResponse.length > 0) {
          sessionStorage.setItem("credentials", JSON.stringify(checkedResponse[0]))
          //custom event to show view
          dispatchAuthEvent()
        } else {
          addUser(creds)
            .then((addUserResponse) => {
              sessionStorage.setItem("credentials", JSON.stringify(addUserResponse))
              //custom event to show view
              dispatchAuthEvent()
            })
        }
      })
  }
})

const dispatchAuthEvent = () => {
  console.log("dispatchAuthEvent")
  const customEvent = new CustomEvent("userIsAuthed")
  eventHub.dispatchEvent(customEvent)
}

const render = () => {
  contentTarget.innerHTML = `
        <h3>Login</h3>
        <input id="userName" />
        <input id="email" />
        <button type="button" id="btn-login">Login</button>
  `
}

export const login = () => {
  console.log("need to login")
  render()
}

//parseJSON() to get it back