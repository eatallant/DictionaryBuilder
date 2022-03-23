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
      renderNewEntryHTML(word);
      data[0].meanings.map((meaning) => {
        let definition = meaning.definitions[0].definition;
        renderDefinitionHTML(definition, wordCounter.current());
      });
      updateTitle();
      wordCounter.increment();
    })
    .catch((ex) => {
      console.log(ex);
      alert("could not find " + word);
    });
};

const renderNewEntryHTML = (word) => {
  let dictionaryBody = document.getElementById("dictionary-body");
  let id = wordCounter.current();

  //append header
  let node = document.createElement("h3");
  let textnode = document.createTextNode(word);
  node.appendChild(textnode);
  dictionaryBody.appendChild(node);

  //append ordered list with unique id
  node = document.createElement("ol");
  node.setAttribute("id", id);
  node.setAttribute("class", "definition-list");
  dictionaryBody.appendChild(node);
};

const renderDefinitionHTML = (definition, id) => {
  let node = document.createElement("LI");
  node.setAttribute("class", "definition-list-item");
  let textnode = document.createTextNode(definition);
  node.appendChild(textnode);
  document.getElementById(id).appendChild(node);
};

// track total words processed in document title
const updateTitle = () => {
  document.title = "Dictionary (" + (wordCounter.current() + 1) + ")";
};
