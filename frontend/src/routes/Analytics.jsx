import { ResponsiveBar } from "@nivo/bar";
import { useOutletContext } from "react-router-dom";
import NoData from "../components/NoData";

const countObjectsByProperty = (arr, prop) => {
  const counts = {};
  for (let obj of arr) {
    const value = obj[prop];
    if (counts[value]) {
      counts[value].quantity++;
    } else {
      counts[value] = {
        [prop]: value,
        quantity: 1,
      };
    }
  }
  return Object.values(counts);
};

export default function Analytics() {
  const { kafkaData, delayedKafkaData, analytics, websocketDisconnected } =
    useOutletContext();

  const graphData = countObjectsByProperty(kafkaData, "action");

  const delayedGraphData = countObjectsByProperty(delayedKafkaData, "action");

  return (
    <>
      {analytics === "off" ? (
        <NoData message="Analytics are currently turned off in your Configuration settings." />
      ) : websocketDisconnected ? (
        <NoData message="One or more WebSocket connections have failed. Please refresh the page." />
      ) : kafkaData.length || delayedKafkaData.length ? (
        <div className="graph-grid h-[40vh] min-h-[40vh] px-2 xl:h-[80vh] xl:max-h-[80vh] xl:w-[50vw] xl:min-w-[50vw] xl:px-0 xl:pt-5">
          <h2 className="m-0">Real-time Graph</h2>
          {/* Added container due to bug detailed here: https://github.com/plouc/nivo/issues/411 */}
          <div className="h-[99%]">
            <ResponsiveBar
              data={graphData}
              keys={["quantity"]}
              tooltip={({ id, value }) => (
                <div
                  style={{
                    background: "white",
                    color: "inherit",
                    fontSize: "inherit",
                    borderRadius: "2px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
                    padding: "5px 9px",
                  }}
                >
                  <strong>
                    {id}: {value}
                  </strong>
                </div>
              )}
              indexBy="action"
              margin={{ top: 30, right: 25, bottom: 80, left: 60 }}
              padding={0}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              colorBy="index"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 50,
                legend: "Action",
                legendPosition: "middle",
                legendOffset: 75,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Quantity",
                legendPosition: "middle",
                legendOffset: -45,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              ariaLabel="Todo actions bar graph"
            />
          </div>
          <h2 className="m-0">Delayed Graph</h2>
          {/* Added container due to bug detailed here: https://github.com/plouc/nivo/issues/411 */}
          <div className="h-[99%]">
            <ResponsiveBar
              data={delayedGraphData}
              keys={["quantity"]}
              tooltip={({ id, value }) => (
                <div
                  style={{
                    background: "white",
                    color: "inherit",
                    fontSize: "inherit",
                    borderRadius: "2px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
                    padding: "5px 9px",
                  }}
                >
                  <strong>
                    {id}: {value}
                  </strong>
                </div>
              )}
              indexBy="action"
              margin={{ top: 30, right: 25, bottom: 80, left: 60 }}
              padding={0}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              colorBy="index"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 50,
                legend: "Action",
                legendPosition: "middle",
                legendOffset: 75,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Quantity",
                legendPosition: "middle",
                legendOffset: -45,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              ariaLabel="Todo actions bar graph with latency"
            />
          </div>
        </div>
      ) : (
        <NoData message="There is no data yet. Create, complete, archive, or delete todos to generate data." />
      )}
    </>
  );
}
