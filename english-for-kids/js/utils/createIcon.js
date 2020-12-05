/**
 * @param {string} iconName
 */

export default function createIcon(iconName) {
  const path = './assets/static/';
  return `<img src="${path}${iconName}.png"/>`;
}
