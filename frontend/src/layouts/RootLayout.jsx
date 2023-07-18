import { useEffect, useState } from "react";
import { FiBarChart, FiBell, FiCheckCircle, FiHome, FiSettings } from "react-icons/fi";
import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { v4 as uuidv4 } from "uuid";

export default function RootLayout() {
  const [host, setHost] = useState(() => {
    const storedPreference = localStorage.getItem("userPrefHost");
    if (storedPreference) {
      return storedPreference;
    } else {
      return "apim-master-gateway.team-apim.gravitee.dev";
    }
  });
  // Set hrid from query parameters
  const [searchParams, setSearchparams] = useSearchParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(() => {
    const hrid = searchParams.get("hrid") || localStorage.getItem("hrid");
    if (hrid) {
      return hrid;
    } else {
      return "not-set";
    }
  });
  useEffect(() => {
    localStorage.setItem("hrid", userId);
    setSearchparams({}); // once hrid is saved, delete query parameters
    navigate(); // update URL to remove query parameters
  }, [userId]);

  const [authType, setAuthType] = useState(() => {
    const storedPreference = localStorage.getItem("userPrefAuthType");
    if (storedPreference) {
      return storedPreference;
    } else {
      return "none";
    }
  });
  const [authToken, setAuthToken] = useState(() => {
    const storedPreference = localStorage.getItem("userPrefAuthToken");
    if (storedPreference) {
      return storedPreference;
    } else {
      return "";
    }
  });

  // Real-time data stream
  const [kafkaConsumerId] = useState(() => uuidv4());
  const [kafkaData, setKafkaData] = useState([]);
  const { lastMessage } = useWebSocket(`wss://${host}/todo-actions`, {
    queryParams: {
      "x-gravitee-client-identifier": kafkaConsumerId,
      "api-key": "preconfigured-api-key", // Custom API key set in Gravitee trial
    },
    shouldReconnect: () => true,
    onOpen: () => console.log("Real-time WebSocket connected"),
    onError: (error) => console.log(`Real-time WebSocket error: ${error}`),
    onClose: () => console.log("Real-time WebSocket closed"),
  });
  useEffect(() => {
    if (lastMessage !== null) {
      (async () => {
        const data = await lastMessage.data.text();
        const parsedData = JSON.parse(data);
        setKafkaData((prevData) => [...prevData, parsedData]);
      })();
    }
  }, [lastMessage]);

  // Delayed data stream
  const [delayedKafkaConsumerId] = useState(() => uuidv4());
  const [delayedKafkaData, setDelayedKafkaData] = useState([]);
  const { lastMessage: delayedLastMessage } = useWebSocket(
    `wss://${host}/todo-actions`,
    {
      queryParams: { "x-gravitee-client-identifier": delayedKafkaConsumerId },
      shouldReconnect: () => true,
      onOpen: () => console.log("Delayed WebSocket connected"),
      onError: (error) => console.log(`Delayed WebSocket error: ${error}`),
      onClose: () => console.log("Delayed WebSocket closed"),
    }
  );
  useEffect(() => {
    if (delayedLastMessage !== null) {
      (async () => {
        const data = await delayedLastMessage.data.text();
        const parsedData = JSON.parse(data);
        setDelayedKafkaData((prevData) => [...prevData, parsedData]);
      })();
    }
  }, [delayedLastMessage]);

  const pages = [
    { route: "/", icon: <FiHome size="20" />, text: "Home" },
    {
      route: "/todos",
      icon: <FiCheckCircle size="20" />,
      text: "Todo List",
    },
    {
      route: "/analytics",
      icon: <FiBarChart size="20" />,
      text: "Analytics",
    },
    {
      route: "/notification-center",
      icon: <FiBell size="20" />,
      text: "Notification Center",
    },
    {
      route: "/configuration",
      icon: <FiSettings size="20" />,
      text: "Configuration",
    },
  ];

  return (
    <>
      <nav className="navbar fixed z-50 h-full w-20 overflow-clip rounded-r-3xl bg-space-neutral-800 bg-clip-border text-white shadow-xl shadow-space-neutral-800  transition-[width] duration-500 ease-in-out hover:w-72">
        <ul className="flex h-full flex-col items-center">
          <li className="header flex h-[70px] w-full items-center justify-center gap-5 bg-[#184676] fill-black">
            <span className="header-text invisible absolute min-w-max font-[Montserrat] text-3xl font-extrabold uppercase tracking-[0.15em] opacity-0 transition-none">
              Gravitee
            </span>
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
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
              className="menu-item group w-full py-1 transition-none duration-300 ease-linear hover:bg-space-neutral-700 hover:transition-all"
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
      <div className="ml-20 h-full pb-20">
        <Outlet
          context={{
            host,
            setHost,
            userId,
            setUserId,
            kafkaData,
            setKafkaData,
            delayedKafkaData,
            setDelayedKafkaData,
            authToken,
            setAuthToken,
            authType,
            setAuthType,
          }}
        />
      </div>
    </>
  );
}

const MenuItem = ({ icon, text }) => (
  <>
    <div className="menu-item__icon mx-4 flex h-12 w-12 min-w-[3rem] items-center justify-center text-white transition-all duration-300 ease-linear group-hover:rounded-xl group-hover:bg-space-neutral-800 group-hover:text-primary-300">
      {icon}
    </div>
    <span className="menu-item__text invisible min-w-max opacity-0 transition-all duration-300 ease-linear">
      {text}
    </span>
  </>
);
