import renderHTML from "./modules/renderHTML.js";
import store from "./modules/store.js";

("use strict");
console.log("page load successful");

let dictionary = store().getDefinitions;

// function is called in index.html
window.handleFindWordClick = () => {
  createNewDefinition();
};

const wordCounter = (() => {
  let count = 0;
  const addToCount = (val) => (count += val);
  return {
    increment: () => addToCount(1),
    decrement: () => addToCount(-1),
    current: () => count,
    reset: () => (count = 0),
  };
})();

const createNewDefinition = () => {
  const word = prompt("Enter a word");

  if (!word) {
    return false;
  }

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].meanings); // catch 404 error before any HTML rendering
      dictionary.push(data);
      store().setDefinitions(dictionary);
      updateDOM();
    })
    .catch((ex) => {
      console.log(ex);
      alert("could not find " + word);
    });
};

const updateDOM = () => {
  wordCounter.reset();
  renderHTML().clearAll();
  dictionary.map((word) => {
    wordCounter.increment();
    let id = wordCounter.current();
    console.log(word[0].word);
    renderHTML().newEntry(word[0].word, id);
    word[0].meanings.map((meaning) => {
      let definition = meaning.definitions[0].definition;
      renderHTML().definition(definition, id);
    });
  });
  updateTitle();
};

// track total words processed in document title
const updateTitle = () => {
  document.title = "Dictionary (" + wordCounter.current() + ")";
};

(() => updateDOM())(); // render any stored words on page load
