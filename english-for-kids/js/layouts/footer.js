import create from '../utils/create';

export default create(
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
        ['src', './assets/static/github.png'],
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
        ['src', './assets/static/rsschool.svg'],
        ['alt', 'rsschool-course-link'],
      ),
      '',
      ['href', 'https://rs.school/js/'],
      ['target', '_blank'],
    ),
  ]),
);
