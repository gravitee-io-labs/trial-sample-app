import { FiCpu, FiLock, FiZap } from "react-icons/fi";
import oneBar from "../assets/oneBar.svg";
import threeBar from "../assets/threeBar.svg";
import twoBar from "../assets/twoBar.svg";
import Card from "../components/Card";
import CustomHeader from "../components/CustomHeader";

export default function Home() {
  const tutorial_options = [
    {
      subtitle: "Introductory Use Case",
      difficulty: "Beginner",
      difficultyIcon: oneBar,
      mainIcon: <FiLock size="40" />,
      title: "Basic Security and Access Control",
      description:
        "This tutorial details how this application works then demonstrates APIM's core functionality which includes deploying and securing a Gateway API, applying API access restrictions, and managing applications and subscriptions.",
      gatewayApiType: "Proxy",
      entrypoint: "REST",
      endpoint: "REST",
      planSecurity: "API Key",
      policies: "Quota",
    },
    {
      subtitle: "Advanced Use Case 1",
      difficulty: "Intermediate",
      difficultyIcon: twoBar,
      mainIcon: <FiZap size="40" />,
      title: "Real-time Data and Protocol Mediation",
      description:
        "This tutorial showcases APIM's event-native API management capabilities that can natively handle, and mediate between, both asynchronous and synchronous protocols.",
      gatewayApiType: "Message",
      entrypoint: "Websocket",
      endpoint: "Kafka",
      planSecurity: "Shared API Key",
      policies: "Latency",
    },
    {
      subtitle: "Advanced Use Case 2",
      difficulty: "Advanced",
      difficultyIcon: threeBar,
      mainIcon: <FiCpu size="40" />,
      title: "Advanced Policies and Developer Portal",
      description:
        "This tutorial details a hypothetical monetization use-case that requires a more complex implementation.",
      gatewayApiType: "http-proxy",
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
          {
            "In this app, you can choose from any of the following paths to experience the power of Gravitee API Management (APIM). Selecting a path will open up the relevant documentation in a new tab."
          }
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
