import create from './utils/create.js';

export default class Key {
    constructor({ small, shift, code }) {
        this.small = small;
        this.shift = shift;
        this.code = code;
        this.isFnKey = Boolean(small.match(/Ctrl|arr|Alt|Shift|Tab|Back|Del|Enter|Caps|Lang|keyboard_/));

        if (shift && shift.match(/[^a-zA-zа-яА-яёЁ0-9]/)) {
            this.sub = create('div', 'sub', this.shift);
        } else {
            this.sub = create('div', 'sub', '');
        }

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
          };

          switch (this.small) {
            case "backspace":
                this.letter = create('div', 'letter', createIconHTML(`${this.small}`));
                break;
            case "keyboard_capslock":
                this.letter = create('div', 'letter', createIconHTML(`${this.small}`));
                break;
            default:
                this.letter = create('div', 'letter', this.small);
                break;
          }
          this.div = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code],
          this.isFnKey ? ['fn', 'true'] : ['fn', 'false']);
    }
};