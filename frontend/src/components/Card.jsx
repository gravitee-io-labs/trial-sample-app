import { useOutletContext } from "react-router-dom";
import { BaseButton } from "./CustomButtons.jsx";
import Pill from "./Pill.jsx";

export default function Card({
  subtitle,
  difficulty,
  difficultyIcon,
  mainIcon,
  title,
  description,
  gatewayApiType,
  entrypoint,
  endpoint,
  planSecurity,
  policies,
  href,
  guideUser = false, // used for adding styling to guide user starting from pendo guide
}) {
  const { fromPendoTutorial, setFromPendoTutorial } = useOutletContext();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => (guideUser ? setFromPendoTutorial("") : "")}
      className={`group flex h-[35rem] w-[28rem] flex-col border border-solid p-6 shadow-xl transition-transform duration-300 ease-in-out hover:translate-y-[-4px] ${
        fromPendoTutorial && guideUser
          ? "highlight-card"
          : fromPendoTutorial
          ? "other-cards"
          : ""
      }`}
    >
      <div className="flex items-center">
        <p className=" flex-grow font-bold">{subtitle}</p>
        <img src={difficultyIcon} alt="difficulty icon" className="ml-auto mr-3" />
        <Pill text={difficulty}></Pill>
      </div>
      <div className="my-8 flex items-center justify-center">{mainIcon}</div>
      <h3 className="mt-0">{title}</h3>
      <div className="mt-6">{description}</div>
      <br />
      <div>
        <strong>Gateway API Type: </strong>
        {gatewayApiType}
      </div>
      <div>
        <strong>Entrypoint: </strong>
        {entrypoint}
      </div>
      <div>
        <strong>Endpoint: </strong>
        {endpoint}
      </div>
      <div>
        <strong>Plan Security: </strong>
        {planSecurity}
      </div>
      <div>
        <strong>Policies: </strong>
        {policies}
      </div>
      <div className="mt-auto flex items-center justify-center">
        <BaseButton text={fromPendoTutorial ? "Continue" : "Get Started"} />
      </div>
    </a>
  );
}
