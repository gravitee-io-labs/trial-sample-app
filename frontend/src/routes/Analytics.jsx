import { ResponsiveBar } from "@nivo/bar";
import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
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
  const { kafkaData, delayedKafkaData } = useOutletContext();

  const graphData = countObjectsByProperty(kafkaData, "action");

  const delayedGraphData = countObjectsByProperty(delayedKafkaData, "action");

  return (
    <div className="h-[80vh]">
      <CustomHeader title="Analytics" buttonType="reset"></CustomHeader>
      {kafkaData.length || delayedKafkaData.length ? (
        <div className="graph-grid h-full px-6">
          <h2>Real-time Graph</h2>
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
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            colorBy="index"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Action",
              legendPosition: "middle",
              legendOffset: 45,
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
            legends={[
              {
                dataFrom: "indexes",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            ariaLabel="Todo actions bar graph"
          />
          <h2>Delayed Graph</h2>
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
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            colorBy="index"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Action",
              legendPosition: "middle",
              legendOffset: 45,
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
            legends={[
              {
                dataFrom: "indexes",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            ariaLabel="Todo actions bar graph with latency"
          />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
