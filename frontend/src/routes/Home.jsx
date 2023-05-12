import CustomHeader from "../components/CustomHeader";

export default function NotificationHistory() {
  return (
    <>
      <CustomHeader title="Home"></CustomHeader>
      <div className="xl:px-[30rem]">
        <h2 className="text-2xl font-bold">
          Welcome to Gravitee's API Management Trial App
        </h2>
        <div>
          This app has been built for you to experience the full benefits of API
          Management with your trial.
          <br></br>
          Before you start, head to the configuration area to link this app to your API
          Management installation. In this app you can experience the following
          demonstrations of the power of APIs!
        </div>
      </div>
    </>
  );
}
