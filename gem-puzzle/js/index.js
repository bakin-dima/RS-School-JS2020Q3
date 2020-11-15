/* eslint-disable import/extensions */
import create from './utils/create.js';
import getRandomColor from './utils/randomColor.js';

const main = create('main', '');
document.body.prepend(main);

const createIcon = (icon) => `<i class="material-icons">${icon}</i>`;

const overlay = create('div', 'overlay', '', main);
const overlayContent = create('div', 'overlay__content', '', overlay);
const overlayTitle = create('div', 'overlay__title', '', overlayContent);
const overlayInfo = create('div', 'overlay__info', 'info', overlayTitle);
const overlayClose = create('div', 'overlay__close', createIcon('close'), overlayTitle);
const overlaySubtitle = create('div', 'overlay__subtitle', 'subtitle', overlayContent);
const overlayWinners = create('div', 'overlay__winners', '', overlayContent);

// Create DOM elements
const wrapper = create('div', 'wrapper', '', main); //
const gameElements = create('div', 'game__elements', '', wrapper);
const timer = create('div', 'timer', create('span', 'timer__icon', createIcon('alarm')), gameElements);
const timerValue = create('span', 'timer__value', '00:00', timer);
const steps = create('div', 'steps', create('span', 'steps__icon', createIcon('insights')), gameElements);
const stepsValue = create('span', 'steps__value', '0', steps);
const menu = create('div', 'menu', '', wrapper);
const field = create('div', 'field', '', wrapper);

// Create Audio
const sound = create('audio', 'moveSound', create('source', '', '', '', ['src', './sound/sound.mp3']), main, ['id', 'sound']);

const parent = menu; // Parent el for buttons;
// Create form
const sizeSelector = create('input', '', '', parent,
  ['type', 'range'],
  ['id', 'sizeSelector'],
  ['min', '3'],
  ['max', '8'],
  ['step', '1']);
sizeSelector.value = 4;

// Create buttons
const saveBtn = create('button', 'save__btn btn', createIcon('cloud_upload'), parent);
const loadBtn = create('button', 'load__btn btn', createIcon('cloud_download'), parent);
const pauseBtn = create('button', 'pause__btn btn', createIcon('pause'), parent);
const resumeBtn = create('button', 'resume__btn btn', createIcon('play_arrow'), parent);
const restartBtn = create('button', 'restart__btn btn', createIcon('replay'), parent);
const autofinishBtn = create('button', 'autofinish__btn btn', createIcon('emoji_objects'), parent);
const muteBtn = create('button', 'mute__btn btn', createIcon('volume_up'), parent);
const winnersBtn = create('button', 'winners__btn btn', createIcon('emoji_events'), parent);

// Parametrs for game
let fieldSize = sizeSelector.value ** 2;
const windowSize = 600;
const diff = 20; // games difficulty
let cellSize = windowSize / sizeSelector.value;
let randImageInd = Math.floor(Math.random() * (150 - 1) + 1);
let stepCounter = 0;
let isMute = false;
let isDrag = false;
let cells = [];
let solution = [];

// Winners list
let winners;
if (JSON.parse(window.localStorage.getItem('winners'))) {
  winners = JSON.parse(window.localStorage.getItem('winners'));
} else {
  winners = [];
}

let cellEmpty;
const empty = {};

function emptyCellMove() {
  cellEmpty.style.left = `${cells[fieldSize - 1].left * cellSize}rem`;
  cellEmpty.style.top = `${cells[fieldSize - 1].top * cellSize}rem`;
}

// Overlay Hide
function overlayHide() {
  overlayContent.classList.remove('overlay__show');
  setTimeout(() => {
    overlayContent.classList.add('overlay__hide');
  }, 0);
  setTimeout(() => {
    overlay.style.display = 'none';
    overlayWinners.style.display = 'none';
  }, 300);
}

// Overlay function
function overlayShow(type, message) {
  overlay.style.display = 'flex';
  overlayContent.classList.remove('overlay__hide');
  overlayContent.classList.add('overlay__show');
  if (type === 'error') {
    overlayTitle.style.background = '#ff3b30';
    overlayInfo.innerHTML = '<i class="material-icons">warning</i>';
    overlaySubtitle.textContent = message;
    setTimeout(overlayHide, 1500);
  }
  if (type === 'success') {
    overlayTitle.style.background = '#4cd964';
    overlayInfo.innerHTML = '<i class="material-icons">check</i>';
    overlaySubtitle.textContent = message;
    setTimeout(overlayHide, 1500);
  }
  if (type === 'info') {
    overlayTitle.style.background = '#5ac8fa';
    overlayInfo.innerHTML = '<i class="material-icons">announcement</i>';
    overlaySubtitle.textContent = message;
  }
  if (type === 'win') {
    overlayTitle.style.background = '#ff9500';
    overlayInfo.innerHTML = '<i class="material-icons">emoji_events</i>';
    overlaySubtitle.textContent = message;
  }
}

// Timer function's
let timerSeconds = 0;
let timerMinutes = 0;
let timerCount;

const fixTime = (n) => (n < 10 ? `0${n}` : n);

function gameTimer() {
  timerSeconds += 1;
  if (timerSeconds >= 60) {
    timerMinutes += 1;
    timerSeconds = 0;
  }
  timerValue.textContent = `${fixTime(timerMinutes)}:${fixTime(timerSeconds)}`;
}
// Timer pause
function timerPause() {
  clearInterval(timerCount);
  overlayShow('info', 'timer pause');
  setTimeout(overlayHide, 1000);
  field.style.pointerEvents = 'none';
  resumeBtn.disabled = false;
  pauseBtn.disabled = true;
  autofinishBtn.disabled = true;
}
// Timer continue
function timerResume() {
  clearInterval(timerCount);
  timerCount = setInterval(gameTimer, 1000);
  overlayShow('info', 'timer resume');
  setTimeout(overlayHide, 1100);
  field.style.pointerEvents = '';
  resumeBtn.disabled = true;
  pauseBtn.disabled = false;
  autofinishBtn.disabled = false;
}
// Timer reset
function timerReset() {
  clearInterval(timerCount);
  timerSeconds = 0;
  timerMinutes = 0;
  timerCount = setInterval(gameTimer, 1000);
}

// Winners render
function winnersRender() {
  while (overlayWinners.children.length) {
    overlayWinners.removeChild(overlayWinners.lastChild);
  }
  for (let i = 0; i < winners.length && i < 10; i += 1) {
    overlayWinners.append(create('p', '', `Game: ${winners.length - i} time: ${fixTime(winners[i].mins)}:${fixTime(winners[i].seconds)} steps: ${winners[i].steps}`));
  }
  overlayWinners.style.display = 'flex';
}

// Button switch fucntion
function buttonState(sizeB = false, saveB = false, loadB = false, pauseB = false,
  resumeB = false, restartB = false, autoB = false, winB = false) {
  sizeSelector.disabled = sizeB;
  saveBtn.disabled = saveB;
  loadBtn.disabled = loadB;
  pauseBtn.disabled = pauseB;
  resumeBtn.disabled = resumeB;
  restartBtn.disabled = restartB;
  autofinishBtn.disabled = autoB;
  winnersBtn.disabled = winB;
}

// Move function
const move = function cellsMove(index, param) {
  const cell = cells[index];
  const leftDifferent = Math.abs(empty.left - cell.left);
  const topDifferent = Math.abs(empty.top - cell.top);

  if (param !== 'solution') {
    if (leftDifferent + topDifferent > 1) {
      return;
    }
    stepCounter += 1;
    solution.unshift(index);
  }

  stepsValue.textContent = stepCounter;

  cell.element.style.left = `${empty.left * cellSize}rem`;
  cell.element.style.top = `${empty.top * cellSize}rem`;
  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = cell.left;
  cellEmpty.left = cell.left;
  empty.top = cell.top;
  cellEmpty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;
  emptyCellMove();

  if (param !== 'random') {
    const isFinish = cells.every((el) => el.value === el.top * Math.sqrt(fieldSize) + el.left + 1);

    if (isFinish && param !== 'solution') {
      cellEmpty.style.opacity = '1';
      field.style.pointerEvents = 'none';
      solution = [];
      winners.unshift({
        steps: stepCounter,
        mins: timerMinutes,
        seconds: timerSeconds,
      });
      window.localStorage.setItem('winners', JSON.stringify(winners));
      winnersRender();
      overlayShow('win', `You Win! time: ${fixTime(timerMinutes)}:${fixTime(timerSeconds)} steps: ${stepCounter}`);
    }
    if (isFinish && param === 'solution') {
      cellEmpty.style.opacity = '1';
      field.style.pointerEvents = 'none';
      overlayShow('success', 'Auto solution finish');
    }
  }

  if (param !== 'random' && !isMute) {
    sound.currentTime = 0;
    sound.play();
  }
};

// Start game
const startGame = function start() {
  const numbers = [...Array(fieldSize - 1).keys()];
  randImageInd = Math.floor(Math.random() * (150 - 1) + 1);
  field.style.pointerEvents = '';
  cellEmpty = create('div', 'cell__empty', '', '');

  for (let i = 0; i < fieldSize - 1; i += 1) {
    const value = numbers[i] + 1;
    const cell = create('div', 'cell', `${value}`, '', ['draggable', 'true']);
    const left = i % Math.sqrt(fieldSize);
    const top = (i - left) / Math.sqrt(fieldSize);

    cells.push({
      value,
      left,
      top,
      element: cell,
      width: `${cellSize}rem`,
      height: `${cellSize}rem`,
      background: `url('./assets/images/${randImageInd}.jpg') no-repeat ${getRandomColor()}`,
      posX: `${-(left * Math.sqrt(fieldSize) * cellSize) / Math.sqrt(fieldSize)}rem`,
      posY: `${-(top * Math.sqrt(fieldSize) * cellSize) / Math.sqrt(fieldSize)}rem`,
    });

    cell.addEventListener('click', () => {
      move(i);
    });

    const dragStart = function startDrag() {
      setTimeout(() => {
        cell.style.display = 'none';
      }, 0);
    };

    //! Fix later
    // eslint-disable-next-line no-loop-func
    const dragEnd = function endDrag() {
      cell.style.display = 'flex';
      if (isDrag) move(i);
    };

    cell.addEventListener('dragstart', dragStart);
    cell.addEventListener('dragend', dragEnd);
  }
  cells.push(empty);
  empty.value = fieldSize;
  empty.element = cellEmpty;
  empty.top = Math.sqrt(fieldSize) - 1;
  empty.left = Math.sqrt(fieldSize) - 1;
  empty.width = `${cellSize}rem`;
  empty.height = `${cellSize}rem`;
  empty.background = `url('./assets/images/${randImageInd}.jpg') no-repeat`;
  empty.posX = `${-(cells[fieldSize - 1].left * Math.sqrt(fieldSize) * cellSize) / Math.sqrt(fieldSize)}rem`;
  empty.posY = `${-(cells[fieldSize - 1].top * Math.sqrt(fieldSize) * cellSize) / Math.sqrt(fieldSize)}rem`;

  cellEmpty.addEventListener('dragenter', () => {
    cellEmpty.style.border = '2px dotted #f9f6ef';
    isDrag = true;
  });
  cellEmpty.addEventListener('dragleave', () => {
    setTimeout(() => {
      cellEmpty.style.border = 'none';
      isDrag = false;
    }, 600);
  });
};

// isMute function
const mute = () => {
  if (!isMute) {
    isMute = true;
    muteBtn.innerHTML = createIcon('volume_off');
    setTimeout(overlayShow('info', 'volume off'), 400);
    setTimeout(overlayHide, 1000);
  } else {
    isMute = false;
    muteBtn.innerHTML = createIcon('volume_up');
    setTimeout(overlayShow('info', 'volume on'), 400);
    setTimeout(overlayHide, 1000);
  }
};

// Game random function
function randomGame(count) {
  for (let i = 0; i < count; i += 1) {
    const moveItem = Math.floor(Math.random() * (fieldSize - 1));
    move(moveItem, 'random');
  }
}

// Game render function
const gameRender = () => {
  field.style.width = `${Math.sqrt(fieldSize) * cellSize}rem`;
  field.style.height = `${Math.sqrt(fieldSize) * cellSize}rem`;
  cellEmpty.style.opacity = '0';

  cells.forEach((el) => {
    const { left } = el;
    const { top } = el;
    const { element } = el;
    const { width } = el;
    const { background } = el;
    const { height } = el;
    const { posX } = el;
    const { posY } = el;

    element.style.width = width;
    element.style.height = height;
    element.style.backgroundColor = getRandomColor();
    element.style.left = `${left * cellSize}rem`;
    element.style.top = `${top * cellSize}rem`;
    element.style.background = background;
    element.style.backgroundSize = `${Math.sqrt(fieldSize) * cellSize}rem ${Math.sqrt(fieldSize) * cellSize}rem`;
    element.style.backgroundPositionX = posX;
    element.style.backgroundPositionY = posY;
    field.append(el.element);
  });
};

// Restart game
function resetGame() {
  while (field.children.length) {
    field.removeChild(field.lastChild);
  }
  cellSize = windowSize / sizeSelector.value;
  fieldSize = sizeSelector.value ** 2;
  cells = [];
  solution = [];
  startGame();
  gameRender();
  randomGame(fieldSize * diff); // Diff set count of random iteration
  timerReset();
  buttonState();
  stepCounter = 0;
  stepsValue.textContent = stepCounter;
  timerValue.textContent = `${fixTime(timerMinutes)}:${fixTime(timerSeconds)}`;
  resumeBtn.disabled = true;
}

function changeSize() {
  fieldSize = sizeSelector.value ** 2;
  resetGame();
  setTimeout(overlayShow('info', `Set game to ${sizeSelector.value}x${sizeSelector.value}`), 500);
  setTimeout(overlayHide, 1100);
}

// Optimize solution function
function deleteDouble(solutionList) {
  for (let i = solutionList.length - 1; i > 0; i -= 1) {
    if (solutionList[i] === solutionList[i - 1]) {
      solutionList.splice(i - 1, 2);
      i -= 1;
    }
  }
}

// Auto solution function
function autoSolution() {
  for (let i = 0; i < 10; i += 1) deleteDouble(solution);
  if (solution.length > 1) {
    let solutionSteps = solution.length;
    overlayShow('info', 'Auto solution start');
    setTimeout(overlayHide, 1000);
    autofinishBtn.classList.add('btn__blink');
    buttonState(true, true, true, true, true, true, true, true);
    let ind = 0;
    const myLoop = function loop() {
      setTimeout(() => {
        move(solution[ind], 'solution');
        solutionSteps -= 1;
        stepsValue.textContent = solutionSteps;
        ind += 1;
        if (ind < solution.length) {
          myLoop();
        }
        if (ind === solution.length) {
          clearInterval(timerCount);
          solution = [];
          autofinishBtn.classList.remove('btn__blink');
          buttonState();
          pauseBtn.disabled = true;
          resumeBtn.disabled = true;
        }
      }, 200);
    };
    myLoop();
  } else {
    overlayShow('error', 'Nothing to move, start a game');
    setTimeout(overlayHide, 1500);
  }
}

function saveGame() {
  if (solution.length === 0) {
    overlayShow('error', 'Error: Game is finished, nothing to save');
    return;
  }
  overlayShow('success', `Game saved time: ${fixTime(timerMinutes)}:${fixTime(timerSeconds)} steps: ${stepCounter}`);
  const solutionStr = solution.toString();
  window.localStorage.setItem('solution', JSON.stringify(solutionStr));
  window.localStorage.setItem('cells', JSON.stringify(cells));
  window.localStorage.setItem('fieldSize', JSON.stringify(fieldSize));
  window.localStorage.setItem('timerSeconds', JSON.stringify(timerSeconds));
  window.localStorage.setItem('timerMinutes', JSON.stringify(timerMinutes));
  window.localStorage.setItem('stepCounter', JSON.stringify(stepCounter));
  window.localStorage.setItem('randImageInd', JSON.stringify(randImageInd));
  window.localStorage.setItem('cellSize', JSON.stringify(cellSize));
}

function loadGame() {
  // Load solution
  const solutionLoadStr = JSON.parse(window.localStorage.getItem('solution'));
  if (!solutionLoadStr) {
    overlayShow('error', 'Error: no save found');
    return;
  }
  const solutionLoadArr = solutionLoadStr.split(',');
  solution = solutionLoadArr.map((element) => element * 1);

  // Load elements
  fieldSize = JSON.parse(window.localStorage.getItem('fieldSize')) * 1;
  cellSize = JSON.parse(window.localStorage.getItem('cellSize')) * 1;
  timerSeconds = JSON.parse(window.localStorage.getItem('timerSeconds')) * 1;
  timerMinutes = JSON.parse(window.localStorage.getItem('timerMinutes')) * 1;
  stepCounter = JSON.parse(window.localStorage.getItem('stepCounter')) * 1;
  randImageInd = JSON.parse(window.localStorage.getItem('randImageInd')) * 1;

  stepsValue.textContent = stepCounter;
  sizeSelector.value = Math.sqrt(fieldSize);

  field.style.width = `${Math.sqrt(fieldSize) * cellSize}rem`;
  field.style.height = `${Math.sqrt(fieldSize) * cellSize}rem`;
  clearInterval(timerCount);
  timerCount = setInterval(gameTimer, 1000);

  // Load cells
  const cellsLoad = JSON.parse(window.localStorage.getItem('cells'));

  // Render from load
  buttonState(); // turn on all buttons
  field.style.pointerEvents = '';

  while (field.children.length) {
    field.removeChild(field.lastChild);
  }

  cellEmpty = create('div', 'cell__empty', '', '');
  cells = [];
  for (let i = 0; i < fieldSize - 1; i += 1) {
    const { value } = cellsLoad[i];
    const { top } = cellsLoad[i];
    const { left } = cellsLoad[i];
    const { background } = cellsLoad[i];
    const { posX } = cellsLoad[i];
    const { posY } = cellsLoad[i];
    const { width } = cellsLoad[i];
    const { height } = cellsLoad[i];
    const cell = create('div', 'cell', `${value}`, '', ['draggable', 'true']);
    cells.push({
      value,
      left,
      top,
      element: cell,
      posX,
      posY,
      background,
      width,
      height,
    });
    cell.addEventListener('click', () => {
      move(i);
    });
    const dragStart = function startDrag() {
      setTimeout(() => {
        cell.style.display = 'none';
      }, 0);
    };

    //! Fix later
    // eslint-disable-next-line no-loop-func
    const dragEnd = function endDrag() {
      cell.style.display = 'flex';
      if (isDrag) move(i);
    };

    cell.addEventListener('dragstart', dragStart);
    cell.addEventListener('dragend', dragEnd);
  }
  cells.push(empty);
  empty.value = fieldSize;
  empty.element = cellEmpty;
  empty.width = cellsLoad[fieldSize - 1].width;
  empty.height = cellsLoad[fieldSize - 1].height;
  empty.top = cellsLoad[fieldSize - 1].top;
  empty.left = cellsLoad[fieldSize - 1].left;
  empty.posX = cellsLoad[fieldSize - 1].posX;
  empty.posY = cellsLoad[fieldSize - 1].posY;
  empty.background = cellsLoad[fieldSize - 1].background;
  gameRender();
  cellEmpty.addEventListener('dragenter', () => {
    cellEmpty.style.border = '2px dotted #f9f6ef';
    isDrag = true;
  });
  cellEmpty.addEventListener('dragleave', () => {
    setTimeout(() => {
      cellEmpty.style.border = 'none';
      isDrag = false;
    }, 600);
  });
  overlayShow('success', `Game loaded time ${fixTime(timerMinutes)}:${fixTime(timerSeconds)} steps ${stepCounter}`);
}

resetGame();
sizeSelector.addEventListener('change', changeSize);
overlayClose.addEventListener('click', overlayHide);
saveBtn.addEventListener('click', saveGame);
loadBtn.addEventListener('click', loadGame);
pauseBtn.addEventListener('click', timerPause);
resumeBtn.addEventListener('click', timerResume);
restartBtn.addEventListener('click', resetGame);
autofinishBtn.addEventListener('click', autoSolution);
muteBtn.addEventListener('click', mute);
winnersBtn.addEventListener('click', () => {
  overlayShow('info', 'Last 10 winners, no auto solution');
  winnersRender();
});
