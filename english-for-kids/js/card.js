import create from './utils/create';

export default class card {
  constructor({ en, ru, image, sound }) {
    this.en = en;
    this.ru = ru;
    this.image = image;
    this.sound = sound;
    this.enTitle = create('div', 'en__title', this.en);
    this.ruTitle = create('div', 'ru__title', this.ru);
  }
}
