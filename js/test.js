//Alex's work


let searchPopup = document.querySelector('#search-popup');
let searchLink = document.querySelector('#search-link');
let popupCloser = document.querySelector('#popup-closer');

//make search button display popup div
searchLink.addEventListener('click', () => {
  searchPopup.classList.remove('hidden');
});

//make closing button in popup div hide the div
popupCloser.addEventListener('click', () => {
  searchPopup.classList.add('hidden');
});


//create a list of all the available cards
// Ensure that I am making an array of arrays, so that the card name and the image src are together.
// The card name, from Alt field, will be first string, the img src will be second.

let allCardData = [];
var images = [].concat.apply([], document.querySelectorAll('img#card'));
//console.log(images)
images.forEach((element) => {
  let name = element.alt.split('%20').join(' ').toLowerCase()
  fetch(`https://api.magicthegathering.io/v1/cards?name=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let cardobj = res.cards[res.cards.length-1];//I want the closest thing to oracle text of the card, so I use the most recent printing
      cardobj.url = element.src;//let's add the URL that we are already using for the visual cube to cardobj
      console.log(cardobj)
      console.log(cardobj.cmc)//just testing to make sure that I can see the properties of the object
      allCardData.push(cardobj)
    })
  //console.log(element.src); 
  //console.log(element.alt);
});

console.log(allCardData)

allCardData.forEach((element) => {
  console.log(element);
})

/* some of the relevant available fields and the type on the other side in the api.magicthegathering:
  name: string
  manaCost: string
  cmc: int
  colors: Array
  type: string
  types: Array
  rarity: string
  set: string
  setname: string
  subtypes: Array
  supertypes: Array
  text: string
  power: string
  toughness: string
*/
var avFields = ['name','cmc','colors','types','subtypes','text']; //These are the fields I'd like to use for possible search queries


var result = allCardData.filter(function(obj) {
  return obj.cmc == 3;
});

/*
var result = [];
allCardData.map((ele) => {
  console.log(ele);
  if (ele.cmc == 3) {
    result.push(allCardData[i]);
  }
});
*/
/*for (var i in allCardData) {
  console.log(allCardData[i].cmc.typeof());
  if (allCardData[i].cmc == 3) {
    result.push(allCardData[i])
  }
};*/
console.log(result);
