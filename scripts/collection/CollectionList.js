//put stuff in here
//<section id="collection"></section>
import { loadUsersBricks } from './CollectionProvider.js'
import { getUser } from './../auth/AuthProvider.js'
import { CollectionDetail } from './CollectionDetail.js'
import { useLegos } from '../legos/LegoProvider.js';



const render = (userBrickArray) => {
  const collectionDisplay = document.querySelector("#container");
  let HTMLArray = userBrickArray.map(singleBrick => {
    const brickObj = useLegos().find(dbBrick => {
      return dbBrick.Id === parseInt(singleBrick.brickId)
    })
    console.log("what is brickObj", brickObj)
    return CollectionDetail(brickObj)
  })
  collectionDisplay.innerHTML = HTMLArray.join("");
}
export const CollectionList = () => {
  loadUsersBricks(getUser().id)
    .then(response => {
      console.log("userResponse", response)
      render(response)
    })
}