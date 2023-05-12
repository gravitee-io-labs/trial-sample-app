import logo from "../assets/Gravitee.io Dark Blue Logo.png";
import ResetButton from "./ResetButton";

export default function CustomHeader({ title, includeReset = false }) {
  return (
    <div className="sticky top-0 mb-4 flex w-full flex-col items-center justify-between gap-5 bg-content/80 px-12 py-4 drop-shadow-md sm:flex-row xl:px-64">
      <h1 className=" text-center text-4xl font-bold">{title}</h1>
      {includeReset ? (
        <ResetButton />
      ) : (
        <a
          className=" hidden md:block"
          href="http://gravitee.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Gravitee Logo" width="200"></img>
        </a>
      )}
    </div>
  );
}
