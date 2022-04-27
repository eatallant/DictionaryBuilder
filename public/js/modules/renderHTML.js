// THIS IS JUST A PLACEHOLDER! Replace with GUID module before persistence
let count = 0;

export default function renderHTML() {
  return {
    clearAll: () => {
      const node = document.getElementById("dictionary-body");
      node.textContent = "";
    },

    newEntry: (word, id) => {
      let dictionaryBody = document.getElementById("dictionary-body");
      //let id = count++; //this needs replaced with the GUID function when it's available

      //append header
      let wrapper = document.createElement("article");
      wrapper.setAttribute("class", "word-wrapper");
      wrapper.setAttribute("id", id);
      let node = document.createElement("h3");
      let textnode = document.createTextNode(word);
      wrapper.appendChild(node);
      node.appendChild(textnode);
      dictionaryBody.appendChild(wrapper);

      //append ordered list with unique id
      node = document.createElement("ol");
      node.setAttribute("class", "definition-list");
      wrapper.appendChild(node);
    },

    definition: (definition, id) => {
      let node = document.createElement("LI");
      node.setAttribute("class", "definition-list-item");
      let textnode = document.createTextNode(definition);
      node.appendChild(textnode);
      document.getElementById(id).appendChild(node);
    },
  };
}
