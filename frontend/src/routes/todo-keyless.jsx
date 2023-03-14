import logo from "../assets/Gravitee.io White Logo.png";
import { useState, useEffect } from "react";

export default function TodoKeyless() {
  const [todos, setTodos] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  // Ensures alert is not shown twice in development
  let alertShown = false;
  const getTodos = () => {
    fetch("/todos")
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
      .then((data) => setTodos(data))
      .catch((err) => console.error(`Error: ${err}`));
  };

  const completeTodo = async (id) => {
    const data = await fetch(`/todos/${id}`, {
      method: "PATCH",
    }).then((res) => {
      if (res.ok) {
        return res.json();
        // Catch non-2xx HTTP status codes
      } else {
        alert(`HTTP error, status = ${res.status}`);
        throw new Error(`HTTP error, status = ${res.status}`);
      }
    });

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(`/todos/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
        // Catch non-2xx HTTP status codes
      } else {
        alert(`HTTP error, status = ${res.status}`);
        throw new Error(`HTTP error, status = ${res.status}`);
      }
    });

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
        // Catch non-2xx HTTP status codes
      } else {
        alert(`HTTP error, status = ${res.status}`);
        throw new Error(`HTTP error, status = ${res.status}`);
      }
    });

    setTodos([...todos, data]);
    setModalActive(false);
    setNewTodo("");
  };

  return (
    <div>
      <div className="header">
        <h1>Keyless (public) Access</h1>
        <a href="http://gravitee.io" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Gravitee Logo" width="200"></img>
        </a>
      </div>

      <h4>My Tasks</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={`todo ${todo.complete ? "is-complete" : ""}`}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div
              className="delete-todo"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo._id);
              }}
            >
              x
            </div>
          </div>
        ))}
      </div>
      <div className="open-modal" onClick={() => setModalActive(true)}>
        +
      </div>
      {modalActive ? (
        <div className="modal">
          <div
            className="modal__close"
            onClick={() => {
              setModalActive(false);
              setNewTodo("");
            }}
          >
            x
          </div>
          <div className="modal__content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <button className="modal__create-task" onClick={addTodo}>
              Create Task
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
