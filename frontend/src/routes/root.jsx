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
                to={`todo`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                REST based Todo App
              </NavLink>
            </li>
            <li>
              <Link to={`placeholder`}>Placeholder</Link>
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
