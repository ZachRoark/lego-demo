import { invertColor } from './../legos/helpers.js'
import { getUser } from '../auth/AuthProvider.js';
import { addUserBrick } from './CollectionProvider.js';

const eventHub = document.querySelector("main");
eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("btn-addNote--")) {
    const [prefix, id] = event.target.id.split("--")

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
  block += `<div><button id="btn-addNote--${brick.Id}" > Add Note</button ></div>`
  return block;
}