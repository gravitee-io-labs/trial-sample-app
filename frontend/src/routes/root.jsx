import { Outlet, Link, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Gravitee Trial App</h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`todo-keyless`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                1. (REST) Keyless Todo App
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`todo-authenticated`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                2. (REST) Authenticated Todo App
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`todo-kafka`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                3. (Kafka) Authenticated Todo App
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
