// let userBlocks = []
import {getUser} from './../auth/AuthProvider.js'

const eventHub = document.querySelector("main")

const dispatchUserBricksChanged = () => {
  const newEvent = new CustomEvent("userBricksStateChanged")
  eventHub.dispatchEvent(newEvent)
}

export const loadUsersBricks = (userId) => {
  console.log("load user bricks now", userId);
  return fetch(`http://localhost:8088/userBricks?userId=${userId}`)
    .then(response => response.json())
}



export const addUserBrick = (brickObj) => {
  console.log("brk", brickObj)
  return fetch(`http://localhost:8088/userBricks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(brickObj)
  })
    .then(() => {
      loadUsersBricks(getUser().id)
    })
    .then(dispatchUserBricksChanged)
}