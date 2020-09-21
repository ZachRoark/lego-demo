import { invertColor } from './../legos/helpers.js'
import { getUser } from '../auth/AuthProvider.js';
import { addUserBrick, getSingleBrick, editQuantity } from './CollectionProvider.js';

const eventHub = document.querySelector("main");
eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("btn-addNote--")) {
    const [prefix, id] = event.target.id.split("--")

  } else if (event.target.id.startsWith("btn-editQuantity--")) {
    const [prefix, id] = event.target.id.split("--");
    //get brick quantity
    const brick = getSingleBrick(id)
      .then((response) => {
        console.log("respons", response)
        document.querySelector(`#quantity--${id}`).innerHTML = `
      <input type="hidden" value="${id}" id="editQuanity--id">
        <input id="input-quantity--${id}" value="${response[0].quantity}"/>
      <button id="saveQuantity--${id}">Save</button>
      `
      })
  } else if (event.target.id.startsWith("saveQuantity--")) {
    const [prefix, id] = event.target.id.split("--");
    // collect the details of brick
    //id: 1, brickId: 1, quantity: 6, userId: 1
    const quantityInput = document.querySelector(`#input-quantity--${id}`);
    console.log("quan input", quantityInput)
    const updatedBrick = {
      brickId: id,
      userId: getUser().id,
      quantity: parseInt(document.querySelector(`#input-quantity--${id}`).value)
    }
    const userBricksId = parseInt(document.querySelector("#editQuanity--id").value)
    editQuantity(updatedBrick, userBricksId)

  }
})

export const CollectionDetail = (brick) => {
  let block = `<section class="block-wrapper" style="background-color:#${brick.ColorHex}">
              <h3>Name: ${brick.LegoName}</h3>
              <div class="block-years">Manufactured ${brick.YearFrom} - ${brick.YearTo}</div>
              `;
  const link = brick.ColorstreamLinkImage;
  if (link) {
    block = `<a href="${link}" target="_blank" style="color:#${invertColor(brick.ColorHex)}">${block}</a>`;
  }
  block += `<p id="quantity--${brick.userInfo.brickId}">Quantity: ${brick.userInfo.quantity}
            <button id="btn-editQuantity--${brick.userInfo.brickId}">Edit Quantity</button>
            </p>`
  block += `<div><button id="btn-addNote--${brick.userInfo.brickId}" > Add Note</button ></div>`
  return block;
}