import { FiLock, FiZap } from "react-icons/fi";
import oneBar from "../assets/oneBar.svg";
import twoBar from "../assets/twoBar.svg";
import Card from "../components/Card";
import CustomHeader from "../components/CustomHeader";

export default function Home() {
  const tutorial_options = [
    {
      subtitle: "Beginner Use Case",
      difficulty: "Beginner",
      difficultyIcon: oneBar,
      mainIcon: <FiZap size="40" />,
      title: "Gateway APIs and Policies",
      description:
        "This tutorial demonstrates Gravitee's core features which include managing and deploying a Gateway API and applying API access restrictions with a policy.",
      gatewayApiType: "Proxy",
      entrypoint: "REST",
      endpoint: "REST",
      planSecurity: "Keyless",
      policies: "Quota",
      href: "https://documentation.gravitee.io/apim/getting-started/tutorials/comprehensive",
      guideUser: true,
    },
    {
      subtitle: "Intermediate Use Case",
      difficulty: "Intermediate",
      difficultyIcon: twoBar,
      mainIcon: <FiLock size="40" />,
      title: "Security and Protocol Mediation",
      description:
        "This tutorial showcases APIM's event-native API management capabilities that can manage, secure, and mediate between both asynchronous and synchronous protocols.",
      gatewayApiType: "Message",
      entrypoint: "HTTP POST, WebSocket",
      endpoint: "Kafka",
      planSecurity: "API Key",
      policies: "Latency",
      href: "https://documentation.gravitee.io/apim/getting-started/tutorials/real-time-data-and-protocol-mediation",
    },
    // {
    //   subtitle: "Advanced Use Case",
    //   difficulty: "Advanced",
    //   difficultyIcon: threeBar,
    //   mainIcon: <FiCpu size="40" />,
    //   title: "Enhanced Security and Developer Portal",
    //   description:
    //     "This tutorial details a hypothetical monetization use case that requires a more complex implementation and use of Gravitee's Developer Portal for API productization.",
    //   gatewayApiType: "Proxy",
    //   entrypoint: "REST",
    //   endpoint: "REST",
    //   planSecurity: "JWT",
    //   policies: "Assign Metrics, Transform Headers",
    //   href: "https://documentation.gravitee.io/apim/getting-started/tutorials/comprehensive",
    // },
  ];

  return (
    <>
      <CustomHeader title="Home"></CustomHeader>
      <div className="flex w-full flex-col items-center px-12 gap-5">
        <h2>{"Welcome to Gravitee's API Management Trial App"}</h2>
        <p>
          This app has been built for you to experience the full benefits of API
          Management with your trial.
        </p>
        <p>
          {
            "The introductory use case: Basic Security and Access Control, should be completed first. The advanced use cases can then be completed in any order to experience the breadth of Gravitee API Management's (APIM) capabilities. Selecting a path will open up the relevant documentation in a new tab."
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
