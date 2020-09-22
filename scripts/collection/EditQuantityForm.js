import {getSingleBrick, editQuantity} from './CollectionProvider.js';
import { getUser } from '../auth/AuthProvider.js';

const eventHub = document.querySelector("main");

eventHub.addEventListener("click", event => { 
	if (event.target.id.startsWith("saveQuantity--")) {
		const [prefix, id] = event.target.id.split("--");
		// collect the details of brick
		//id: 1, brickId: 1, quantity: 6, userId: 1
		const updatedBrick = {
		brickId: parseInt(document.querySelector(`#edit--APIBrick`).value),
		userId: getUser().id,
		quantity: parseInt(document.querySelector(`#input-quantity--${id}`).value)
		}
		const userBricksId = parseInt(document.querySelector("#editQuanity--id").value)
		editQuantity(updatedBrick, userBricksId)
	}
})
export const EditQuantityForm = (userBricksId) => {
	const brick = getSingleBrick(parseInt(userBricksId))
      .then((response) => {
        document.querySelector(`#quantity--${userBricksId}`).innerHTML = `
          <input type="hidden" value="${userBricksId}" id="editQuanity--id">
          <input type="hidden" value="${response.brickId}" id="edit--APIBrick">
          <input id="input-quantity--${userBricksId}" value="${response.quantity}"/>
          <button id="saveQuantity--${userBricksId}">Save</button>
        `
	  })
}