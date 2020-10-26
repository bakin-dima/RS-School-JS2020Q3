let data = [
  {
    name: "Jennifer",
    img: "../../assets/images/pets-jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. ",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
    id: "0",
  },
  {
    name: "Sophia",
    img: "../../assets/images/pets-sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. ",
    age: "1 month",
    inoculations: ["virus"],
    diseases: ["none"],
    parasites: ["none"],
    id: "1",
  },
  {
    name: "Woody",
    img: "../../assets/images/pets-woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training.",
    age: "3 years 6 months",
    inoculations: ["adenovirus"],
    diseases: ["right back"],
    parasites: ["none"],
    id: "2",
  },
  {
    name: "Scarlett",
    img: "../../assets/images/pets-scarlet.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile.",
    age: "3 months",
    inoculations: ["fluenza"],
    diseases: ["none"],
    parasites: ["none"],
    id: "3",
  },
  {
    name: "Katrine",
    img: "../../assets/images/pets-katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one.",
    age: "6 months",
    inoculations: ["panle"],
    diseases: ["none"],
    parasites: ["none"],
    id: "4",
  },
  {
    name: "Timmy",
    img: "../../assets/images/pets-timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle.",
    age: "2 years 3 months",
    inoculations: ["calic"],
    diseases: ["kidney stones"],
    parasites: ["none"],
    id: "5",
  },
  {
    name: "Freddie",
    img: "../../assets/images/pets-freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
    id: "6",
  },
  {
    name: "Charly",
    img: "../../assets/images/pets-charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home.",
    age: "8 years",
    inoculations: ["lepto"],
    diseases: ["deafness"],
    parasites: ["lice", "fleas"],
    id: "7",
  },
];

let arrows = document.querySelectorAll(".slider__arrow"),
  slider = document.querySelector(".slider__container"),
  popupWindow = document.querySelector(".popup__window");

let cardCreator = (i) => {
  let card = document.createElement("div");
  let image = document.createElement("img");
  let title = document.createElement("p");
  let button = document.createElement("button");

  card.className = "card";
  card.setAttribute("id", i);
  image.className = "card__image";
  title.className = "card__title";
  button.className = "card__button";

  image.src = data[i].img;
  image.alt = data[i].type;
  title.textContent = data[i].name;
  button.textContent = "Learn more";
  button.type = "button";

  card.append(image, title, button);
  slider.prepend(card);
};

const popupCreator = (i) => {
  let popupImage = document.querySelector(".popup__image"),
    popupName = document.querySelector(".popup__name"),
    popupType = document.querySelector(".popup__type"),
    popupDescription = document.querySelector(".popup__description"),
    popupAge = document.querySelector(".popup__item_age"),
    popupInoculations = document.querySelector(".popup__item_inoculations"),
    popupDiseases = document.querySelector(".popup__item_diseases"),
    popupParasites = document.querySelector(".popup__item_parasites");

  popupImage.src = data[i].img;
  popupName.textContent = data[i].name;
  popupType.textContent = data[i].type + " - " + data[i].breed;
  popupDescription.textContent = data[i].description;
  popupAge.innerHTML = "<strong>Age: </strong>" + data[i].age;
  popupInoculations.innerHTML =
    "<strong>Inoculations: </strong>" + data[i].inoculations;
  popupDiseases.innerHTML = "<strong>Diseases: </strong>" + data[i].diseases;
  popupParasites.innerHTML = "<strong>Parasites: </strong>" + data[i].parasites;
};

// * NEW RANDOM
const cardAdder = () => { 
  data.sort((a, b) => Math.random() * 2 - 1);
  for (let i = 0; i < 3; i++) {
    cardCreator(i);
  }
  while (slider.children.length > 3) {
    slider.removeChild(slider.lastChild);
  }

  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      popupCreator(card.id);
      popupWindow.style.display = "flex";
      body.classList.toggle("scroll__lock");
    });
  });
  popupWindow.addEventListener("click", function (e) {
    if (!e.target.closest(".popup__card") || e.target.closest(".popup__btn")) {
      popupWindow.style.display = "none";
      body.classList.toggle("scroll__lock");
    }
  });
};

cardAdder();

arrows.forEach((arrow) => arrow.addEventListener("click", cardAdder));

// ! BURGER FUNCTION

const burgerBtn = document.querySelector(".burger__logo"),
burgerWindow = document.querySelector(".burger__overlay"),
burgerLinkActive = document.querySelector(".list__link_active"),
body = document.querySelector("body"),
menu = document.querySelector(".menu");

burgerBtn.addEventListener("click", function () {
  burgerBtn.classList.toggle("burger__logo_active");
  burgerWindow.classList.toggle("burger__overlay_active");
  body.classList.toggle("scroll__lock");
  menu.classList.toggle("menu_active");
});

burgerWindow.addEventListener("click", function (e) {
  if (!e.target.closest(".burger__box")) {
    burgerBtn.classList.toggle("burger__logo_active");
  burgerWindow.classList.toggle("burger__overlay_active");
  body.classList.toggle("scroll__lock");
  menu.classList.toggle("menu_active");
  }
});

burgerLinkActive.addEventListener("click", function () {
  burgerBtn.classList.toggle("burger__logo_active");
  burgerWindow.classList.toggle("burger__overlay_active");
  body.classList.toggle("scroll__lock");
  menu.classList.toggle("menu_active");
});