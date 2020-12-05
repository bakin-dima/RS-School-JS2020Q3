/**
 * @param {string} fileName
 */

export default {
  soundSrc: (fileName) => `./assets/sounds/${fileName}.mp3`,
  cardImageSrc: (fileName) => `./assets/cards/${fileName}.png`,
  categoryImageSrc: (fileName) => `./assets/categories/${fileName}.png`,
  staticImageSrc: (fileName) => `./assets/static/${fileName}.png`,
  correctSound: './assets/sounds/correctSound.mp3',
  mistakeSound: './assets/sounds/mistakeSound.mp3',
  winnerSound: './assets/sounds/winnerSound.mp3',
  failSound: './assets/sounds/failSound.mp3',
};
