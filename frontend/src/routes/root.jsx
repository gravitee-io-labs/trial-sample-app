import { FaHome, FaCheckCircle, FaChartBar, FaCog } from "react-icons/fa";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div
        id="sidebar"
        className=" left-0 top-0 m-0 flex h-screen w-16 flex-col bg-gray-950 text-white shadow-lg"
      >
        <h1>Gravitee Trial App</h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`/`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaHome size="28" />} />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`todo-keyless`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaCheckCircle size="28" />} />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`todo-authenticated`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaChartBar size="28" />} />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`todo-kafka`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaCog size="28" />} />
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

const SidebarIcon = ({ icon }) => (
  <div className="relative mx-auto my-2 flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-accent-cyan transition-all duration-300 ease-linear hover:rounded-xl hover:bg-accent-cyan hover:text-black">
    {icon}
  </div>
);
