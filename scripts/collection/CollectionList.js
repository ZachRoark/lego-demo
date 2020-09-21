//put stuff in here
//<section id="collection"></section>
import { loadUsersBricks } from './CollectionProvider.js'
import { getUser } from './../auth/AuthProvider.js'
import { CollectionDetail } from './CollectionDetail.js'
import { useLegos } from '../legos/LegoProvider.js';


const render = (userBrickArray) => {
  const collectionDisplay = document.querySelector("#container");
  let HTMLArray = userBrickArray.map(singleBrick => {
    let targetObj
    const brickObj = useLegos().find(dbBrick => {
      //need to send the userBrick Id in the objct
      if (dbBrick.Id === parseInt(singleBrick.brickId)) {
        targetObj = dbBrick;
        targetObj.userBrick = singleBrick;
        console.log("to", targetObj)
      }
      return targetObj
    })

    //add users stuff to the brick from DB
    // brickObj.userInfo = singleBrick;
    return CollectionDetail(targetObj)
  })
  collectionDisplay.innerHTML = HTMLArray.join("");
}


export const CollectionList = () => {
  loadUsersBricks(getUser().id)
    .then(response => {
      render(response)
    })
}