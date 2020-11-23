import '../sass/style.scss';
import './images';
import * as from './storage';
import create from './utils/create';
import createIcon from './utils/createIcon';
import categories from './layouts/categories';
import card from './card';

const header = create('header', 'header', create('div', 'wrapper wrapper__header'));
const main = create('main', 'main', create('div', 'wrapper wrapper__main'));
const footer = create(
  'footer',
  'footer',
  create('div', 'wrapper wrapper__footer', [
    create(
      'a',
      'footer__link',
      create(
        'img',
        'footer__image',
        '',
        '',
        ['src', './assets/icons/github.png'],
        ['alt', 'git-hub-repository-link'],
      ),
      '',
      ['href', 'https://github.com/bakin-dima'],
      ['target', '_blank'],
    ),
    create(
      'a',
      'footer__link',
      create(
        'img',
        'footer__image',
        '',
        '',
        ['src', './assets/icons/rsschool.svg'],
        ['alt', 'rsschool-course-link'],
      ),
      '',
      ['href', 'https://rs.school/js/'],
      ['target', '_blank'],
    ),
  ]),
);
document.body.prepend(header, main, footer);

const menu = create(
  'div',
  'menu',
  create('a', 'menu__link', 'Menu', '', ['href', ``]),
  header.firstChild,
);

const info = create('div', 'info', '', header.firstChild);
const menuBtn = create('button', 'btn menu__btn', createIcon('menu'), header.firstChild);
const switchBtn = create('input', 'swidth__btn', 'menu', header.firstChild, ['type', 'checkbox']);
const infoBtn = create('button', 'btn info__btn', createIcon('help_outline'), header.firstChild);

// function generateCards(cardData) {
//   const { content } = cardData;
//   for (let i = 0; i < content.length; i += 1) {
//     const cardContainer = create('div', 'card__container', '', main.firstChild);
//     create('img', 'card__image', '', cardContainer);
//     const cardTitle = create('div', 'card__title_en', `${content[i].en}`, cardContainer);
//     const cardSound = create('button', 'btn btn__voice', createIcon('volume_up'), cardContainer);
//     const cardLook = create('button', 'btn btn__reverse', createIcon('visibility'), cardContainer);
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
//   }
// }

function generateCards(cardData) {
  const { content } = cardData;
  for (let i = 0; i < content.length; i += 1) {
    categories[i].cardTitle.innerHTML = content[i].en;
    categories[i].cardImage.removeAttribute('src');
    categories[i].cardImage.setAttribute('src', '#');
    categories[i].cardLook.innerHTML = createIcon('visibility');

    categories[i].cardLook.addEventListener('click', () => {
      categories[i].cardContainer.classList.add('card__container_rotate');
      categories[i].cardTitle.innerHTML = '';
      setTimeout(() => {
        categories[i].cardTitle.innerHTML = content[i].ru;
      }, 500);
    });
    categories[i].cardContainer.addEventListener('mouseleave', () => {
      categories[i].cardContainer.classList.remove('card__container_rotate');
      categories[i].cardTitle.innerHTML = content[i].en;
    });
  }
}

const menuLinksCreate = function menuLinksCreate() {
  for (let i = 0; i < categories.length; i += 1) {
    const elementLink = create('a', 'menu__link', `${categories[i].title}`, menu, [
      'href',
      `#${categories[i].title}/`,
    ]);
    categories[i].link = elementLink;
    categories[i].link.addEventListener('click', () => generateCards(categories[i]));
  }
};

menuLinksCreate();

const cardsCreate = function cardsCreate() {
  for (let i = 0; i < categories.length; i += 1) {
    const cardContainer = create(
      'div',
      'card__container',
      create('a', '', '', '', ['href', `#${categories[i].title}/`]),
      main.firstChild,
    );
    const cardImageContainer = create('div', 'card__image', '', cardContainer.firstChild);
    const cardImage = create('img', '', '', cardImageContainer, ['src', `${categories[i].image}`]);
    const cardTitle = create(
      'div',
      'card__title',
      `${categories[i].title}`,
      cardContainer.firstChild,
    );
    const cardSound = create('button', 'btn btn__voice', '', cardContainer.firstChild);
    const cardLook = create('button', 'btn btn__reverse', '', cardContainer.firstChild);
    categories[i].cardContainer = cardContainer;
    categories[i].cardImage = cardImage;
    categories[i].cardTitle = cardTitle;
    categories[i].cardSound = cardSound;
    categories[i].cardLook = cardLook;

    categories[i].cardContainer.addEventListener('click', () => generateCards(categories[i]));
  }
  console.log(categories);
};

cardsCreate();

function showMenu() {
  menu.classList.toggle('menu__switcher');
  menuBtn.classList.toggle('menu__btn__switcher');
}
function showinfo() {
  info.classList.toggle('info__switcher');
  info.classList.toggle('info__btn__switcher');
}

menuBtn.addEventListener('click', showMenu);
menu.addEventListener('click', showMenu);
infoBtn.addEventListener('click', showinfo);
info.addEventListener('click', showinfo);
