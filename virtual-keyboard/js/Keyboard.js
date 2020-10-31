import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js';
import Key from './Key.js';

const main = create('main', '');

export default class Keyboard {
    constructor(keyboardTemplate) {
        this.keyboardTemplate = keyboardTemplate;
        this.keysPressed = {};
        this.isCaps = false;
    }

    init(langCode) {
        this.keyBase = language[langCode];
        this.output = create('textarea','output', null , main, 
            ['placeholder', 'Enter text'],
            ['rows', 5],
            ['cols', 50],
            ['spellcheck', false],
            ['autocorrect', 'off']);
        this.container = create('div','keyboard', null , main , ['language', langCode]);
        document.body.prepend(main);
        return this;
    }

    generateLayout() {
        this.keyButtons = []; //! Key()
        this.keyboardTemplate.forEach((row, i) => {
            const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i+1]);
            rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
            row.forEach((code) => {
                const keyObj = this.keyBase.find((key) => key.code === code);
                if (keyObj) {
                    const keyButton = new Key(keyObj);
                    this.keyButtons.push(keyButton);
                    rowElement.appendChild(keyButton.div);
                }
            });
        });

        document.addEventListener('keydown', this.handleEvent);
        document.addEventListener('keyup', this.handleEvent);
    }

    handleEvent = (e) => {
        if (e.stopPropagation) e.stopPropagation();
    }
}