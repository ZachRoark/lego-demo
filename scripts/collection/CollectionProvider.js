// let userBlocks = []
import { getUser } from './../auth/AuthProvider.js'

const eventHub = document.querySelector("main")

const dispatchUserBricksChanged = () => {
  const newEvent = new CustomEvent("userBricksStateChanged")
  eventHub.dispatchEvent(newEvent)
}

export const loadUsersBricks = (userId) => {
  return fetch(`http://localhost:8088/userBricks?userId=${userId}`)
    .then(response => response.json())
}

export const getSingleBrick = (id) => {
  return fetch(`http://localhost:8088/userBricks?userId=${getUser().id}&brickId=${id}`)
    .then(response => response.json())
}



export const addUserBrick = (brickObj) => {
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

export const editQuantity = (brickObj, userBrickId) => {
  return fetch(`http://localhost:8088/userBricks/${userBrickId}`, {
    method: "PUT",
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