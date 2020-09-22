import { checkUser, getUser, addUser } from "./AuthProvider.js";

const contentTarget = document.querySelector("#container");
const eventHub = document.querySelector("main");

eventHub.addEventListener("click", event => {
  if (event.target.id === "btn-login") {
    let creds = {
      username: document.querySelector("#username").value,
      email: document.querySelector("#email").value
    }
    //check db for user
    checkUser(creds)
      .then(checkedResponse => {
        if (checkedResponse) {
          sessionStorage.setItem("credentials", JSON.stringify(checkedResponse))
          //Invoke function with custom event to show view
          dispatchAuthEvent()
        } else {
          addUser(creds)
            .then((addUserResponse) => {
              sessionStorage.setItem("credentials", JSON.stringify(addUserResponse))
              //Invoke function with custom event to show view
              dispatchAuthEvent()
            })
        }
      })
  }
})

const dispatchAuthEvent = () => {
  //yell out to everyone that a logged in
  const customEvent = new CustomEvent("userIsAuthed")
  eventHub.dispatchEvent(customEvent)
}

const render = () => {
  contentTarget.innerHTML = `
        <h3>Login</h3>
        <input id="username" />
        <input id="email" />
        <button type="button" id="btn-login">Login</button>
  `
}

export const login = () => {
  render()
}
