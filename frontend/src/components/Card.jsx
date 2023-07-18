import { Link } from "react-router-dom";
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
}) {
  return (
    <Link
      to="/todos"
      className="group flex h-[35rem] w-[28rem] flex-col border border-solid p-6 shadow-xl transition-transform duration-300 ease-in-out hover:translate-y-[-4px]"
    >
      <div className="flex items-center">
        <p className=" font-bold">{subtitle}</p>
        <img src={difficultyIcon} alt="difficulty icon" className="ml-auto mr-3" />
        <Pill text={difficulty}></Pill>
      </div>
      <div className="my-8 flex items-center justify-center">{mainIcon}</div>
      <h3 className="mt-0">{title}</h3>
      <div className="mt-6">{description}</div>
      <br />
      <div className=" list-item list-inside">
        <em>Gateway API Type: </em>
        {gatewayApiType}
      </div>
      <div className=" list-item list-inside">
        <em>Entrypoint: </em>
        {entrypoint}
      </div>
      <div className=" list-item list-inside">
        <em>Endpoint: </em>
        {endpoint}
      </div>
      <div className=" list-item list-inside">
        <em>Plan Security: </em>
        {planSecurity}
      </div>
      <div className=" list-item list-inside">
        <em>Policies: </em>
        {policies}
      </div>
      <div className="mt-auto flex items-center justify-center">
        <BaseButton text="Get Started" />
      </div>
    </Link>
  );
}
