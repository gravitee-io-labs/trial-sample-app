import CustomHeader from "../components/CustomHeader";

export default function NotificationHistory() {
  return (
    <>
      <CustomHeader title="Home"></CustomHeader>
      <div className="flex w-full flex-col items-center px-12 ">
        <h2 className="">Welcome to Gravitee's API Management Trial App</h2>
        <p>
          This app has been built for you to experience the full benefits of API
          Management with your trial.
          <br></br>
          <br></br>
          In this app, you can choose from any of the following paths to experience the
          power of Gravitee API Management. Selecting a path will configure the
          application and open up the relevant documentation.
        </p>
      </div>
    </>
  );
}
