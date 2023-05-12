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
    <>
      <CustomHeader title="Configuration"></CustomHeader>
      <main className="flex flex-grow flex-col items-center">
        <form action id="form" onSubmit={handleSubmit} className="w-96 px-5">
          <fieldset className="flex flex-col gap-10">
            <button
              className={`h-10 w-1/2 self-center rounded-md font-bold tracking-wider text-black shadow-md ${
                formModified
                  ? "bg-accent-cyan/80 shadow-accent-cyan/30 hover:opacity-70"
                  : "cursor-not-allowed bg-gray-300 shadow-gray-300/30"
              }`}
              type="submit"
              id="submitForm"
            >
              Save Changes
            </button>
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
            <h2 className=" text-2xl font-bold">Target Server</h2>
            <div className="relative">
              <label htmlFor="hostInput" className="form-label">
                Fully Qualified Domain Name
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
              userLabel={"Enable Premium Access"}
              handleChange={() => {
                setFormModified(true);
                setAuthRequired(!authRequired);
              }}
              htmlName="authRequired"
              defaultValue={authRequired}
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
                required={!authRequired}
                defaultValue={apiKey}
                onChange={() => setFormModified(true)}
              />
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
}

const Toggle = ({ userLabel, htmlName, handleChange, defaultValue }) => (
  <label className="relative inline-flex max-w-max cursor-pointer items-center">
    <input
      type="checkbox"
      name={htmlName}
      defaultChecked={defaultValue}
      className="peer sr-only"
      onClick={handleChange}
    />
    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
    <span className="ml-3 text-sm font-medium text-gray-900">{userLabel}</span>
  </label>
);
