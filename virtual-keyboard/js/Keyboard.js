import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js'; //? { en , ru }
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
        if (e.stopPropagation) e.stopPropagation(); //! Отключения обрабоки клика
        const { code, type } = e;
        const keyObj = this.keyButtons.find((key) => key.code === code);
        if (!keyObj) return;
        this.output.focus();

        if (type.match(/keydown|mousedown/)){
            if (type.match(/key/)) e.preventDefault(); //! Отключение стандартного поведения клавиатуры

            if(code.match(/Shift/)) this.shiftKey = true;

            keyObj.div.classList.add('active');

            //? SWITCH LANGUAGE
            if (code.match(/Control/)) this.ctrlKey = true;
            if (code.match(/Alt/)) this.altKey = true;

            if (code.match(/Control/) && this.altKey) this.switchLanguage();
            if (code.match(/Alt/) && this.ctrlKey) this.switchLanguage();

            
            if(!this.isCaps) {
                this.printToOutput(keyObj, this.shiftKey)
            }
        //? Отпускаем кнопку
        } else if (type.match(/keyup|mouseup/)){
            keyObj.div.classList.remove('active');

            //? SWITCH LANGUAGE
            if (code.match(/Control/)) this.ctrlKey = false;
            if (code.match(/Alt/)) this.altKey = false;
        }
    }

    switchLanguage = () => {
        const langAbbr = Object.keys(language); //? => ['en', 'ru']
        let langIndex = langAbbr.indexOf(this.container.dataset.language) //? index = 1;
        this.keyBase = langIndex + 1 < langAbbr.length ? language[langAbbr[langIndex+=1]]
            : language[langAbbr[langIndex -= langIndex]];

        this.container.dataset.language = langAbbr[langIndex];
        storage.set('kbLang',langAbbr[langIndex]);

        this.keyButtons.forEach((button) => {
            const keyObj = this.keyBase.find((key) => key.code === button.code);
            if (!keyObj) return;
            button.shift = keyObj.shift;
            button.small = keyObj.small;
            if (keyObj.shift && keyObj.shift.match(/[^a-zA-zа-яА-яёЁ0-9]/g)) {
                button.sub.innerHTML = keyObj.shift;
            } else {
                button.sub.innerHTML = '';
            }
            if (keyObj.shift !== null) button.letter.innerHTML = keyObj.small; //! BLOCK CHANGE IMAGES            
        })
    }
   
    printToOutput(keyObj, symbol) {
        console.log(symbol);
    }
}