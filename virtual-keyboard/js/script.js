import { get } from  './storage.js';
import Keyboard from './Keyboard.js';

const keyboardTemplate = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Mute'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
    ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'Voice'],
    ['ControlLeft', 'Win', 'AltLeft', 'Space', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Done'],
];
const keyboardLang = get('kbLang', '"ru"');

//* Keyboard Intialize
new Keyboard(keyboardTemplate).init(keyboardLang).generateLayout();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const words = document.querySelector(".output");
const start = document.querySelector('[data-code="Voice"]');

let rec = new SpeechRecognition();
rec.interimResults = true;

start.addEventListener("click", function() {
    this.classList.toggle('on');
    (this.classList.contains('on')) ? rec.start() : rec.stop();
});

rec.addEventListener("result", function(e) {
    let text = Array.from(e.results)
    .map(result => result[0]).map(result => result.transcript).join('');
    if(e.results[0].isFinal) {
        words.setRangeText(text, words.selectionStart, words.selectionEnd, "end");
        words.setRangeText(' ', words.selectionStart, words.selectionEnd, "end" );
    }
});

rec.addEventListener("end", function(e) {
    (start.classList.contains('on')) ? rec.start() : rec.stop();
})


