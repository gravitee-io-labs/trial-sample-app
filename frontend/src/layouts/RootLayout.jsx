import { useEffect, useState } from "react";
import { FaChartBar, FaCheckCircle, FaCog } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  const [host, setHost] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    const storedPreference = localStorage.getItem("userPrefHost");
    if (storedPreference) {
      setHost(storedPreference);
    } else {
      setHost("localhost:8082");
    }
  }, []);
  useEffect(() => {
    const storedPreference = localStorage.getItem("userId");
    if (storedPreference) {
      setUserId(storedPreference);
    } else {
      setUserId("root");
    }
  }, []);

  const [authRequired, setAuthRequired] = useState();
  useEffect(() => {
    const storedPreference = localStorage.getItem("userPrefAuthRequired");
    if (storedPreference) {
      setAuthRequired(JSON.parse(storedPreference));
    } else {
      setAuthRequired(false);
    }
  }, []);

  const [apiKey, setApiKey] = useState();
  useEffect(() => {
    const storedPreference = localStorage.getItem("userPrefApiKey");
    if (storedPreference) {
      setApiKey(storedPreference);
    } else {
      setApiKey("");
    }
  }, []);

  const [kafkaData, setKafkaData] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://" + host + "/todo-actions/");
    ws.onopen = () => console.log("WebSocket connected");
    ws.onerror = () => console.log("WebSocket error");
    ws.onclose = () => console.log("WebSocket closed");
    ws.onmessage = async (event) => {
      let data = await event.data.text();
      data = await JSON.parse(data);
      setKafkaData((prevData) => [...prevData, data]);
    };

    return () => {
      if (ws.readyState === 1) {
        ws.close();
        setKafkaData([]);
      }
    };
  }, [host]);

  const pages = [
    { route: "/", icon: <FaCheckCircle size="28" />, text: "Todos" },
    { route: "analytics", icon: <FaChartBar size="28" />, text: "Analytics" },
    {
      route: "notification-history",
      icon: <IoNotifications size="28" />,
      text: "Notification History",
    },
    { route: "configuration", icon: <FaCog size="28" />, text: "Configuration" },
  ];

  return (
    <>
      <nav className="navbar fixed z-50 h-full w-20 overflow-clip rounded-r-3xl bg-primary bg-clip-border text-white shadow-xl shadow-primary  transition-[width] duration-500 ease-in-out hover:w-72">
        <ul className="flex h-full flex-col items-center">
          <li className="header flex h-[70px] w-full items-center justify-center gap-5 bg-secondary fill-black">
            <span className="header-text invisible absolute min-w-max font-[Montserrat] text-3xl font-extrabold uppercase tracking-[0.15em] opacity-0 transition-none">
              Gravitee
            </span>
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
          </li>
          {pages.map((page) => (
            <li
              className="menu-item group w-full py-2 transition-none duration-300 ease-linear hover:bg-primary-light hover:transition-all"
              key={page.route}
            >
              <NavLink
                to={page.route}
                className={({ isActive, isPending }) => {
                  return (
                    "flex items-center " +
                    (isActive ? "active" : isPending ? "pending" : "")
                  );
                }}
              >
                <MenuItem icon={page.icon} text={page.text} />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ml-20 h-full p-12">
        <Outlet
          context={{
            host,
            setHost,
            userId,
            setUserId,
            kafkaData,
            setKafkaData,
            apiKey,
            setApiKey,
            authRequired,
            setAuthRequired,
          }}
        />
      </div>
    </>
  );
}

const MenuItem = ({ icon, text }) => (
  <>
    <div className="menu-item__icon mx-4 flex h-12 w-12 min-w-[3rem] items-center justify-center rounded-3xl bg-primary-light text-white transition-all duration-300 ease-linear group-hover:rounded-xl group-hover:bg-primary-dark group-hover:text-accent-cyan">
      {icon}
    </div>
    <span className="menu-item__text invisible min-w-max opacity-0 transition-all duration-300 ease-linear">
      {text}
    </span>
  </>
);
