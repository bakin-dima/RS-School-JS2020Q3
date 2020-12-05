import '../sass/style.scss';
import './images';
import create from './utils/create';
import links from './utils/links';
import clear from './utils/clear';
import footer from './layouts/footer';
import categories from './data/categories';
import * as storage from './storage';

let statisctic = [];
let gameData = [];
let mistakesCount = 0;

if (storage.get('statisctic')) {
  statisctic = storage.get('statisctic');
}

const gameOverlay = {
  gameOverlayContainer: create('div', 'game__overlay', ''),
  gameOverlayImage: create('img', 'game__image', ''),
  gameOverlayTitle: create('div', 'game__title', ''),
  gameOverlayButton: create('a', 'game__link', 'Home', '', ['href', '']),
};

gameOverlay.gameOverlayContainer.append(
  gameOverlay.gameOverlayImage,
  gameOverlay.gameOverlayTitle,
  gameOverlay.gameOverlayButton,
);

const header = create('header', 'header', create('div', 'wrapper wrapper__header'));
const main = create('main', 'main', create('div', 'wrapper wrapper__main', ''));
const gameAnswers = create('div', 'game__answers', '', main.firstChild);
const cardsContainer = create('div', 'cards__container', '', main.firstChild);
const cardSound = create('audio', '', '', main);

const messageSound = create('audio', '', '', main);

document.body.prepend(gameOverlay.gameOverlayContainer, header, main, footer);

const info = create('div', 'info', '', header.firstChild);
const menuBtn = create('button', 'btn menu__btn', '', header.firstChild);
const switchElement = {
  switchBox: create('div', 'switch', '', header.firstChild),
  switchBtn: create('input', 'checkbox', '', '', ['type', 'checkbox'], ['id', 'checkbox']),
  switchLabel: create('label', 'checkbox__label', '', '', ['for', 'checkbox']),
  trainLabel: create('span', 'train', 'Train', ''),
  playLabel: create('span', 'play', 'Play', ''),
};

switchElement.switchBox.append(
  switchElement.switchBtn,
  switchElement.switchLabel,
  switchElement.trainLabel,
  switchElement.playLabel,
);
const startGameBtn = create('button', 'btn start__btn', 'START', header.firstChild);
startGameBtn.disabled = true;
const infoBtn = create('button', 'btn info__btn', '', header.firstChild);

function generateCards(cardData) {
  clear(cardsContainer);
  clear(gameAnswers);
  mistakesCount = 0;
  const { content } = cardData;
  gameData = [];
  startGameBtn.innerHTML = 'START';
  startGameBtn.disabled = false;
  for (let i = 0; i < content.length; i += 1) {
    gameData.push(content[i].en);
    const card = create('div', 'card', '', cardsContainer);
    const cardFront = create('div', 'card__front', '', card, ['card', `${content[i].en}`]);
    const cardBack = create(
      'div',
      'card__back',
      create('div', 'card__title', `${content[i].ru}`, ''),
      card,
    );
    const cardImageContainer = create('div', 'card__image', '', cardFront);
    create('img', 'card__image', '', cardImageContainer, [
      'src',
      links.cardImageSrc(content[i].en),
    ]);
    create('div', 'card__title', `${content[i].en}`, cardFront);
    const cardLook = create('button', 'btn look__btn', '', cardFront);

    cardLook.addEventListener('click', () => {
      cardFront.classList.add('card__front_rotate');
      cardBack.classList.add('card__back_rotate');
    });
    card.addEventListener('mouseleave', () => {
      cardFront.classList.remove('card__front_rotate');
      cardBack.classList.remove('card__back_rotate');
    });
  }
}

const menuLinksCreate = function menuLinksCreate() {
  const menu = create('nav', 'menu', '', header.firstChild);
  const menuList = create('ul', 'menu__list', '', menu);
  create(
    'li',
    'menu__item',
    create(
      'a',
      'menu__link',
      `<img src="./assets/static/home.png" class="menu__image"/> Home`,
      '',
      ['href', ``],
    ),
    menuList,
  );
  for (let i = 0; i < categories.length; i += 1) {
    const menuItem = create('li', 'menu__item', '', menuList);
    create(
      'a',
      'menu__link',
      `<img src="./assets/categories/${categories[i].title}.png" class="menu__image"/> ${categories[i].title}`,
      menuItem,
      ['href', `#${categories[i].title}/`],
    );
    menuItem.addEventListener('click', () => generateCards(categories[i]));
  }
  return menu;
};

const menu = menuLinksCreate();

const cardsCreate = function cardsCreate() {
  for (let i = 0; i < categories.length; i += 1) {
    const card = create('a', 'card', '', cardsContainer, ['href', `#${categories[i].title}/`]);
    const cardFront = create('div', 'card__categories', '', card);
    const cardImageContainer = create('div', 'card__image', '', cardFront);
    create('img', '', '', cardImageContainer, ['src', links.categoryImageSrc(categories[i].title)]);
    create('div', 'card__title', `${categories[i].title}`, cardFront);
    create('span', 'card__items', `${categories[i].content.length}`, cardFront);

    card.addEventListener('click', () => generateCards(categories[i]));
  }
};

cardsCreate();

function showMenu() {
  menu.classList.toggle('menu__switcher');
  menuBtn.classList.toggle('menu__btn__switcher');
}
function showinfo() {
  info.classList.toggle('info__switcher');
  info.classList.toggle('info__btn__switcher');
  clear(info);
  const clearBtn = create('button', 'btn btn__clear', 'CLEAR', info);
  clearBtn.addEventListener('click', () => {
    statisctic = [];
    storage.del('statisctic');
  });
  statisctic.forEach((el) => {
    create(
      'p',
      '',
      [create('span', '', el.title, ''), create('span', '', `${el.clicks}`, '')],
      info,
    );
  });
}

const playSound = (element) => {
  const soundSrc = element.getAttribute('data-card');
  cardSound.src = links.soundSrc(soundSrc);
  cardSound.load();
  setTimeout(() => {
    cardSound.play();
  }, 1);
};

const playMessageSound = (message) => {
  messageSound.src = message;
  setTimeout(() => {
    messageSound.play();
  }, 1);
};

const gameOverlayShow = () => {
  if (mistakesCount !== 0) {
    playMessageSound(links.winnerSound);
    gameOverlay.gameOverlayImage.src = links.staticImageSrc('game_lose');
    gameOverlay.gameOverlayTitle.innerHTML = `You make ${mistakesCount} mistakes`;
  } else {
    playMessageSound(links.failSound);
    gameOverlay.gameOverlayImage.src = links.staticImageSrc('game_win');
    gameOverlay.gameOverlayTitle.innerHTML = 'Good Job!';
  }

  gameOverlay.gameOverlayContainer.classList.add('game__overlay_active');
};

const playGame = () => {
  if (gameData.length === 0) {
    gameOverlayShow();
    return;
  }
  gameData.sort(() => Math.random() * 2 - 1);
  cardSound.src = links.soundSrc(gameData[gameData.length - 1]);
  cardSound.load();
  cardSound.play();
  startGameBtn.innerHTML = 'REPEAT';
};

startGameBtn.addEventListener('click', () => {
  if (startGameBtn.innerHTML === 'START') {
    playGame();
  }
  if (startGameBtn.innerHTML === 'REPEAT') {
    cardSound.play();
  }
});

cardsContainer.addEventListener('click', (event) => {
  const targ = event.target.closest('.card__front');
  if (targ) {
    if (!switchElement.switchBtn.checked) {
      playSound(targ);
    }
    if (switchElement.switchBtn.checked && startGameBtn.innerHTML === 'REPEAT') {
      if (targ.getAttribute('data-card') === gameData[gameData.length - 1]) {
        targ.classList.add('game__true');
        gameAnswers.prepend(create('div', 'answer__true', '', ''));
        playMessageSound(links.correctSound);
        gameData.pop();
        playGame();
      } else {
        gameAnswers.prepend(create('div', 'answer__false', '', ''));
        playMessageSound(links.mistakeSound);
        mistakesCount += 1;
      }
    }
  }
});

switchElement.switchBtn.addEventListener('change', () => {
  if (switchElement.switchBtn.checked) {
    main.setAttribute('data-state', 'gameMode');
    footer.setAttribute('data-state', 'gameMode');
    header.setAttribute('data-state', 'gameMode');
  }
  if (!switchElement.switchBtn.checked) {
    main.removeAttribute('data-state');
    footer.removeAttribute('data-state');
    header.removeAttribute('data-state');
  }
});

menuBtn.addEventListener('click', showMenu);
menu.addEventListener('click', showMenu);
infoBtn.addEventListener('click', showinfo);
info.addEventListener('click', showinfo);
