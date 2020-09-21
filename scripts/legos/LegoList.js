import { LegoDetail } from './LegoDetail.js';
import { loadLegos, useLegos } from './LegoProvider.js';


export const makeLegoList = () => {
  // loadLegos()
  //   .then(useLegos)

  const legosArray = useLegos()
  console.log("le", legosArray);
  render(legosArray)

};

const render = (legoData) => {
  const legoDisplay = document.querySelector("#all-legos");

  let HTMLArray = legoData.map(oneLego => {
    return LegoDetail(oneLego);
  })
  legoDisplay.innerHTML = HTMLArray.join("");

}