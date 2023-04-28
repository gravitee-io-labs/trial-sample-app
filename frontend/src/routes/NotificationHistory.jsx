import { useOutletContext } from "react-router-dom";

export default function NotificationHistory() {
  const { kafkaData } = useOutletContext();

  return (
    <div>
      {kafkaData.length ? (
        kafkaData.map((item) => <div key={item.datetime}>{item.datetime}</div>)
      ) : (
        <h1>
          There is no data or the websocket connection was closed. Refresh the page to
          reestablish the connection.
        </h1>
      )}
    </div>
  );
}
