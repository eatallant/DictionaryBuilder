import renderHTML from "./modules/renderHTML.js";

("use strict");
console.log("page load successful");

const wordCounter = (() => {
  let count = 0;
  const addToCount = (val) => (count += val);
  return {
    increment: () => addToCount(1),
    decrement: () => addToCount(-1),
    current: () => count,
  };
})();

window.createNewDefinition = () => {
  const word = prompt("Enter a word");

  if (!word) {
    return false;
  }

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].meanings); // catch 404 error before any HTML rendering
      renderHTML().newEntry(word);
      data[0].meanings.map((meaning) => {
        let definition = meaning.definitions[0].definition;
        renderHTML().definition(definition, wordCounter.current());
      });
      updateTitle();
      wordCounter.increment();
    })
    .catch((ex) => {
      console.log(ex);
      alert("could not find " + word);
    });
};

// track total words processed in document title
const updateTitle = () => {
  document.title = "Dictionary (" + (wordCounter.current() + 1) + ")";
};
