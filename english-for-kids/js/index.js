import '../sass/style.scss';
import './images';
import create from './utils/create';
import links from './utils/links';
import clear from './utils/clear';
import footer from './layouts/footer';
import categories from './data/categories';
import * as storage from './storage';

let statisctic = [];

if (storage.get('statisctic')) {
  statisctic = storage.get('statisctic');
}

const header = create('header', 'header', create('div', 'wrapper wrapper__header'));
const main = create('main', 'main', create('div', 'wrapper wrapper__main'));
document.body.prepend(header, main, footer);

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

const infoBtn = create('button', 'btn info__btn', '', header.firstChild);

function generateCards(cardData) {
  clear(main.firstChild);
  const { content } = cardData;
  const gameData = [];
  for (let i = 0; i < content.length; i += 1) {
    gameData.push(content[i].en);
    const cardContainer = create('div', 'card__container', '', main.firstChild);
    const cardFront = create('div', 'card__front', '', cardContainer);
    const cardBack = create(
      'div',
      'card__back',
      create('div', 'card__title', `${content[i].ru}`, ''),
      cardContainer,
    );
    const cardImageContainer = create('div', 'card__image', '', cardFront);
    create('img', 'card__image', '', cardImageContainer, [
      'src',
      links.cardImageSrc(content[i].en),
    ]);
    create('div', 'card__title', `${content[i].en}`, cardFront);
    const cardLook = create('button', 'btn look__btn', '', cardFront);
    const cardSound = create('audio', '', '', cardContainer, [
      'src',
      `./assets/sounds/${content[i].en}.mp3`,
    ]);

    //! Add Event listener for card rotate
    cardLook.addEventListener('click', () => {
      cardFront.classList.add('card__front_rotate');
      cardBack.classList.add('card__back_rotate');
    });
    cardContainer.addEventListener('mouseleave', () => {
      cardFront.classList.remove('card__front_rotate');
      cardBack.classList.remove('card__back_rotate');
    });
    //! Play Sound
    cardContainer.addEventListener('click', () => {
      if (switchElement.switchBtn.checked) {
        cardFront.classList.add('game__true');
      } else {
        cardSound.play();
      }
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
    const cardContainer = create('a', 'card__container', '', main.firstChild, [
      'href',
      `#${categories[i].title}/`,
    ]);
    const cardFront = create('div', 'card__categories', '', cardContainer);
    const cardImageContainer = create('div', 'card__image', '', cardFront);
    create('img', '', '', cardImageContainer, ['src', links.categoryImageSrc(categories[i].title)]);
    create('div', 'card__title', `${categories[i].title}`, cardFront);
    create('span', 'card__items', `${categories[i].content.length}`, cardFront);

    cardContainer.addEventListener('click', () => generateCards(categories[i]));
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

switchElement.switchBtn.addEventListener('change', () => {
  if (switchElement.switchBtn.checked) {
    main.setAttribute('data-state', 'gameMode');
    footer.setAttribute('data-state', 'gameMode');
    header.setAttribute('data-state', 'gameMode');
    document.querySelector('body').setAttribute('data-state', 'gameMode');
  }
  if (!switchElement.switchBtn.checked) {
    main.removeAttribute('data-state');
    footer.removeAttribute('data-state');
    header.removeAttribute('data-state');
    document.querySelector('body').removeAttribute('data-state', 'gameMode');
  }
});

menuBtn.addEventListener('click', showMenu);
menu.addEventListener('click', showMenu);
infoBtn.addEventListener('click', showinfo);
info.addEventListener('click', showinfo);
