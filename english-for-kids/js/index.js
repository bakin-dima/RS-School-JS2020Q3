import '../sass/style.scss';
import * as storage from './storage';
import create from './utils/create';
import createIcon from './utils/createIcon';
import categories from './layouts/categories';

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

const menuBtn = create('button', 'btn menu__btn', createIcon('menu'), header.firstChild);
const switchBtn = create('input', 'swidth__btn', 'menu', header.firstChild, ['type', 'checkbox']);
