import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Configuration() {
  const [authRequired, setAuthRequired] = useState(false);
  const [host, setHost] = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setHost(e.target.hostInput.value);
  };

  return (
    <main className="flex flex-grow flex-col items-center">
      <div className="mb-10 border-b-2 border-secondary pb-8 text-4xl text-black">
        <h1>
          Settings<span className="ml-1 text-6xl text-accent-cyan">.</span>
        </h1>
      </div>
      <form action id="form" onSubmit={handleSubmit} className="w-96 px-5">
        <fieldset className="flex flex-col gap-10">
          <h2 className=" text-2xl font-bold">Authorization</h2>
          <Toggle
            label={"Authorization required?"}
            handleChange={() => {
              setAuthRequired(!authRequired);
            }}
          />
          <div className="relative">
            <label for="api-key" className="form-label">
              API Key
            </label>
            <input
              type="text"
              name="api-key"
              className="form-input"
              disabled={!authRequired}
              required={!authRequired}
            />
          </div>
          <div className="relative">
            <label for="hostInput" className="form-label">
              Host
            </label>
            <input
              type="text"
              name="hostInput"
              className="form-input"
              required
              defaultValue={host}
            />
          </div>
          <button
            className="h-14 w-full self-center rounded-md bg-accent-cyan/80 font-bold tracking-wider text-black shadow-md shadow-accent-cyan/30"
            type="submit"
            id="submitForm"
          >
            Save
          </button>
        </fieldset>
      </form>
    </main>
  );
}

const Toggle = ({ label, handleChange }) => (
  <label class="relative inline-flex max-w-max cursor-pointer items-center">
    <input type="checkbox" value="" class="peer sr-only" onChange={handleChange} />
    <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      {label}
    </span>
  </label>
);
