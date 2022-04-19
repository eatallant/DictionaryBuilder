export default function store() {
  return {
    setDefinitions: (definitions) =>
      localStorage.setItem("definitions", JSON.stringify(definitions)),
    getDefinitions: JSON.parse(localStorage.getItem("definitions")) || [],
  };
}
