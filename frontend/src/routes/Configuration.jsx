import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

export default function Configuration() {
  const {
    host,
    authToken,
    setAuthToken,
    authType,
    setAuthType,
    hrid,
    analytics,
    setAnalytics,
  } = useOutletContext();
  const [formModified, setFormModified] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update state and/or local storage values
    localStorage.setItem("userPrefAuthType", e.target.authType.value);

    setAuthToken(e.target.authToken.value);
    localStorage.setItem("userPrefAuthToken", e.target.authToken.value);

    setAnalytics(e.target.analytics.value);
    localStorage.setItem("userPrefAnalytics", e.target.analytics.value);

    // Reset save changes button after submit
    setFormModified(false);
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <CustomHeader
        title="Configuration"
        buttonText="Save Changes"
        buttonType="save"
        disabledButton={!formModified}
      ></CustomHeader>
      <main className="flex flex-grow flex-col items-center">
        <div className="flex w-11/12 flex-col gap-6 px-5 md:w-2/3 xl:w-1/3">
          <h2 className="mb-0 font-medium uppercase">General</h2>
          <h3 className="mt-0">Target Gateway</h3>
          <div className="relative">
            <label htmlFor="hridInput" className="form-label">
              Gravitee HRID
            </label>
            <SensitiveInputs
              name="hridInput"
              value={hrid}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              required={true}
              disabled={true}
            />
          </div>
          <div className="relative">
            <label htmlFor="hostInput" className="form-label">
              Fully Qualified Domain Name
            </label>
            <SensitiveInputs
              name="hostInput"
              value={host}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              required={true}
              disabled={true}
            />
          </div>
          <h2 className="mb-0 font-medium uppercase">Todo List</h2>
          <h3 className="mt-0">Authorization</h3>
          <RadioItems
            items={[
              { label: "None", id: "none", checked: authType === "none" },
              {
                label: "API Key",
                id: "apiKey",
                checked: authType === "apiKey",
              },
              { label: "JWT", id: "jwt", checked: authType === "jwt" },
            ]}
            handleChange={(e) => {
              // Auth type must be set here to immediately update label
              setAuthType(e.target.value);
              setFormModified(true);
            }}
            group="authType"
          />
          <div className="relative">
            <label htmlFor="authToken" className="form-label">
              {authType}
            </label>
            <SensitiveInputs
              name="authToken"
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              disabled={authType === "none"}
              required={authType !== "none"}
              defaultValue={authToken}
              onChange={() => setFormModified(true)}
            />
          </div>
          <h3>Analytic Graphs</h3>
          <RadioItems
            items={[
              { label: "Off", id: "off", checked: analytics === "off" },
              { label: "On", id: "on", checked: analytics === "on" },
              {
                label: "On with history",
                id: "on-history",
                checked: analytics === "on-history",
              },
            ]}
            handleChange={() => {
              setFormModified(true);
            }}
            group="analytics"
          />
          <h2 className="font-medium uppercase">Stock Market</h2>
        </div>
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

const SensitiveInputs = ({
  name,
  isVisible,
  setIsVisible,
  value,
  defaultValue,
  required,
  disabled,
  onChange,
}) => (
  <div className="flex">
    <input
      type={isVisible ? "text" : "password"}
      name={name}
      className="form-input pr-10"
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
    />
    <button
      className="flex items-center justify-around"
      onClick={() => setIsVisible(!isVisible)}
      type="button"
    >
      {isVisible ? (
        <FiEyeOff size="20" className="absolute mr-10" />
      ) : (
        <FiEye size="20" className="absolute mr-10" />
      )}
    </button>
  </div>
);
