console.log("hello beautiful")
import { loadLegos } from './legos/LegoProvider.js';
import { makeLegoList } from './legos/LegoList.js';
import { login } from './auth/Login.js';
import { CollectionList } from './collection/CollectionList.js'

const eventHub = document.querySelector("main");
let credentals = {};

loadLegos()
  .then(makeLegoList)
  .then(() => {
    if (sessionStorage.getItem("credentials")) {
      console.log('got user')
      credentals = sessionStorage.getItem("credentials")
      CollectionList();
    } else {
      console.log('no user')
      login();
    }

  })


//show user collection after login
eventHub.addEventListener("userIsAuthed", () => {
  //load user's blocks
  console.log("now load the user blocks")
  CollectionList()
})

eventHub.addEventListener("userBricksStateChanged", () => {
  //load user's blocks
  console.log("now load the user blocks")
  CollectionList()
})



//allow user to add bricks and make notes