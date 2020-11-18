import create from './utils/create';

export default class card {
  constructor({ en, ru, image, sound }) {
    this.en = en;
    this.ru = ru;
    this.image = image;
    this.sound = sound;
    this.enTitle = create('span', 'en__title', this.en);
    this.ruTitle = create('span', 'ru__title', this.ru);
  }
}
