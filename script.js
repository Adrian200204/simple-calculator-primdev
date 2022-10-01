let num1 = "";
let num2 = "";
let operation = "";
let result = 0;
let history = [];

const inputDisplay = document.getElementById("inputDisplay");

function displayOutput() {
  inputDisplay.value = `${num1} ${operation} ${num2}`;
}

function inputNumber(input) {
  if (operation === "") {
    if (input === ".") {
      if(num1!== "" && !num1.includes("."))
      {
        num1 += String(input);
      }
    } else {
      // perkondisian dalam satu line
      num1 === ""? (num1 = String(input)) : (num1 += String(input));
    }
  } else {
    if (num2!== "" && !num2.includes(".")) {
      num2 += String(input);
    } else {
      num2 === ""? (num2 = String(input)) : (num2 += String(input));
    }
  }
  displayOutput();
}

function inputOperation(action) {
  if (action === "=") {
    calculate();
  } else if (action === "c") {
    clearDisplay();
  } else if (num1 === "del") {
    deleteInput();
  } else if (num1 !== "") {
    operation = action;
    displayOutput();
  }
}

function calculate() {
  if (num1 !== "" && operation !== "" && num2 !== "") {
    if (operation === "+") {
      result = Number(num1) + Number(num2);
    } else if (operation === "-") {
      result = Number(num1) - Number(num2);
    } else if (operation === "x") {
      result = Number(num1) * Number(num2);
    } else if (operation === "/") {
      result = Number(num1) / Number(num2);
    }
  let textHistory =`${num1} ${operation} ${num2} = ${result}`; 
  addHistory(textHistory);
  }

  num1 = String(result);
  num2 = "";
  operation = "";

  readHistory();
  displayOutput();
}

function clearDisplay() {
  num1 = "";
  num2 = "";
  operation = "";
  result = "";
  displayOutput();
}

function addHistory(result)
{
  history.push(result);
  // simpen dalam local storage
  localStorage.setItem("history", JSON.stringify (history));
}

function readHistory()
{
  const historyDisplay = document.getElementById('historyDisplay');

  history = JSON.parse(localStorage.getItem("history"));

  historyDisplay.innerHTML = "";
  // for (i = 0; i < history.length; i ++)
  // {
  //   historyDisplay.innerHTML = historyDisplay.innerHTML + `<p>${history[i]}</p>`
  // }
  // Mode lebih mudah dibacanya 
  history.forEach(item => {
    historyDisplay.innerHTML += `<p>${item}</p>`;
  });
}
readHistory();

console.log(num1, operation, num2);
