import { FiCpu, FiLock, FiZap } from "react-icons/fi";
import oneBar from "../assets/oneBar.svg";
import threeBar from "../assets/threeBar.svg";
import twoBar from "../assets/twoBar.svg";
import Card from "../components/Card";
import CustomHeader from "../components/CustomHeader";

export default function Home() {
  const tutorial_options = [
    {
      subtitle: "Scenario 1",
      difficulty: "Beginner",
      difficultyIcon: oneBar,
      mainIcon: <FiLock size="40" />,
      title: "Basic Security and Access Control",
      description:
        "This tutorial demonstrates Gravitee's core features which include securing a Gateway API, applying API access restrictions, and managing applications and subscriptions.",
      architecture: "http-proxy",
      entrypoint: "REST",
      endpoint: "REST",
      planSecurity: "API Key",
      policies: "Quota, Interrupt",
    },
    {
      subtitle: "Scenario 2",
      difficulty: "Intermediate",
      difficultyIcon: twoBar,
      mainIcon: <FiZap size="40" />,
      title: "Real-time Data and Protocol Mediation",
      description:
        "This tutorial showcases Gravitee's event-native API management capabilities that can natively handle, and mediate between, both asynchronous and synchronous protocols.",
      architecture: "message",
      entrypoint: "Websocket",
      endpoint: "Kafka",
      planSecurity: "Shared API",
      policies: "Latency, Transform Headers",
    },
    {
      subtitle: "Scenario 3",
      difficulty: "Advanced",
      difficultyIcon: threeBar,
      mainIcon: <FiCpu size="40" />,
      title: "Advanced Policies and Security",
      description:
        "This tutorial details a hypothetical monetization use-case that requires a more complex implementation.",
      architecture: "http-proxy",
      entrypoint: "REST",
      endpoint: "REST",
      planSecurity: "JWT",
      policies: "Assign Metrics, Transform Headers",
    },
  ];

  return (
    <>
      <CustomHeader title="Home"></CustomHeader>
      <div className="flex w-full flex-col items-center px-12 ">
        <h2>{"Welcome to Gravitee's API Management Trial App"}</h2>
        <p>
          This app has been built for you to experience the full benefits of API
          Management with your trial.
          <br></br>
          <br></br>
          In this app, you can choose from any of the following paths to experience the
          power of Gravitee API Management. Selecting a path will configure the
          application and open up the relevant documentation.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-5">
          {tutorial_options.map((tutorial) => (
            <Card {...tutorial} key={tutorial.title}></Card>
          ))}
        </div>
      </div>
    </>
  );
}
