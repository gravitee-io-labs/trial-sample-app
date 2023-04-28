import { useOutletContext } from "react-router-dom";

export default function NotificationHistory() {
  const { kafkaData } = useOutletContext();

  return (
    <div className="flex flex-col-reverse items-center gap-10 px-72">
      {kafkaData.length ? (
        kafkaData.map((item) => (
          <div
            className="flex h-16 w-2/3 items-center justify-center rounded-xl bg-secondary text-lg text-white"
            key={item.datetime}
          >
            {`Todo ${item.action} at ${item.time} GMT on ${item.date}`}
          </div>
        ))
      ) : (
        <h1 className="pt-10 text-4xl font-bold">
          There is no data or the websocket connection was closed. Refresh the page to
          re-establish the connection.
        </h1>
      )}
    </div>
  );
}
