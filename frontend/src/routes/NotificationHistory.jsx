import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
import NoData from "../components/NoData";

export default function NotificationHistory() {
  const { kafkaData } = useOutletContext();

  return (
    <>
      <CustomHeader title="Notification Center" buttonType="reset"></CustomHeader>
      {kafkaData.length ? (
        <div className="flex flex-col-reverse items-center gap-10 px-12">
          {kafkaData.map((item) => (
            <div
              className="flex w-11/12 flex-grow items-center justify-center rounded-xl bg-gray-300 p-5 text-lg text-black shadow-xl md:w-2/3 xl:w-1/3"
              key={item.datetime}
            >
              {`Todo ${item.action} at ${item.time} ${item.timeZone} on ${item.date}`}
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
