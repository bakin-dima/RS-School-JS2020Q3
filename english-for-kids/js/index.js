import '../sass/style.scss';
import './images';
import create from './utils/create';
import clear from './utils/clear';
import footer from './layouts/footer';
import createIcon from './utils/createIcon';
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
const menuBtn = create('button', 'btn menu__btn', createIcon('menu'), header.firstChild);
const switchBtn = create('input', 'swidth__btn', 'menu', header.firstChild, ['type', 'checkbox']);
const infoBtn = create('button', 'btn info__btn', createIcon('help_outline'), header.firstChild);

// function generateCards(cardData) {
//   clear(main.firstChild);
//   const gameData = [];
//   const { content } = cardData;
//   for (let i = 0; i < content.length; i += 1) {
//     const cardContainer = create('div', 'card__container', '', main.firstChild);
//     const cardImageContainer = create('div', 'card__image', '', cardContainer);
//     create('img', 'card__image', '', cardImageContainer, [
//       'src',
//       `./assets/cards/${content[i].en}.png`,
//     ]);
//     const cardTitle = create('div', 'card__title', `${content[i].en}`, cardContainer);
//     const cardSound = create('audio', '', '', cardContainer, [
//       'src',
//       `./assets/sounds/${content[i].en}.mp3`,
//     ]);
//     const cardLook = create('button', 'btn btn__reverse', createIcon('visibility'), cardContainer);

//     //! Add Event listener for card rotate
//     cardLook.addEventListener('click', () => {
//       cardContainer.classList.add('card__container_rotate');
//       cardTitle.textContent = '';
//       setTimeout(() => {
//         cardTitle.textContent = content[i].ru;
//       }, 500);
//     });
//     cardContainer.addEventListener('mouseleave', () => {
//       cardContainer.classList.remove('card__container_rotate');
//       cardTitle.textContent = content[i].en;
//     });

//     //! Additional
//     const gameDataSource = {
//       element: cardContainer,
//       title: content[i].en,
//       audio: `./assets/sounds/${content[i].en}.mp3`,
//     };
//     gameData.push(gameDataSource);

//     const statisticsSource = {
//       title: content[i].en,
//       clicks: 0,
//     };
//     statisctic.push(statisticsSource);

//     cardContainer.addEventListener('click', () => {
//       cardSound.play();
//       statisticsSource.clicks += 1;
//       // storage.set('statisctic', statisctic);
//     });
//   }
//   const startGameBtn = create('button', 'btn btn__start', 'start', main.firstChild, [
//     'state',
//     'gameMode',
//   ]);
//   startGameBtn.addEventListener('click', () => {
//     for (let i = 0; i < gameData.length; i += 1) {
//       console.log(gameData[i].element);
//     }
//   });
// }

function generateCards(cardData) {
  clear(main.firstChild);
  const { content } = cardData;
  for (let i = 0; i < content.length; i += 1) {
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
      `./assets/cards/${content[i].en}.png`,
    ]);
    create('div', 'card__title', `${content[i].en}`, cardFront);
    const cardSound = create('audio', '', '', cardContainer, [
      'src',
      `./assets/sounds/${content[i].en}.mp3`,
    ]);
    const cardLook = create('button', 'btn btn__reverse', createIcon('visibility'), cardFront);

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
      cardSound.play();
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
    const cardFront = create('div', 'card__front', '', cardContainer);
    const cardImageContainer = create('div', 'card__image', '', cardFront);
    create('img', '', '', cardImageContainer, [
      'src',
      `./assets/categories/${categories[i].title}.png`,
    ]);
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

switchBtn.addEventListener('change', () => {
  if (switchBtn.checked) {
    main.setAttribute('data-state', 'gameMode');
    footer.setAttribute('data-state', 'gameMode');
    header.setAttribute('data-state', 'gameMode');
    document.querySelector('body').setAttribute('data-state', 'gameMode');
  }
  if (!switchBtn.checked) {
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
