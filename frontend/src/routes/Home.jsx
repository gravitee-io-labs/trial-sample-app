import { FiLock } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import oneBar from "../assets/oneBar.svg";
import Card from "../components/Card";
import CustomHeader from "../components/CustomHeader";

export default function Home() {
  const { fromPendoTutorial } = useOutletContext();

  const tutorial_options = [
    // {
    //   subtitle: "Beginner Use Case",
    //   difficulty: "Beginner",
    //   difficultyIcon: oneBar,
    //   mainIcon: <FiZap size="40" />,
    //   title: "Gateway APIs and Policies",
    //   description:
    //     "This tutorial demonstrates Gravitee's core features which include managing and deploying a Gateway API and applying API access restrictions with a policy.",
    //   gatewayApiType: "Proxy",
    //   entrypoint: "REST",
    //   endpoint: "REST",
    //   planSecurity: "Keyless",
    //   policies: "Quota",
    //   href: fromPendoTutorial
    //     ? "https://documentation.gravitee.io/apim/getting-started/tutorials/comprehensive#trial-app-architecture"
    //     : "https://documentation.gravitee.io/apim/getting-started/tutorials/comprehensive",
    //   guideUser: true,
    // },
    {
      subtitle: "Beginner Use Case",
      difficulty: "Beginner",
      difficultyIcon: oneBar,
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
      <div className="flex w-full flex-col items-center gap-5 px-12">
        <h2>{"Welcome to Gravitee's API Management Sample App"}</h2>
        {fromPendoTutorial ? (
          <p>
            To learn how to test your Gateway API, first open the relevant
            documentation by selecting the highlighted
            <strong>Gateway APIs and Policies</strong> card below!
          </p>
        ) : (
          <>
            <p>
              This sample app has been built to showcase Gravitee API Management
              (APIM) functionality with practical use cases.
            </p>
            <p>
              {
                "The available use cases can be completed in any order to experience the breadth of Gravitee APIM's capabilities. Selecting a path will open up the relevant documentation in a new tab."
              }
            </p>
          </>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-5">
          {tutorial_options.map((tutorial) => (
            <Card {...tutorial} key={tutorial.title}></Card>
          ))}
        </div>
      </div>
    </>
  );
}
