import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

export default function NotificationHistory() {
  const { kafkaData } = useOutletContext();

  return (
    <>
      <CustomHeader title="Notification Center" includeReset={true}></CustomHeader>
      <div className="xl:px-64">
        <div className="flex flex-col-reverse items-center gap-10">
          {kafkaData.length ? (
            kafkaData.map((item) => (
              <div
                className="flex w-11/12 flex-grow items-center justify-center rounded-xl bg-gray-300 p-5 text-lg text-black shadow-xl md:w-2/3"
                key={item.datetime}
              >
                {`Todo ${item.action} at ${item.time} GMT on ${item.date}`}
              </div>
            ))
          ) : (
            <h2 className="mt-5 text-2xl font-semibold">
              There is no data or the websocket connection was closed. Refresh the page
              to re-establish the connection.
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
