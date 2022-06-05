const fetch = require("node-fetch");

let url = "https://www.nytimes.com/games/wordle/main.9622bc55.js";
var nyt = `{"boardState":["crane","","","","",""],"evaluations":[["absent","present","correct","absent","absent"],null,null,null,null,null],"rowIndex":1,"solution":"tiara","gameStatus":"IN_PROGRESS","lastPlayedTs":1653676706783,"lastCompletedTs":null,"restoringFromLocalStorage":null,"hardMode":false}`;
var boardState =
  '{"boardState":["crane","model","","","",""],"evaluations":[["absent","absent","absent","absent","present"],["absent","absent","present","present","absent"],null,null,null,null],"rowIndex":3,"solution":"depth","gameStatus":"WIN","lastPlayedTs":1654443454730,"lastCompletedTs":1654443454730,"restoringFromLocalStorage":null,"hardMode":false}';
let testWords = ["dwarf", "graft", "shire", "actor", "bench", "witch"];

var goodLettes = { d: "d", e: "e" };
var badLetters = { c: "c", r: "r", a: "a", n: "n", m: "m", o: "o", l: "l" };

async function getWordsArray() {
  let url = "https://www.nytimes.com/games/wordle/main.9622bc55.js";
  let giantString = "";
  let startOfSolution;
  let endOfSolution;
  let wordsString;
  let openBracket;
  let closeBracket;
  let wordsArrayString;
  let words;

  let webpage = await fetch(url);
  giantString = await webpage.text();

  startOfSolution = giantString.indexOf("var ko=");
  endOfSolution = giantString.indexOf(",wo=");
  wordsString = giantString.substring(startOfSolution, endOfSolution);
  openBracket = wordsString.indexOf("[");
  closeBracket = wordsString.indexOf("]");
  wordsArrayString = wordsString.substring(openBracket, closeBracket + 1);
  words = JSON.parse(wordsArrayString);
  return words;
}

function getBoardState() {
  return localStorage.getItem("nyt-wordle-state");
}

function findGoodWords(goodLetters, words) {
  let letters = Object.keys(goodLetters);
  return words.filter((w) => {
    let found = true;
    letters.forEach((l) => {
      found &= w.includes(l);
    });
    return found;
  });
}

function removeBadLetters(badLetters, words) {
  let letters = Object.keys(badLetters);
  return words.filter((w) => {
    let found = true;
    letters.forEach((l) => {
      found &= !w.includes(l);
    });
    return found;
  });
}

function getGoodAndBadLetters(fromLocalStorage) {
  var gameState = JSON.parse(fromLocalStorage);
  var boardState = gameState.boardState;
  var evaluations = gameState.evaluations;
  var goodLetters = {};
  var badLetters = {};
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] !== "") {
      for (let j = 0; j < evaluations[i].length; j++) {
        if (
          evaluations[i][j] === "present" ||
          evaluations[i][j] === "correct"
        ) {
          goodLetters[boardState[i][j]] = boardState[i][j];
        } else {
          if (notAlreadyAGoodLetter(goodLetters, boardState[i][j])) {
            badLetters[boardState[i][j]] = boardState[i][j];
          }
        }
      }
    }
  }
  return { good: goodLetters, bad: badLetters };
}

function notAlreadyAGoodLetter(goodLetters, letter) {
  return !Object.keys(goodLetters).includes(letter);
}

async function go() {
  let allTheWords = await getWordsArray();
  let goodAndBad = getGoodAndBadLetters(getBoardState());
  let potentialGoodWords = findGoodWords(goodAndBad.good, allTheWords);
  potentialGoodWords = removeBadLetters(goodAndBad.bad, potentialGoodWords);
  console.table(potentialGoodWords);
}

function attachToEnterButtonClick() {
  var myGameApp = document.getElementsByTagName("game-app");
  myGameApp[0].$keyboard["$keyboard"].children[2].children[0].onclick =
    async () => {
      await go();
    };
}
