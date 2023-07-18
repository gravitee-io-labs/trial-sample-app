import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

export default function Configuration() {
  const {
    host,
    setHost,
    authToken,
    setAuthToken,
    authType,
    setAuthType,
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

    localStorage.setItem("userPrefAuthType", e.target.authType.value);

    setAuthToken(e.target.authToken.value);
    localStorage.setItem("userPrefApiKey", e.target.authToken.value);

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
        <fieldset className="flex w-11/12 flex-col gap-6 px-5 md:w-2/3 xl:w-1/3">
          <h2>Authorization</h2>
          <RadioItems
            items={[
              { label: "None", id: "none", checked: authType === "none" },
              { label: "Api Key", id: "apiKey", checked: authType === "apiKey" },
              { label: "JWT", id: "jwt", checked: authType === "jwt" },
            ]}
            handleChange={(e) => {
              setAuthType(e.target.value);
              setFormModified(true);
            }}
            group="authType"
          />
          <div className="relative">
            <label htmlFor="authToken" className="form-label">
              {authType}
            </label>
            <input
              type="text"
              name="authToken"
              className="form-input"
              disabled={authType === "none"}
              required={authType !== "none"}
              defaultValue={authToken}
              onChange={() => setFormModified(true)}
            />
          </div>
          <h2>Target Gateway</h2>
          <div className="relative">
            <label htmlFor="userIdInput" className="form-label">
              Gravitee HRID
            </label>
            <input
              type="text"
              name="userIdInput"
              className="form-input"
              required
              disabled
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
        </fieldset>
      </main>
    </form>
  );
}

const RadioItems = ({ items, handleChange, group }) => (
  <ul className=" w-2/3 items-center rounded-xl text-sm font-medium outline outline-[1px] outline-offset-4 outline-space-neutral-100/50 sm:flex">
    {items.map((item) => (
      <li key={item.id} className="w-full">
        <div className="form-radio flex items-center">
          <input
            name={group}
            id={item.id}
            value={item.id}
            defaultChecked={item.checked}
            onClick={handleChange}
            type="radio"
            className="fixed opacity-0"
          />
          <label
            htmlFor={item.id}
            className="w-full cursor-pointer rounded-xl py-3 text-center text-sm font-medium"
          >
            {item.label}
          </label>
        </div>
      </li>
    ))}
  </ul>
);
