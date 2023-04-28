import { useOutletContext } from "react-router-dom";

export default function NotificationHistory() {
  const { kafkaData } = useOutletContext();

  return (
    <>
      <h1 className="sticky top-0 mb-8 flex items-center justify-center bg-content/80 text-4xl font-bold">
        Notification Center
      </h1>
      <div className="flex flex-col-reverse items-center gap-10 xl:px-64">
        {kafkaData.length ? (
          kafkaData.map((item) => (
            <div
              className="flex w-11/12 flex-grow items-center justify-center rounded-xl bg-secondary p-5 text-lg text-white md:w-2/3"
              key={item.datetime}
            >
              {`Todo ${item.action} at ${item.time} GMT on ${item.date}`}
            </div>
          ))
        ) : (
          <h2 className="mt-5 text-2xl font-semibold">
            There is no data or the websocket connection was closed. Refresh the page to
            re-establish the connection.
          </h2>
        )}
      </div>
    </>
  );
}
