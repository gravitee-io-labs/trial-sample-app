import { useOutletContext } from "react-router-dom";

export default function ResetButton() {
  const { host } = useOutletContext();

  const deleteAllTodos = () => {
    fetch("http://" + host + `/todos/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
          // Catch non-2xx HTTP status codes
        } else {
          if (!alertShown) {
            alert(`HTTP error, status = ${res.status}`);
            alertShown = !alertShown;
          }
          throw new Error(`HTTP error, status = ${res.status}`);
        }
      })
      .then(() => window.location.reload())
      .catch((err) => console.error(`Error: ${err}`));
  };

  return (
    <button
      className="h-12 w-20 rounded-md bg-accent-cyan/80 font-bold tracking-wider text-black shadow-md shadow-accent-cyan/30 hover:opacity-70"
      onClick={deleteAllTodos}
    >
      Reset
    </button>
  );
}
