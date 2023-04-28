import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Configuration() {
  const [authRequired, setAuthRequired] = useState(false);
  const { host, setHost } = useOutletContext();
  const [formModified, setFormModified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setHost(e.target.hostInput.value);
    localStorage.setItem("userPrefHost", e.target.hostInput.value);

    setFormModified(false);
  };

  return (
    <main className="flex flex-grow flex-col items-center">
      <div className="mb-10 border-b-2 border-secondary pb-8 text-4xl text-black">
        <h1>
          Configuration<span className="ml-1 text-6xl text-accent-cyan">.</span>
        </h1>
      </div>
      <form action id="form" onSubmit={handleSubmit} className="w-96 px-5">
        <fieldset className="flex flex-col gap-10">
          <button
            className={`h-10 w-1/2 self-center rounded-md font-bold tracking-wider text-black shadow-md shadow-accent-cyan/30 ${
              formModified
                ? "bg-accent-cyan/80 shadow-accent-cyan/30 hover:opacity-70"
                : "cursor-not-allowed bg-gray-300 shadow-gray-300/30"
            }`}
            type="submit"
            id="submitForm"
          >
            Save Changes
          </button>
          <h2 className=" text-2xl font-bold">Target Server</h2>
          <div className="relative">
            <label htmlFor="hostInput" className="form-label">
              Host
            </label>
            <input
              type="text"
              name="hostInput"
              className="form-input"
              required
              defaultValue={host}
              onChange={() => setFormModified(true)}
            />
          </div>
          <h2 className=" text-2xl font-bold">Authorization</h2>
          <Toggle
            label={"Enable Premium Access"}
            handleChange={() => {
              setAuthRequired(!authRequired);
              setFormModified(true);
            }}
          />
          <div className="relative">
            <label htmlFor="api-key" className="form-label">
              API Key
            </label>
            <input
              type="text"
              name="api-key"
              className="form-input"
              disabled={!authRequired}
              required={!authRequired}
              onChange={() => setFormModified(true)}
            />
          </div>
        </fieldset>
      </form>
    </main>
  );
}

const Toggle = ({ label, handleChange }) => (
  <label className="relative inline-flex max-w-max cursor-pointer items-center">
    <input type="checkbox" value="" className="peer sr-only" onChange={handleChange} />
    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      {label}
    </span>
  </label>
);
