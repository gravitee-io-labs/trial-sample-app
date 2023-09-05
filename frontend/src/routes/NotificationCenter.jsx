import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
import NoData from "../components/NoData";

export default function NotificationCenter() {
  const { kafkaData, analytics, websocketDisconnected, authType } = useOutletContext();

  return (
    <>
      <CustomHeader
        title="Notification Center"
        buttonText="Clear Data"
        buttonType="reset"
      ></CustomHeader>
      {analytics === "off" ? (
        <NoData message="Analytics data is currently turned off in your Configuration settings. If needed, the tutorial will advise you to enable this feature." />
      ) : websocketDisconnected ? (
        <NoData message="One or more WebSocket connections have failed. Please refresh the page." />
      ) : authType !== "apiKey" ? (
        <NoData message="Access to real-time data requires you to provide an API key in the configuration page." />
      ) : !kafkaData.length ? (
        <NoData message="There is no data yet. Create, complete, archive, or delete todos to generate data." />
      ) : (
        <div className="flex flex-col-reverse items-center gap-10 px-12">
          {kafkaData.map((item) => (
            <div
              className="flex w-11/12 flex-grow items-center justify-center border-2 border-space-neutral-200 p-5 text-lg text-black shadow-lg md:w-2/3 xl:w-1/3"
              key={item.date + item.time}
            >
              {`Todo ${item.action} at ${item.time} ${item.timeZone} on ${item.date}`}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
