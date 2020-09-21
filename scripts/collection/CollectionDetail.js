import { invertColor } from './../legos/helpers.js'
import { getUser } from '../auth/AuthProvider.js';
import { getSingleBrick, editQuantity } from './CollectionProvider.js';

const eventHub = document.querySelector("main");
eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("btn-addNote--")) {
    const [prefix, id] = event.target.id.split("--")

  } else if (event.target.id.startsWith("btn-editQuantity--")) {
    const [prefix, id] = event.target.id.split("--");
    console.log("id of userBrick", id)
    //get brick quantity
    const brick = getSingleBrick(parseInt(id))
      .then((response) => {
        console.log("res", response, id)
        document.querySelector(`#quantity--${id}`).innerHTML = `
          <input type="hidden" value="${id}" id="editQuanity--id">
          <input type="hidden" value="${response.brickId}" id="edit--APIBrick">
          <input id="input-quantity--${id}" value="${response.quantity}"/>
          <button id="saveQuantity--${id}">Save</button>
        `
      })
  } else if (event.target.id.startsWith("saveQuantity--")) {
    const [prefix, id] = event.target.id.split("--");
    // collect the details of brick
    //id: 1, brickId: 1, quantity: 6, userId: 1
    const updatedBrick = {
      brickId: parseInt(document.querySelector(`#edit--APIBrick`).value),
      userId: getUser().id,
      quantity: parseInt(document.querySelector(`#input-quantity--${id}`).value)
    }
    const userBricksId = parseInt(document.querySelector("#editQuanity--id").value)
    console.log("userBricks", updatedBrick, userBricksId,)
    editQuantity(updatedBrick, userBricksId)
  }
})




export const CollectionDetail = (brick) => {
  console.log("what brick", brick)
  let block = `<section class="block-wrapper" style="background-color:#${brick.ColorHex}">
              <h3>Name: ${brick.LegoName}</h3>
              <div class="block-years">Manufactured ${brick.YearFrom} - ${brick.YearTo}</div>
              `;
  const link = brick.ColorstreamLinkImage;
  if (link) {
    block = `<a href="${link}" target="_blank" style="color:#${invertColor(brick.ColorHex)}">${block}</a>`;
  }
  block += `<p id="quantity--${brick.userBrick.id}">Quantity: ${brick.userBrick.quantity}
            <button id="btn-editQuantity--${brick.userBrick.id}">Edit Quantity</button>
            </p>`
  block += `<div><button id="btn-addNote--${brick.userBrick.id}" > Add Note</button ></div>`
  return block;
}