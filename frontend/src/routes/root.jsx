import { FaHome, FaCheckCircle, FaChartBar, FaCog } from "react-icons/fa";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div
        id="sidebar"
        className=" left-0 top-0 m-0 flex h-screen w-20 flex-col bg-primary text-white shadow-xl shadow-primary transition-[width] duration-500 ease-in-out hover:w-80"
      >
        <div className="flex items-center justify-center bg-secondary fill-black py-3">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fit=""
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            className="w-10 fill-white"
          >
            <g>
              <path d="M16.4 10.11a1.11 1.11 0 0 1-1.11 1.109H8.046a1.11 1.11 0 0 1-1.11-1.11V5.236c0-.612.498-1.11 1.11-1.11h7.244c.612 0 1.11.498 1.11 1.11v4.873Zm.812 8.303v.35c0 .612-.498 1.11-1.11 1.11H7.234a1.11 1.11 0 0 1-1.109-1.11v-.35c0-.612.498-1.11 1.11-1.11h8.869c.611 0 1.109.498 1.109 1.11ZM19.189 2H8.046a3.234 3.234 0 0 0-3.233 3.236v4.873c0 .808.298 1.545.787 2.112a3.02 3.02 0 0 0-.332 3.627A3.228 3.228 0 0 0 4 18.413v.35a3.234 3.234 0 0 0 3.233 3.236h8.87a3.234 3.234 0 0 0 3.233-3.236v-.35a3.234 3.234 0 0 0-3.233-3.236h-8.26a.92.92 0 0 1 .004-1.84h.031c.056.002 7.412.008 7.412.008a3.234 3.234 0 0 0 3.233-3.236l.014-5.54c0-.24.196-.436.436-.436h.216a.533.533 0 0 0 .532-.533V2.533A.533.533 0 0 0 19.19 2Z"></path>
            </g>
          </svg>
        </div>
        <nav>
          <ul className="flex flex-col">
            <li className="menu-item group">
              <NavLink
                to={`/`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaHome size="28" />} />
              </NavLink>
            </li>
            <li className="menu-item group">
              <NavLink
                to={`todo-keyless`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaCheckCircle size="28" />} />
              </NavLink>
            </li>
            <li className="menu-item group">
              <NavLink
                to={`todo-authenticated`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <SidebarIcon icon={<FaChartBar size="28" />} />
              </NavLink>
            </li>
            <li className="menu-item group">
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
  <div className="relative mx-auto my-2 flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-light text-white transition-all duration-300 ease-linear group-hover:rounded-xl group-hover:bg-primary-dark group-hover:text-accent-cyan">
    {icon}
  </div>
);
