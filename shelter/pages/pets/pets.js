let data = [
  {
    name: "Jennifer",
    img: "../../assets/images/pets-jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
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
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
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
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
    id: "2",
  },
  {
    name: "Scarlett",
    img: "../../assets/images/pets-scarlet.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
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
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
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
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
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
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
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
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
    id: "7",
  },
];

let slider = document.querySelector(".slider__container"),
  arrowsCounter = document.querySelector(".arrows__container_counter"),
  arrowStart = document.querySelector(".arrows__container_start"),
  arrowPrev = document.querySelector(".arrows__container_prev"),
  arrowNext = document.querySelector(".arrows__container_next"),
  arrowEnd = document.querySelector(".arrows__container_end"),
  counter = 1;

arrowsCounter.textContent = `${counter}`;

// ! CHECK WIDTH
let checkWidth = () => {
  windowWidth = Math.floor(
    document.querySelector(".wrapper").clientWidth / 270
  );
  return windowWidth > 3 ? 8 : windowWidth > 1 ? 6 : 3;
};

//window.addEventListener("resize", checkWidth);

const cardCreator = (i) => {
  let card = document.createElement("div");
  let image = document.createElement("img");
  let title = document.createElement("p");
  let button = document.createElement("button");

  card.className = "card";
  card.setAttribute("id", data[i].id);
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

// ! FIXED RANDOM index < 8
let cardIndex = [];
for (let index = 0; index < 8; index++) {
  cardIndex.push(index);
}

// ! FIXED RANDOM j < 6
let cardAdder = () => {
  for (let j = 0; j < 6; j++) {
    cardIndex.sort((a, b) => Math.random() * 2 - 1);
    cardIndex.forEach((i) => cardCreator(i));
  }
};

cardAdder();

let cards = document.querySelectorAll(".card");

// ! CHECK BUTTONS

let checkButtons = (counter) => {
  arrowsCounter.textContent = `${counter}`;
  counter == 1 ? (arrowPrev.disabled = true) : (arrowPrev.disabled = false);
  counter == 1 ? (arrowStart.disabled = true) : (arrowStart.disabled = false);
  counter == cards.length / checkWidth()
    ? (arrowNext.disabled = true)
    : (arrowNext.disabled = false);
  counter == cards.length / checkWidth()
    ? (arrowEnd.disabled = true)
    : (arrowEnd.disabled = false);
};

// ! SLIDER FUNCTION

arrowNext.addEventListener("click", function () {
  cards.forEach((card) => (card.style.display = "none"));
  for (let i = checkWidth() * counter; i < checkWidth() * (counter + 1); i++) {
    cards[i].style.display = "flex";
    cards[i].classList.remove("slide-right");
    cards[i].classList.add("slide-left");
  }
  checkButtons(++counter);
});

arrowPrev.addEventListener("click", function () {
  cards.forEach((card) => (card.style.display = "none"));
  checkButtons(--counter);
  for (let i = checkWidth() * (counter - 1); i < counter * checkWidth(); i++) {
    cards[i].style.display = "flex";
    cards[i].classList.remove("slide-left");
    cards[i].classList.add("slide-right");
  }
});

arrowStart.addEventListener("click", function () {
  cards.forEach((card) => (card.style.display = "none"));
  for (let i = 0; i < checkWidth(); i++) {
    cards[i].style.display = "flex";
    cards[i].classList.remove("slide-left");
    cards[i].classList.add("slide-right");
  }
  checkButtons((counter = 1));
});

arrowEnd.addEventListener("click", function () {
  checkButtons((counter = cards.length / checkWidth()));
  cards.forEach((card) => (card.style.display = "none"));
  for (let i = checkWidth() * (counter - 1); i < checkWidth() * counter; i++) {
    cards[i].style.display = "flex";
    cards[i].classList.remove("slide-right");
    cards[i].classList.add("slide-left");
  }
});

// ! POP UP FUNCTION

let windowModal = document.querySelector(".popup__window");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    popupCreator(card.id);
    windowModal.style.display = "flex";
    body.classList.toggle("scroll__lock");
  });
});
windowModal.addEventListener("click", function (e) {
  if (!e.target.closest(".popup__card") || e.target.closest(".popup__btn")) {
    windowModal.style.display = "none";
    body.classList.toggle("scroll__lock");
  }
});

// ! BURGER FUNCTION

const burgerBtn = document.querySelector(".burger__logo");
const burgerWindow = document.querySelector(".burger__window");
const burgerLinkActive = document.querySelector(".burger__link_active");
const body = document.querySelector("body");

burgerBtn.addEventListener("click", function () {
  burgerBtn.classList.toggle("burger__logo_active");
  burgerWindow.classList.toggle("burger__window_active");
  body.classList.toggle("scroll__lock");
});

burgerWindow.addEventListener("click", function (e) {
  if (!e.target.closest(".burger__box")) {
    burgerWindow.classList.toggle("burger__window_active");
    burgerBtn.classList.toggle("burger__logo_active");
    body.classList.toggle("scroll__lock");
  }
});

burgerLinkActive.addEventListener("click", function () {
  burgerWindow.classList.remove("burger__window_active");
  burgerBtn.classList.remove("burger__logo_active");
  body.classList.toggle("scroll__lock");
});
