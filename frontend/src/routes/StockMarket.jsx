import { ResponsiveBar } from "@nivo/bar";
import { useOutletContext } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

const stockOptions = [
  { name: "Gravitee", shares: "20", price: "$99" },
  { name: "Kong", shares: "20", price: "$99" },
  { name: "Apigee", shares: "20", price: "$99" },
  { name: "Tinybird", shares: "20", price: "$99" },
  { name: "Confluent", shares: "20", price: "$99" },
  { name: "Tyk", shares: "20", price: "$99" },
  { name: "Solo", shares: "20", price: "$99" },
  { name: "AWS", shares: "20", price: "$99" },
  { name: "Aklivity", shares: "20", price: "$99" },
];

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
  // Convert the object into an array of objects
  const unsortedArray = Object.values(counts);
  // Sort the array of objects based on the "action" key value
  return unsortedArray.slice().sort((a, b) => a.action.localeCompare(b.action));
};

export default function StockMarket() {
  const { kafkaData } = useOutletContext();
  const graphData = countObjectsByProperty(kafkaData, "action");

  return (
    <div className="flex h-screen flex-col">
      <CustomHeader title="Stock Market"></CustomHeader>
      <div className="flex h-full overflow-clip px-10">
        <div className="flex h-full max-h-full flex-auto flex-col overflow-x-auto overflow-y-clip pb-10">
          <h2 className="m-0">Selected Stock</h2>
          <div className="h-[99%] flex-auto">
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
              colors={["#deebf7", "#c6dbef", "#9ecae1", "#6bafd6"]}
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
        </div>
        <div className="flex flex-col overflow-y-auto">
          {stockOptions.map((stock) => (
            <div
              className="flex w-full justify-center border-2 border-space-neutral-200 p-5 text-lg text-black shadow-lg"
              key={stock.name}
            >
              {`${stock.name} Price: ${stock.price} Shares: ${stock.shares}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
