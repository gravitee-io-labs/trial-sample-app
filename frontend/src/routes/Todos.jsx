import { Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaArchive, FaInbox, FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { host, userId, apiKey, authRequired } = useOutletContext();

  useEffect(() => {
    getTodos();
  }, [host]);

  const logAction = async (action) => {
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString(undefined, {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        millisecond: "numeric",
      });
      const res = await fetch("https://" + host + "/todo-actions", {
        method: "POST",
        headers: {
          ...(authRequired ? { "X-Gravitee-Api-Key": apiKey } : {}),
        },
        body: JSON.stringify({
          userId,
          date: formattedDate,
          time: formattedTime,
          action,
        }),
      });

      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        throw new Error(`HTTP status code ${res.status}.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTodos = async () => {
    try {
      const res = await fetch("https://" + host + "/todos", {
        headers: {
          "user-id": userId,
          ...(authRequired ? { "X-Gravitee-Api-Key": apiKey } : {}),
        },
      });
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = async () => {
    try {
      const res = await fetch("https://" + host + "/todos", {
        method: "POST",
        headers: {
          "user-id": userId,
          "Content-Type": "application/json",
          ...(authRequired ? { "X-Gravitee-Api-Key": apiKey } : {}),
        },
        body: JSON.stringify({ userId, text: newTodo }),
      });
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }

      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const completeTodo = async (id) => {
    const prevTodos = todos.slice();
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );

    try {
      const res = await fetch(
        "https://" +
          host +
          `/todos/${id}?` +
          new URLSearchParams({
            action: "complete",
          }),
        {
          method: "PATCH",
          headers: {
            "user-id": userId,
            ...(authRequired ? { "X-Gravitee-Api-Key": apiKey } : {}),
          },
        }
      );
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        setTodos(prevTodos);
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const archiveTodo = async (id) => {
    const prevTodos = todos.slice();
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, archive: !todo.archive };
        }
        return todo;
      })
    );
    try {
      const res = await fetch(
        "https://" +
          host +
          `/todos/${id}?` +
          new URLSearchParams({
            action: "archive",
          }),
        {
          method: "PATCH",
          headers: {
            "user-id": userId,
            ...(authRequired ? { "X-Gravitee-Api-Key": apiKey } : {}),
          },
        }
      );
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        setTodos(prevTodos);
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const deleteTodo = async (id) => {
    const prevTodos = todos.slice();
    setTodos((todos) => todos.filter((todo) => todo._id !== id));
    try {
      const res = await fetch("https://" + host + `/todos/${id}`, {
        method: "DELETE",
        headers: {
          "user-id": userId,
          ...(authRequired ? { "X-Gravitee-Api-Key": apiKey } : {}),
        },
      });
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        setTodos(prevTodos);
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CustomHeader title="Todos"></CustomHeader>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        className="flex justify-center xl:px-72"
      >
        <Tabs.Item title="Current" active={true}>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="my-4 h-12 w-full rounded-lg bg-[#f3f3f3] p-2"
              placeholder="+ Add a task. Press enter to save."
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
              onKeyDown={(e) =>
                e.key === "Enter" ? (createTodo(), logAction("Create")) : null
              }
            />
            {todos
              .filter((todo) => !todo.archive)
              .map((todo) => (
                <div
                  className={`todo cursor-pointer gap-6 hover:opacity-80 ${
                    todo.complete ? "is-complete" : ""
                  }`}
                  key={todo._id}
                  onClick={() => {
                    completeTodo(todo._id);
                    logAction("Complete");
                  }}
                >
                  <div className="checkbox"></div>
                  <div className="text">{todo.text}</div>
                  <div
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveTodo(todo._id);
                      logAction("Archive");
                    }}
                  >
                    <FaArchive size="20" className="hover:fill-accent-portage" />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo._id);
                      logAction("Delete");
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
                      logAction("Delete");
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
    </>
  );
}
