import { get } from  './storage.js';
import Keyboard from './Keyboard.js';

const keyboardTemplate = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Mute'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
    ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'Voice','VoiceMute'],
    ['ControlLeft', 'Win', 'AltLeft', 'Space', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Done'],
];
const keyboardLang = get('kbLang', '"ru"');

//* Keyboard Intialize
new Keyboard(keyboardTemplate).init(keyboardLang).generateLayout();


