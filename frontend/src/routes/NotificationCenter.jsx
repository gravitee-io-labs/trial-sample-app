import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
import NoData from "../components/NoData";

export default function NotificationCenter() {
  const { kafkaData } = useOutletContext();

  return (
    <>
      <CustomHeader title="Notification Center" buttonType="reset"></CustomHeader>
      {kafkaData.length ? (
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
      ) : (
        <NoData />
      )}
    </>
  );
}
