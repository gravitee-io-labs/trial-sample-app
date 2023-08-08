import logo from "../assets/Gravitee.io Dark Blue Logo.png";
import { ResetButton, SaveFormButton } from "./CustomButtons";

export default function CustomHeader({
  title,
  buttonType = "none",
  disabledButton = false,
}) {
  return (
    <div className="sticky top-0 z-40 mb-4 flex w-full flex-col items-center justify-between gap-5 bg-dove-neutral-100/80 px-12 py-4 drop-shadow-md sm:flex-row xl:px-64">
      <h1>{title}</h1>
      {buttonType === "none" && (
        <a
          className=" hidden md:block"
          href="http://gravitee.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Gravitee Logo" width="200"></img>
        </a>
      )}
      {buttonType === "reset" && <ResetButton analyticsEnabled={disabledButton} />}
      {buttonType === "save" && <SaveFormButton formModified={disabledButton} />}
    </div>
  );
}
