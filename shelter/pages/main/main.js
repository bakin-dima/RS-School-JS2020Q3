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
  },
];

let arrows = document.querySelectorAll(".slider__arrow");
let slider = document.querySelector(".slider__container");
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

let cardAdder = () => {
  data.sort((a, b) => Math.random() * 2 - 1);
  for (let i = 0; i < 3; i++) {
    cardCreator(i);
  }

  while (slider.children.length > 3) {
    slider.removeChild(slider.lastChild);
  }

  let windowModal = document.getElementById("popupWin");
  let popupBtn = document.querySelector(".popup__btn");
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      popupCreator(card.id);
      windowModal.style.display = "flex";
    });
  });
  windowModal.addEventListener("click", function (e) {
    if (!e.target.closest("#popupCar") || e.target.closest(".popup__btn")) {
      windowModal.style.display = "none";
    }
  });
};

cardAdder();

arrows.forEach((arrow) => arrow.addEventListener("click", cardAdder));
