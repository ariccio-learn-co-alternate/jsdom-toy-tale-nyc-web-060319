const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

function flipToyFormState() {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none';
  }

}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  flipToyFormState();
})

const toyCreateForm = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {
  populateToysCards();
  toyCreateForm.addEventListener("submit", toySubmitHandler);

})


function createToyRequest(toy) {

}

function postToy(toy) {
  return fetch("http://localhost:3000/toys", {
    method: 'POST',
    // mode: "cors",
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: JSON.stringify(toy)
  }).then(response => response.json());
}

function updateToyForm(response) {
  const toyCollection = document.querySelector("#toy-collection");
  toy["id"] = response.id;
  // toy["likes"] = ;
  const newToyCard = createToyCard(toy);
  toyCollection.appendChild(newToyCard);
  toyCreateForm.reset();
  flipToyFormState();
}

function toySubmitHandler(event) {
  event.preventDefault();
  console.log(event);
  // debugger;
  const toy = {
    name: event.target["name"].value,
    image: event.target["image"].value,
    likes: 1
  }
  postToy(toy).then(response => {
    console.log(response);
    updateToyForm(response);
    // debugger;
  }).catch(error => {
    console.warn(error);
    debugger;
  })
}


function fetchToys() {
  return fetch("http://localhost:3000/toys").then(resp => resp.json());
}

function createH2(content) {
  const newH2 = document.createElement("h2");
  newH2.innerText = content;
  return newH2;
}

function createImg(image, className) {
  const newImg = document.createElement("img");
  newImg.src = image;
  newImg.className = className;
  return newImg;
}

function createPLikes(toy) {
  const newPTag = document.createElement("p");
  newPTag.innerText = `${toy.likes} likes`;
  return newPTag;
}

function createButton(text, className) {
  const newButton = document.createElement("button");
  newButton.className = className;
  newButton.innerText = text;
  return newButton;
}

function createToyCard(toy) {
  const newToyCard = document.createElement("div")
  newToyCard.className = "card"
  newToyCard.appendChild(createH2(toy.name));
  newToyCard.appendChild(createImg(toy.image, "toy-avatar"));
  newToyCard.appendChild(createPLikes(toy));
  newToyCard.appendChild(createButton("Like <3", "like-btn"));
  return newToyCard;
}

function populateToysCards() {
  const toyCollection = document.querySelector("#toy-collection");
  fetchToys().then((toys) => {
    for(let i = 0; i < toys.length; i++) {
      const newToyCard = createToyCard(toys[i]);
      toyCollection.appendChild(newToyCard);
    }
  });
}

// YOUR CODE HERE



// OR HERE!
