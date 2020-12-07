/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import '../sass/style.scss';
import './images';
import create from './utils/create';
import links from './utils/links';
import clear from './utils/clear';
import generateStatistic from './utils/generateStatistic';
import footer from './layouts/footer';
import categories from './data/categories';
import * as storage from './storage';

let statistic = [];
let gameElements = [];
let mistakesCount = 0;

generateStatistic(categories, statistic);

if (storage.get('statistic')) {
  statistic = storage.get('statistic');
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

function generateCards({ content }) {
  clear(cardsContainer);
  clear(gameAnswers);
  mistakesCount = 0;
  gameElements = [];
  startGameBtn.innerHTML = 'START';
  startGameBtn.disabled = false;
  for (let i = 0; i < content.length; i += 1) {
    gameElements.push(content[i].en);
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

const menuLinksCreate = () => {
  const menuItems = [];
  const menu = create('nav', 'menu', '', header.firstChild);
  const menuList = create('ul', 'menu__list', '', menu);
  create(
    'li',
    'menu__item menu__item_main',
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
    const menuItem = create('li', 'menu__item', '', menuList, [
      'category',
      `${categories[i].title}`,
    ]);
    create(
      'a',
      'menu__link',
      `<img src="./assets/categories/${categories[i].title}.png" class="menu__image"/> ${categories[i].title}`,
      menuItem,
      ['href', `#${categories[i].title}/`],
    );
    menuItems.push(menuItem);
    menuItem.addEventListener('click', () => {
      menuItems.forEach((el) => el.classList.remove('menu__item_active'));
      menuItem.classList.add('menu__item_active');
      generateCards(categories[i]);
    });
  }
  return menu;
};

const menu = menuLinksCreate();

const setActiveLink = (clickedCategory) => {
  const category = clickedCategory;
  const element = document.querySelector(`[data-category="${category}"]`);
  const mainMenu = document.querySelector('.menu__item_main');
  mainMenu.classList.remove('menu__item_active');
  element.classList.add('menu__item_active');
};

function cardsCreate() {
  for (let i = 0; i < categories.length; i += 1) {
    const card = create(
      'a',
      'card',
      '',
      cardsContainer,
      ['href', `#${categories[i].title}/`],
      ['category', `${categories[i].title}`],
    );
    const cardFront = create('div', 'card__categories', '', card);
    const cardImageContainer = create('div', 'card__image', '', cardFront);
    create('img', '', '', cardImageContainer, ['src', links.categoryImageSrc(categories[i].title)]);
    create('div', 'card__title', `${categories[i].title}`, cardFront);
    create('span', 'card__items', `${categories[i].content.length}`, cardFront);

    card.addEventListener('click', () => {
      generateCards(categories[i]);
      setActiveLink(categories[i].title);
    });
  }
}

cardsCreate();

function showMenu() {
  menu.classList.toggle('menu__switcher');
  menuBtn.classList.toggle('menu__btn__switcher');
}

const statisticUpdate = (cardName, field) => {
  statistic.forEach((el) => {
    if (el.en === cardName) {
      switch (field) {
        case 'mistake':
          el.mistakesCount += 1;
          break;
        case 'correct':
          el.correctCount += 1;
          break;
        default:
          el.trainCount += 1;
          break;
      }
      if (el.correctCount + el.mistakesCount !== 0) {
        el.coef = Math.floor((el.correctCount / (el.correctCount + el.mistakesCount)) * 100);
      }
    }
  });
  storage.set('statistic', statistic);
};

function showinfo() {
  info.classList.toggle('info__switcher');
  infoBtn.classList.toggle('info__btn__switcher');
  clear(info);
  const clearBtn = create('button', 'btn clear__btn', 'CLEAR', info);
  clearBtn.addEventListener('click', () => {
    statistic = [];
    generateStatistic(categories, statistic);
    storage.del('statistic');
    info.classList.toggle('info__switcher');
    infoBtn.classList.toggle('info__btn__switcher');
  });
  const sortContainer = create(
    'div',
    'statistic__sort',
    [
      create(
        'div',
        'sort__name',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'name-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'name-down']),
        ],
        '',
      ),
      create(
        'div',
        'sort__eng',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'eng-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'eng-down']),
        ],
        '',
      ),
      create(
        'div',
        'sort__rus',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'rus-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'rus-down']),
        ],
        '',
      ),
      create(
        'div',
        'sort__train',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'train-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'train-down']),
        ],
        '',
      ),
      create(
        'div',
        'sort__mistakes',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'mistake-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'mistake-down']),
        ],
        '',
      ),
      create(
        'div',
        'sort__correct',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'correct-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'correct-down']),
        ],
        '',
      ),
      create(
        'div',
        'sort__correct',
        [
          create('div', 'sort sort__up', '', '', ['sort', 'coef-up']),
          create('div', 'sort sort__down', '', '', ['sort', 'coef-down']),
        ],
        '',
      ),
    ],
    info,
  );
  const statistisContainer = create('div', 'statistic__container', '', info);
  clear(statistisContainer);
  const renderStatistic = () => {
    const category = create('div', 'statistic__category', '', statistisContainer);
    create(
      'div',
      'statistic__fields',
      [
        create('div', 'statistic__name', 'Category', ''),
        create('div', 'statistic__eng', 'English', ''),
        create('div', 'statistic__rus', 'Русский', ''),
        create('div', 'statistic__train', 'T', ''),
        create('div', 'statistic__mistakes', '-', ''),
        create('div', 'statistic__correct', '+', ''),
        create('div', 'statistic__correct', '%', ''),
      ],
      category,
    );
    statistic.forEach((statisticElement) => {
      create(
        'div',
        'statistic__item',
        [
          create('div', 'statistic__name', `${statisticElement.categoryName}`, ''),
          create('div', 'statistic__eng', `${statisticElement.en}`, ''),
          create('div', 'statistic__rus', `${statisticElement.ru}`, ''),
          create('div', 'statistic__train', `${statisticElement.trainCount}`, ''),
          create('div', 'statistic__mistakes', `${statisticElement.mistakesCount}`, ''),
          create('div', 'statistic__correct', `${statisticElement.correctCount}`, ''),
          create('div', 'statistic__coef', `${statisticElement.coef}%`, ''),
        ],
        category,
      );
    });
  };
  renderStatistic();
  sortContainer.addEventListener('click', (event) => {
    const targ = event.target.closest('.sort');
    if (targ) {
      const sortElement = targ.getAttribute('data-sort');
      const statisticSort = (item) => {
        clear(statistisContainer);
        statistic = storage.get('statistic');
        statistic.sort((prev, next) => {
          switch (item) {
            case 'name-up':
              if (prev.categoryName < next.categoryName) return -1;
              if (prev.categoryName < next.categoryName) return 1;
              break;
            case 'name-down':
              if (prev.categoryName > next.categoryName) return -1;
              if (prev.categoryName > next.categoryName) return 1;
              break;
            case 'eng-up':
              if (prev.en < next.en) return -1;
              if (prev.en < next.en) return 1;
              break;
            case 'eng-down':
              if (prev.en > next.en) return -1;
              if (prev.en > next.en) return 1;
              break;
            case 'rus-up':
              if (prev.ru < next.ru) return -1;
              if (prev.ru < next.ru) return 1;
              break;
            case 'rus-down':
              if (prev.ru > next.ru) return -1;
              if (prev.ru > next.ru) return 1;
              break;
            case 'train-up':
              if (prev.trainCount < next.trainCount) return -1;
              if (prev.trainCount < next.trainCount) return 1;
              break;
            case 'train-down':
              if (prev.trainCount > next.trainCount) return -1;
              if (prev.trainCount > next.trainCount) return 1;
              break;
            case 'correct-up':
              if (prev.correctCount < next.correctCount) return -1;
              if (prev.correctCount < next.correctCount) return 1;
              break;
            case 'correct-down':
              if (prev.correctCount > next.correctCount) return -1;
              if (prev.correctCount > next.correctCount) return 1;
              break;
            case 'mistake-up':
              if (prev.mistakesCount < next.mistakesCount) return -1;
              if (prev.mistakesCount < next.mistakesCount) return 1;
              break;
            case 'mistake-down':
              if (prev.mistakesCount > next.mistakesCount) return -1;
              if (prev.mistakesCount > next.mistakesCount) return 1;
              break;
            case 'coef-up':
              if (prev.coef < next.coef) return -1;
              if (prev.coef < next.coef) return 1;
              break;
            case 'coef-down':
              if (prev.coef > next.coef) return -1;
              if (prev.coef > next.coef) return 1;
              break;

            default:
              break;
          }
        });
      };
      statisticSort(sortElement);
      renderStatistic();
    }
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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    playMessageSound(links.failSound);
    gameOverlay.gameOverlayImage.src = links.staticImageSrc('game_win');
    gameOverlay.gameOverlayTitle.innerHTML = 'Good Job!';
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  gameOverlay.gameOverlayContainer.classList.add('game__overlay_active');
};

const playGame = () => {
  if (gameElements.length === 0) {
    gameOverlayShow();
    return;
  }
  gameElements.sort(() => Math.random() * 2 - 1);
  cardSound.src = links.soundSrc(gameElements[gameElements.length - 1]);
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
    const cardName = targ.getAttribute('data-card');
    if (!switchElement.switchBtn.checked) {
      playSound(targ);
      statisticUpdate(cardName);
    }
    if (switchElement.switchBtn.checked && startGameBtn.innerHTML === 'REPEAT') {
      if (targ.getAttribute('data-card') === gameElements[gameElements.length - 1]) {
        targ.classList.add('game__true');
        gameAnswers.prepend(create('div', 'answer__true', '', ''));
        playMessageSound(links.correctSound);
        statisticUpdate(cardName, 'correct');
        gameElements.pop();
        playGame();
      } else {
        gameAnswers.prepend(create('div', 'answer__false', '', ''));
        statisticUpdate(gameElements[gameElements.length - 1], 'mistake');
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
