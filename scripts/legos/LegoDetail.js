import { invertColor } from './helpers.js'
import { addUserBrick } from './../collection/CollectionProvider.js';
import { getUser } from './../auth/AuthProvider.js';

const eventHub = document.querySelector("main");

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("btn-addCollection--")) {
    const [prefix, id] = event.target.id.split("--")
    let brickObj = {
      userId: getUser().id,
      brickId: parseInt(id),
      quantity: 1
    }
    addUserBrick(brickObj);

  }
})
export const LegoDetail = (brick) => {

  let block = `<section class="block-wrapper" style="background-color:#${brick.ColorHex}">
              <h3>Name: ${brick.LegoName}</h3>
              <div class="block-years">Manufactured ${brick.YearFrom} - ${brick.YearTo}</div>

              `;
  const link = brick.ColorstreamLinkImage;
  if (link) {
    block = `<a href="${link}" target="_blank" style="color:#${invertColor(brick.ColorHex)}">${block}</a>`;
  }
  block += `<div><button id="btn-addCollection--${brick.Id}" >Add</button ></div>`
  return block;
}