import { FaHome, FaCheckCircle, FaChartBar, FaCog } from "react-icons/fa";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div
        id="sidebar"
        className=" top-0 left-0 flex flex-col w-16 h-screen m-0 text-white bg-gray-900 shadow-lg"
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
  <div className=" hover: hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl relative flex items-center justify-center w-12 h-12 mx-auto my-2 text-green-500 transition-all duration-300 ease-linear bg-gray-800">
    {icon}
  </div>
);
