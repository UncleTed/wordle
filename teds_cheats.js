function getCurrentStats() {
  return window.localStorage.getItem("nyt-wordle-statistics");
}

async function getWords() {
  const nyt = "https://www.nytimes.com/games/wordle/main.9622bc55.js";
  const response = await fetch(binance);
  const contents = await response.json();
  return contents;
}

getWords().then((w) => console.log(w));

fetch(binance)
  .then((response) => response.json())
  .then((response) => console.log(response[0].symbol))
  .catch((err) => console.error(err));
