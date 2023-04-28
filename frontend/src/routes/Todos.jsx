import { Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaArchive, FaInbox, FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import logo from "../assets/Gravitee.io Dark Blue Logo.png";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { host, apiKey } = useOutletContext();

  useEffect(() => {
    getTodos();
  }, [host]);

  // Ensures alert is not shown twice in development
  let alertShown = false;
  const getTodos = () => {
    fetch(host + "/todos", {
      headers: apiKey ? { "X-Gravitee-Api-Key": apiKey } : {},
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
      .then((data) => setTodos(data))
      .catch((err) => console.error(`Error: ${err}`));
  };

  const completeTodo = async (id) => {
    const data = await fetch(
      host +
        `/todos/${id}?` +
        new URLSearchParams({
          action: "complete",
        }),
      {
        method: "PATCH",
        headers: apiKey ? { "X-Gravitee-Api-Key": apiKey } : {},
      }
    ).then((res) => {
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

  const archiveTodo = async (id) => {
    const data = await fetch(
      host +
        `/todos/${id}?` +
        new URLSearchParams({
          action: "archive",
        }),
      {
        method: "PATCH",
        headers: apiKey ? { "X-Gravitee-Api-Key": apiKey } : {},
      }
    ).then((res) => {
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
          todo.archive = data.archive;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(host + `/todos/${id}`, {
      method: "DELETE",
      headers: apiKey ? { "X-Gravitee-Api-Key": apiKey } : {},
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

  const createTodo = async () => {
    const data = await fetch(host + "/todos", {
      method: "POST",
      headers: apiKey
        ? { "X-Gravitee-Api-Key": apiKey, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" },
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
    setNewTodo("");
  };

  return (
    <div className="xl:px-72">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Todos</h1>
        <a
          className=" hidden md:block"
          href="http://gravitee.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Gravitee Logo" width="200"></img>
        </a>
      </div>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        className="flex justify-center"
      >
        <Tabs.Item title="Current" active={true}>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="my-4 h-12 w-full rounded-lg bg-[#f3f3f3] p-2"
              placeholder="+ Add a task. Press enter to save."
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
              onKeyDown={(e) => (e.key === "Enter" ? createTodo() : null)}
            />
            {todos
              .filter((todo) => !todo.archive)
              .map((todo) => (
                <div
                  className={`todo cursor-pointer gap-6 hover:opacity-80 ${
                    todo.complete ? "is-complete" : ""
                  }`}
                  key={todo._id}
                  onClick={() => completeTodo(todo._id)}
                >
                  <div className="checkbox"></div>
                  <div className="text">{todo.text}</div>
                  <div
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveTodo(todo._id);
                    }}
                  >
                    <FaArchive size="20" className="hover:fill-accent-portage" />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo._id);
                    }}
                  >
                    <FaTrash size="20" className="hover:fill-accent-rose" />
                  </div>
                </div>
              ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Archived">
          <div className="flex flex-col gap-5">
            {todos
              .filter((todo) => todo.archive)
              .map((todo) => (
                <div
                  className={`todo gap-6 ${todo.complete ? "is-complete" : ""}`}
                  key={todo._id}
                >
                  <div className="text">{todo.text}</div>
                  <div
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveTodo(todo._id);
                    }}
                  >
                    <FaInbox
                      size="20"
                      className="cursor-pointer hover:fill-accent-portage"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo._id);
                    }}
                  >
                    <FaTrash
                      size="20"
                      className="cursor-pointer hover:fill-accent-rose"
                    />
                  </div>
                </div>
              ))}
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}