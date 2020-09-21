let apiLegos = []

export const useLegos = () => {
  return apiLegos.slice("")
}

export const loadLegos = () => {
  return fetch("../legoAPI/lego-colors.json")
    .then(response => response.json())
    .then((legoArray) => {
      apiLegos = legoArray.LegoColorss;
      return legoArray.LegoColorss;
    })
};