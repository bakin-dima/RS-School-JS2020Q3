let numbers = document.querySelectorAll(".number"),
  operations = document.querySelectorAll(".operator"),
  clearBtns = document.querySelectorAll(".clear-btn"),
  decimalBtn = document.getElementById("decimal"),
  rootBtn = document.getElementById("root"),
  invertBtn = document.getElementById("invert"),
  display = document.getElementById("display"),
  MemoryCurrentNumber = 0,
  MemoryNewNumber = false,
  MemoryPendingOperation = "";

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener("click", function (e) {
    operationPress(e.target.textContent);
  });
}

console.log(operations);

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.target.textContent);
  });
}

const numberPress = (number) => {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
};

const operationPress = (op) => {
  let localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    switch (MemoryPendingOperation) {
      case "+":
        MemoryCurrentNumber += +localOperationMemory;
        break;
      case "-":
        MemoryCurrentNumber -= +localOperationMemory;
        break;
      case "/":
        MemoryCurrentNumber /= +localOperationMemory;
        break;
      case "*":
        MemoryCurrentNumber *= +localOperationMemory;
        break;
      case "nx":
        MemoryCurrentNumber **= +localOperationMemory;
        break;
      default:
        MemoryCurrentNumber = +localOperationMemory;
    }
  }
  display.value = +MemoryCurrentNumber.toFixed(7);
  MemoryPendingOperation = op;
};

const decimal = (argument) => {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = "0.";
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    }
  }
  display.value = localDecimalMemory;
};

const root = (argument) => {
  display.value >= 0
    ? (display.value = Math.sqrt(display.value))
    : (display.value = "Can't take root");
};

const invert = (argument) => {
  display.value *= -1;
};

const clear = (id) => {
  if (id === "CE") {
    display.value = "0";
    MemoryNewNumber = true;
  } else if (id === "C") {
    display.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
  }
};

decimalBtn.addEventListener("click", decimal);
rootBtn.addEventListener("click", root);
invertBtn.addEventListener("click", invert);
