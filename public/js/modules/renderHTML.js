// THIS IS JUST A PLACEHOLDER! Replace with GUID module before persistence
let count = 0;

export default function renderHTML() {
  return {
    newEntry: (word) => {
      let dictionaryBody = document.getElementById("dictionary-body");
      let id = count++; //this needs replaced with the GUID function when it's available

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
