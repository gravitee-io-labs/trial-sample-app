import { Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { FiArchive, FiInbox, FiTrash } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import CustomHeader from "../components/CustomHeader";

const createToast = (message) => toast.info(message, {});

const sortTodos = (a, b) => {
  if (a.complete && !b.complete) {
    return 1; // a comes after b
  } else if (!a.complete && b.complete) {
    return -1; // a comes before b
  } else {
    return 0; // a and b remain unchanged
  }
};

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { host, userId, authToken, authType } = useOutletContext();

  const authHeaderSelector = () => {
    let authHeader = {};
    switch (authType) {
      case "none":
        break;
      case "apiKey":
        authHeader = { "X-Gravitee-Api-Key": authToken };
        break;
      case "jwt":
        authHeader = { Authorization: `Bearer ${authToken}` };
    }
    return authHeader;
  };

  const logAction = async (action) => {
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString(undefined, {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      const milliseconds = now.getMilliseconds();
      const formattedTimeWithMilliseconds = `${formattedTime}.${milliseconds}`;
      const timeZone = now
        .toLocaleTimeString([], { timeZoneName: "short" })
        .split(" ")[2];
      const res = await fetch("https://" + host + "/todo-actions", {
        method: "POST",
        body: JSON.stringify({
          userId,
          date: formattedDate,
          time: formattedTimeWithMilliseconds,
          timeZone,
          action,
        }),
      });

      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        throw new Error(`HTTP status code ${res.status}.`);
      }
      createToast(
        `Todo ${action} at ${formattedTimeWithMilliseconds} ${timeZone} on ${formattedDate}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [host]);

  const getTodos = async () => {
    try {
      const res = await fetch("https://" + host + "/todos", {
        headers: {
          "user-id": userId,
          ...authHeaderSelector(),
        },
      });
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
      setTodos(data);
      createToast(`Todos fetched from database`);
    } catch (error) {
      console.error(error);
      createToast(error.message);
    }
  };

  const createTodo = async () => {
    try {
      if (newTodo.trim() === "") {
        // If newTodo is blank or contains only whitespace characters
        createToast("Please enter a non-empty todo.");
        return;
      }

      const res = await fetch("https://" + host + "/todos", {
        method: "POST",
        headers: {
          "user-id": userId,
          "Content-Type": "application/json",
          ...authHeaderSelector(),
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
      logAction("Created");
    } catch (error) {
      console.error(error);
      createToast(error.message);
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
            ...authHeaderSelector(),
          },
        }
      );
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        setTodos(prevTodos);
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
      logAction("Completed");
    } catch (error) {
      console.error(error);
      createToast(error.message);
    }
  };

  const archiveTodo = async (id, log = true) => {
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
            ...authHeaderSelector(),
          },
        }
      );
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        setTodos(prevTodos);
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
      log && logAction("Archived");
    } catch (error) {
      console.error(error);
      createToast(error.message);
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
          ...authHeaderSelector(),
        },
      });
      const data = await res.json();
      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        setTodos(prevTodos);
        throw new Error(`HTTP status code ${res.status}. ${data.message}`);
      }
      logAction("Deleted");
    } catch (error) {
      console.error(error);
      createToast(error.message);
    }
  };

  const sortedTodos = [...todos].sort(sortTodos);
  return (
    <>
      <CustomHeader title="Todo List"></CustomHeader>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        className="flex justify-center xl:px-72"
        theme={{
          tablist: {
            tabitem: {
              styles: {
                underline: {
                  active: {
                    on: "text-accent-500 border-b-2 border-accent-500 !focus-visible:border-accent-500 !focus:border-accent-500",
                  },
                },
              },
            },
          },
        }}
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
            {sortedTodos
              .filter((todo) => !todo.archive)
              .map((todo) => (
                <div
                  className={`todo cursor-pointer gap-6 hover:bg-space-neutral-100/20 ${
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
                    <FiArchive
                      size="20"
                      className=" text-black hover:text-accent-500"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo._id);
                    }}
                  >
                    <FiTrash size="20" className="text-black hover:text-red-500" />
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
                      archiveTodo(todo._id, false);
                    }}
                  >
                    <FiInbox
                      size="20"
                      className="cursor-pointer text-black hover:text-accent-500"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo._id);
                    }}
                  >
                    <FiTrash
                      size="20"
                      className="cursor-pointer text-black hover:text-red-500"
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
