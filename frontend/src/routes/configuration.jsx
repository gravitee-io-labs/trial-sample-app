export default function Configuration() {
  return (
    <main className="flex flex-grow flex-col items-center">
      <div className="mb-10 border-b-2 border-secondary pb-8 text-4xl text-black">
        <p>
          Settings<span className="ml-1 text-6xl text-accent-cyan">.</span>
        </p>
      </div>
      <form action id="form" className="w-auto px-5">
        <fieldset className="flex flex-col gap-10">
          <div className="flex items-center justify-center gap-10">
            <div className="relative">
              <label
                for="first-name"
                className="absolute left-[0.25rem] top-[0.25rem] mx-2 text-sm font-bold text-[#9ca3af]"
              >
                First Name
              </label>
              <input
                type="text"
                name="first-name"
                className="w-full rounded-xl border bg-[#f3f3f3] px-3 pb-2 pt-8 font-sans text-xl font-bold text-black shadow focus:shadow-inner focus:outline-none focus:valid:shadow-accent-cyan focus:invalid:shadow-red-700"
                required
              />
            </div>
            <div className="relative">
              <label
                for="last-name"
                className="absolute left-[0.25rem] top-[0.25rem] mx-2 text-sm font-bold text-[#9ca3af]"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last-name"
                className="w-full rounded-xl border bg-[#f3f3f3] px-3 pb-2 pt-8 font-sans text-xl font-bold text-black shadow focus:shadow-inner focus:outline-none focus:valid:shadow-accent-cyan focus:invalid:shadow-red-700"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label
              for="email"
              className="absolute left-[0.25rem] top-[0.25rem] mx-2 text-sm font-bold text-[#9ca3af]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full rounded-xl border bg-[#f3f3f3] px-3 pb-2 pt-8 font-sans text-xl font-bold text-black shadow focus:shadow-inner focus:outline-none focus:valid:shadow-accent-cyan focus:invalid:shadow-red-700"
              required
            />
          </div>
          <div className="relative">
            <label
              for="phone"
              className="absolute left-[0.25rem] top-[0.25rem] mx-2 text-sm font-bold text-[#9ca3af]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full rounded-xl border bg-[#f3f3f3] px-3 pb-2 pt-8 font-sans text-xl font-bold text-black shadow focus:shadow-inner focus:outline-none focus:valid:shadow-accent-cyan focus:invalid:shadow-red-700"
              required
            />
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="relative">
              <label
                for="password"
                className="absolute left-[0.25rem] top-[0.25rem] mx-2 text-sm font-bold text-[#9ca3af]"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full rounded-xl border bg-[#f3f3f3] px-3 pb-2 pt-8 font-sans text-xl font-bold text-black shadow focus:shadow-inner focus:outline-none focus:valid:shadow-accent-cyan focus:invalid:shadow-red-700"
                required
              />
              <p className="hide-message absolute text-red-600" id="password-match">
                * Passwords do not match
              </p>
            </div>
            <div className="relative">
              <label
                for="confirm-password"
                className="absolute left-[0.25rem] top-[0.25rem] mx-2 text-sm font-bold text-[#9ca3af]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="w-full rounded-xl border bg-[#f3f3f3] px-3 pb-2 pt-8 font-sans text-xl font-bold text-black shadow focus:shadow-inner focus:outline-none focus:valid:shadow-accent-cyan focus:invalid:shadow-red-700"
                required
              />
            </div>
          </div>
          <button
            className="h-14 w-full self-center rounded-md bg-accent-cyan/80 font-bold tracking-wider text-black shadow-md shadow-accent-cyan/30"
            type="submit"
            id="submitForm"
          >
            Create Account
          </button>
          <p className="self-center text-black">
            Already have an account?{" "}
            <a href="" className="text-secondary">
              Sign in
            </a>
          </p>
        </fieldset>
      </form>
    </main>
  );
}
