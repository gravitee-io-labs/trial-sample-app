import Card from "../components/Card";
import CustomHeader from "../components/CustomHeader";

export default function Home() {
  const tutorial_options = [
    {
      title: "Basic Security and Access Control",
      description: "A basic example of a Gravitee's core features",
      architecture: "http-proxy",
      entrypoint: "REST",
      endpoint: "REST",
      planSecurity: "API Key",
      policies: "Quota",
    },
    {
      title: "Real-time Data and Protocol Mediation",
      description: "A basic example of a Gravitee's core features",
      architecture: "message introspection",
      entrypoint: "Websocket",
      endpoint: "Kafka",
      planSecurity: "API Key",
      policies: "Latency",
    },
    {
      title: "Advanced Policies and Security",
      description: "A basic example of a Gravitee's core features",
      architecture: "message introspection",
      entrypoint: "Websocket",
      endpoint: "Kafka",
      planSecurity: "JWT",
      policies: "Assign Metrics",
    },
  ];

  return (
    <>
      <CustomHeader title="Home"></CustomHeader>
      <div className="flex w-full flex-col items-center px-12 ">
        <h2 className="">Welcome to Gravitee's API Management Trial App</h2>
        <p>
          This app has been built for you to experience the full benefits of API
          Management with your trial.
          <br></br>
          <br></br>
          In this app, you can choose from any of the following paths to experience the
          power of Gravitee API Management. Selecting a path will configure the
          application and open up the relevant documentation.
        </p>
        <div className="mt-6 flex flex-col gap-5 lg:flex-row">
          {tutorial_options.map((tutorial) => (
            <Card {...tutorial} key={tutorial.title}></Card>
          ))}
        </div>
      </div>
    </>
  );
}
