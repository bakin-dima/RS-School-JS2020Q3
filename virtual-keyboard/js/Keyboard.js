import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js'; //? { en , ru }
import Key from './Key.js';

const languageKeyboard = document.querySelector('html');
console.log(languageKeyboard.lang);
const main = create('main', '');

export default class Keyboard {
    constructor(keyboardTemplate) {
        this.keyboardTemplate = keyboardTemplate;
        this.keysPressed = {};
        this.isCaps = false;
    }

    init(langCode) {
        this.keyBase = language[langCode];
        this.audioList = ['boom','clap','hihat','kick','openhat','boom','ride','snare','tink','tom'];
        this.output = create('textarea','output', null , main, 
            ['placeholder', 'Enter text'],
            ['rows', 5],
            ['cols', 50],
            ['spellcheck', false],
            ['autocorrect', 'off']);
        this.keyboadAdder = create('div','keyboard__adder keyboard_hide', '<i class="material-icons">keyboard</i>', main);
        this.container = create('div','keyboard', null , main , ['language', langCode]);
        this.audioElements = [];
        this.audioList.forEach((elem) => {
            const audioElem = create('audio', '', null, main, ['src',`./sound/${elem}.wav`], ['name',`${elem}`])
            this.audioElements.push(audioElem);
        });
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
        this.container.addEventListener('mousedown', this.preHandleEvent);
        this.container.addEventListener('mouseup', this.preHandleEvent);
        this.keyboadAdder.addEventListener('click', this.keyboadAdd);
        this.output.addEventListener('click', this.keyboadAdd);
    }

    keyboadAdd = () => {
        this.container.classList.remove('keyboard_hide');
        this.keyboadAdder.classList.add('keyboard_hide');
    }

    preHandleEvent = (e) => {
        e.stopPropagation();
        const keyDiv = e.target.closest('.keyboard__key');
        if (!keyDiv) return;
        const { dataset: { code } } = keyDiv;
        keyDiv.addEventListener('mouseleave', this.resetButtonState);
        this.handleEvent({code, type: e.type});
    };

    resetButtonState = ({ target: { dataset: {code} } }) => {
        const keyObj = this.keyButtons.find((key) => key.code === code);
        if (!code.match(/Mute|Caps|Shift/)){
            keyObj.div.classList.remove('active');
        }
        keyObj.div.removeEventListener('mouseleave', this.resetButtonState);
    }

    handleEvent = (e) => {
        if (e.stopPropagation) e.stopPropagation(); //! Отключения обрабоки клика
        const { code, type } = e;
        const keyObj = this.keyButtons.find((key) => key.code === code);
        const audio = this.audioElements;
        if (!audio || !keyObj) return;
        this.output.focus();


        if (type.match(/keydown|mousedown/)){
            if (type.match(/key/)) e.preventDefault(); //! Отключение стандартного поведения клавиатуры
            
            if(code.match(/Shift/)) this.shiftKey = true;

            if(this.shiftKey) this.switchUpperCase(true);

            //! Keyboard Hide
            if(code.match(/Done/)) {
                this.container.classList.add('keyboard_hide');
                this.keyboadAdder.classList.remove('keyboard_hide');   
            }

            //? SWITCH LANGUAGE
            if (code.match(/Lang/)) this.switchLanguage();
            

            keyObj.div.classList.add('active');

            //? Caps Lock switcher;
            if (code.match(/Caps/) && !this.isCaps) {
                this.isCaps = true;
                this.switchUpperCase(true);
            } else if (code.match(/Caps/) && this.isCaps) {
                this.isCaps = false;
                this.switchUpperCase(false);
                keyObj.div.classList.remove('active');
            }

            //? Mute Switcher;
            if (code.match(/Mute/) && !this.isMute) {
                this.isMute = true;
            } else if (code.match(/Mute/) && this.isMute) {
                this.isMute = false;
                keyObj.div.classList.remove('active');
            }

            if (!this.isMute) {
                if (this.container.dataset.language === 'ru' && !keyObj.isFnKey) {
                    audio[0].currentTime = 0;
                    audio[0].play();
                }
                if (this.container.dataset.language === 'en' && !keyObj.isFnKey) {
                    audio[5].currentTime = 0;
                    audio[5].play();
                }
                if (code.match(/Control|Arrow|Alt|Tab|Win|Lang|Done|Voice/)) {
                    audio[7].currentTime = 0;
                    audio[7].play();
                }
                if (code.match(/Enter/)) {
                    audio[2].currentTime = 0;
                    audio[2].play();
                }
                if (code.match(/Shift/)) {
                    audio[3].currentTime = 0;
                    audio[3].play();
                }
                if (code.match(/Caps/)) {
                    audio[4].currentTime = 0;
                    audio[4].play();
                }
                if (code.match(/Backspace/)) {
                    audio[1].currentTime = 0;
                    audio[1].play();
                }
            }
           
            if(!this.isCaps) {
                this.printToOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
            } else if (this.isCaps){
                if (this.shiftKey){
                    this.printToOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
                } else {
                    this.printToOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
                }
            }
        //? Отпускаем кнопку
        } else if (type.match(/keyup|mouseup/)){
            
            if(!code.match(/Shift/) && type.match(/mouseup/)) {
                this.shiftKey = false;
                this.switchUpperCase(false);
                document.querySelector('[data-code="ShiftLeft"]').classList.remove('active');
            } else if (code.match(/Shift/) && type.match(/keyup/)) {
                this.shiftKey = false;
                this.switchUpperCase(false);
                document.querySelector('[data-code="ShiftLeft"]').classList.remove('active');
            }

            if (!code.match(/Caps|Mute|Shift/)) keyObj.div.classList.remove('active');
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
            if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
                button.sub.innerHTML = keyObj.shift;
            } else {
                button.sub.innerHTML = '';
            }
            button.letter.innerHTML = keyObj.small;            
        });

        if (this.isCaps) this.switchUpperCase(true);
         if (this.container.dataset.language === 'en') languageKeyboard.lang = 'en-US'; 
         if (this.container.dataset.language === 'ru') languageKeyboard.lang = 'ru-RU';
    }

    switchUpperCase(isUpperCase) {
        if (isUpperCase) {
            this.keyButtons.forEach((button) => {
                if (button.sub) {
                    if (this.shiftKey) {
                        button.sub.classList.add('sub-active');
                        button.letter.classList.add('sub-inactive');
                    }
                }
            if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
                button.letter.innerHTML = button.shift;
            } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
                button.letter.innerHTML = button.small;
            } else if (!button.isFnKey  && !button.sub.innerHTML) {
                button.letter.innerHTML = button.shift;
            }
            });
        } else {
            this.keyButtons.forEach((button) => {
                if(button.sub.innerHTML && !button.isFnKey) {
                    button.sub.classList.remove('sub-active');
                    button.letter.classList.remove('sub-inactive');

                    if (!this.isCaps) {
                        button.letter.innerHTML = button.small;
                    } else if (!this.isCaps) { // ! ??????????????
                        button.letter.innerHTML = button.shift;
                    }
                } else if (!button.isFnKey) {
                    if (this.isCaps) {
                        button.letter.innerHTML = button.shift;
                    } else {
                        button.letter.innerHTML = button.small;
                    }
                }
            });
        }

    }
   
    printToOutput(keyObj, symbol) {
        let cursorPosition = this.output.selectionStart;
        const left = this.output.value.slice(0, cursorPosition);
        const right = this.output.value.slice(cursorPosition);

        const fnButtonsHandler = {
            Tab: () => {
                this.output.value = `${left}\t${right}`;
                cursorPosition +=1;
            },
            ArrowLeft: () => {
                cursorPosition = cursorPosition - 1 >= 0 ? cursorPosition -1 : 0;
            },
            ArrowRight: () => {
                cursorPosition += 1;
            },
            ArrowUp: () => {
                const positionFromLeft = this.output.value.slice(0, cursorPosition).match(/(\n).*$(?!\1)/g) || [[1]];
                cursorPosition -= positionFromLeft[0].length;
            },
            ArrowDown: () => {
                const positionFromLeft = this.output.value.slice(0, cursorPosition).match(/^.*(\n).*$(?!\1)/g) || [[1]];
                cursorPosition += positionFromLeft[0].length;
            },
            Enter: () => {
                this.output.value = `${left}\n${right}`;
                cursorPosition +=1;
            },
            Backspace: () => {
                this.output.value = `${left.slice(0,-1)}${right}`;
                cursorPosition -=1;

            },
            Space: () => {
                this.output.value = `${left} ${right}`;
                cursorPosition +=1;
            },
        }

        if (fnButtonsHandler[keyObj.code]) fnButtonsHandler[keyObj.code]();
        else if (!keyObj.isFnKey) {
            cursorPosition +=1;
            this.output.value = `${left}${symbol || ''}${right}`;
        }
        this.output.setSelectionRange(cursorPosition, cursorPosition);
    }
}