import { ResponsiveBar } from "@nivo/bar";

export default function Analytics() {
  const data = [
    {
      action: "Created",
      quantity: 1,
      quantityColor: "hsl(103, 70%, 50%)",
    },
    {
      action: "Completed",
      quantity: 11,
      quantityColor: "hsl(97, 70%, 50%)",
    },
    {
      action: "Archived",
      quantity: 6,
      quantityColor: "hsl(195, 70%, 50%)",
    },
    {
      action: "Deleted",
      quantity: 10,
      quantityColor: "hsl(154, 70%, 50%)",
    },
  ];
  return (
    <div className=" h-[80vh]">
      <h1 className="flex items-center justify-center text-4xl font-bold">
        Todo Analytics
      </h1>
      <ResponsiveBar
        data={data}
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
    </div>
  );
}
