import { LegoDetail } from './LegoDetail.js';
import { loadLegos, useLegos } from './LegoProvider.js';


export const makeLegoList = () => {
  const legosArray = useLegos()
  render(legosArray)

};

const render = (legoData) => {
  const legoDisplay = document.querySelector("#all-legos");

  let HTMLArray = legoData.map(oneLego => {
    return LegoDetail(oneLego);
  })
  legoDisplay.innerHTML = HTMLArray.join("");

}