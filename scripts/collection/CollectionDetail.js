import { invertColor } from './../legos/helpers.js'
import { getUser } from '../auth/AuthProvider.js';
import { getSingleBrick, editQuantity } from './CollectionProvider.js';
import { EditQuantityForm } from './EditQuantityForm.js';

const eventHub = document.querySelector("main");

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("btn-addNote--")) {
    const [prefix, id] = event.target.id.split("--")
    //TODO Add some note stuff here
  } else if (event.target.id.startsWith("btn-editQuantity--")) {
    const [prefix, id] = event.target.id.split("--");
    EditQuantityForm(id);
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
  block += `<p id="quantity--${brick.userBrick.id}">Quantity: ${brick.userBrick.quantity}
            <button id="btn-editQuantity--${brick.userBrick.id}">Edit Quantity</button>
            </p>`
  block += `<div><button id="btn-addNote--${brick.userBrick.id}" > Add Note</button ></div>`
  return block;
}