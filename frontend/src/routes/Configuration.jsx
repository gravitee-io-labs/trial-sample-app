import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

export default function Configuration() {
  const {
    host,
    setHost,
    apiKey,
    setApiKey,
    authRequired,
    setAuthRequired,
    userId,
    setUserId,
  } = useOutletContext();
  const [formModified, setFormModified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setHost(e.target.hostInput.value);
    localStorage.setItem("userPrefHost", e.target.hostInput.value);

    setUserId(e.target.userIdInput.value);
    localStorage.setItem("userId", e.target.userIdInput.value);

    localStorage.setItem("userPrefAuthRequired", e.target.authRequired.checked);

    setApiKey(e.target.apiKey.value);
    localStorage.setItem("userPrefApiKey", e.target.apiKey.value);

    setFormModified(false);
  };

  return (
    <form id="form" onSubmit={handleSubmit} className="">
      <CustomHeader
        title="Configuration"
        buttonType="save"
        formModified={formModified}
      ></CustomHeader>
      <main className="flex flex-grow flex-col items-center">
        <fieldset className="flex w-96 flex-col gap-4 px-5">
          <h2>Target Server</h2>
          <div className="relative">
            <label htmlFor="userIdInput" className="form-label">
              Gravitee User ID
            </label>
            <input
              type="text"
              name="userIdInput"
              className="form-input"
              required
              defaultValue={userId}
              onChange={() => setFormModified(true)}
            />
          </div>

          <div className="relative">
            <label htmlFor="hostInput" className="form-label">
              Fully Qualified Domain Name
            </label>
            <input
              type="text"
              name="hostInput"
              className="form-input"
              required
              disabled
              defaultValue={host}
              onChange={() => setFormModified(true)}
            />
          </div>
          <h2>Authorization</h2>
          <RadioItems
            items={[
              { label: "None", id: "none", checked: authRequired === "none" },
              { label: "Api Key", id: "apiKey", checked: authRequired === "apiKey" },
              { label: "JWT", id: "jwt", checked: authRequired === "jwt" },
            ]}
            handleChange={() => {
              setFormModified(true);
              setAuthRequired(!authRequired);
            }}
            group="authType"
          />
          <div className="relative">
            <label htmlFor="apiKey" className="form-label">
              API Key
            </label>
            <input
              type="text"
              name="apiKey"
              className="form-input"
              disabled={!authRequired}
              required={authRequired}
              defaultValue={apiKey}
              onChange={() => setFormModified(true)}
            />
          </div>
        </fieldset>
      </main>
    </form>
  );
}

const RadioItems = ({ items, handleChange, group }) => (
  <ul className="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900  sm:flex">
    {items.map((item) => (
      <li
        key={item.id}
        className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
      >
        <div className="flex items-center pl-3">
          <input
            name={group}
            id={item.id}
            value={item.id}
            defaultChecked={item.checked}
            onClick={handleChange}
            type="radio"
            className="h-4 w-4 border-gray-300 bg-gray-100 accent-secondary"
          />
          <label
            htmlFor={item.id}
            className="ml-2 w-full py-3 text-sm font-medium text-gray-900 "
          >
            {item.label}
          </label>
        </div>
      </li>
    ))}
  </ul>
);
