
function getWordsArray() {
    let url = 'https://www.nytimes.com/games/wordle/main.9622bc55.js';
    let giantString = '';
    let startOfSolution;
    let endOfSolution;
    let wordsString;
    let openBracket;
    let closeBracket;
    let wordsArrayString;
    let words ;

    fetch(url).then((r)=>r.text()).then((r)=> giantString = r);
    startOfSolution = giantString.indexOf('var ko=');
    endOfSolution = giantString.indexOf(',wo=');
    wordsString = giantString.substring(startOfSolution, endOfSolution);
    openBracket = wordsString.indexOf('[');
    closeBracket = wordsString.indexOf(']') + 1;
    wordsArrayString = wordsString.substring(openBracket, closeBracket);
    words = JSON.parse(wordsArrayString);
    return words;
}

var nyt = `{"boardState":["crane","","","","",""],"evaluations":[["absent","present","correct","absent","absent"],null,null,null,null,null],"rowIndex":1,"solution":"tiara","gameStatus":"IN_PROGRESS","lastPlayedTs":1653676706783,"lastCompletedTs":null,"restoringFromLocalStorage":null,"hardMode":false}`;

function getGoodLetters() {
    var gameState = JSON.parse(localStorage.getItem('nyt-wordle-state'));
    var boardState = gameState.boardState;
    var evaluations = gameState.evaluations;
}
