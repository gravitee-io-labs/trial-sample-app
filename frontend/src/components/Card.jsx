import { Link } from "react-router-dom";

export default function Card({
  title,
  description,
  architecture,
  entrypoint,
  endpoint,
  planSecurity,
  policies,
}) {
  return (
    <Link
      to="/todos"
      className="h-[26rem] w-80 border border-solid p-5 shadow-lg transition-transform duration-300 ease-in-out hover:translate-y-[-4px]"
    >
      <h3 className="">{title}</h3>
      <div>{description}</div>
      <br />
      <div>
        <em>Gateway Architecture: </em>
        {architecture}
      </div>
      <div>
        <em>Entrypoint: </em>
        {entrypoint}
      </div>
      <div>
        <em>Endpoint: </em>
        {endpoint}
      </div>
      <div>
        <em>Plan Security: </em>
        {planSecurity}
      </div>
      <div>
        <em>Policies: </em>
        {policies}
      </div>
    </Link>
  );
}
