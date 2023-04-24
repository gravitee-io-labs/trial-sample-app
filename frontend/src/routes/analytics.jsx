import { ResponsiveBar } from "@nivo/bar";

export default function Analytics() {
  const data = [
    {
      country: "AD",
      "hot dog": 1,
      "hot dogColor": "hsl(103, 70%, 50%)",
      burger: 85,
      burgerColor: "hsl(313, 70%, 50%)",
      sandwich: 148,
      sandwichColor: "hsl(4, 70%, 50%)",
      kebab: 87,
      kebabColor: "hsl(26, 70%, 50%)",
      fries: 2,
      friesColor: "hsl(331, 70%, 50%)",
      donut: 68,
      donutColor: "hsl(203, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 11,
      "hot dogColor": "hsl(97, 70%, 50%)",
      burger: 30,
      burgerColor: "hsl(157, 70%, 50%)",
      sandwich: 4,
      sandwichColor: "hsl(324, 70%, 50%)",
      kebab: 144,
      kebabColor: "hsl(315, 70%, 50%)",
      fries: 172,
      friesColor: "hsl(27, 70%, 50%)",
      donut: 196,
      donutColor: "hsl(76, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 6,
      "hot dogColor": "hsl(195, 70%, 50%)",
      burger: 72,
      burgerColor: "hsl(100, 70%, 50%)",
      sandwich: 181,
      sandwichColor: "hsl(127, 70%, 50%)",
      kebab: 56,
      kebabColor: "hsl(227, 70%, 50%)",
      fries: 136,
      friesColor: "hsl(269, 70%, 50%)",
      donut: 86,
      donutColor: "hsl(310, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 167,
      "hot dogColor": "hsl(154, 70%, 50%)",
      burger: 128,
      burgerColor: "hsl(129, 70%, 50%)",
      sandwich: 146,
      sandwichColor: "hsl(308, 70%, 50%)",
      kebab: 183,
      kebabColor: "hsl(25, 70%, 50%)",
      fries: 19,
      friesColor: "hsl(141, 70%, 50%)",
      donut: 122,
      donutColor: "hsl(28, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 113,
      "hot dogColor": "hsl(116, 70%, 50%)",
      burger: 19,
      burgerColor: "hsl(129, 70%, 50%)",
      sandwich: 26,
      sandwichColor: "hsl(123, 70%, 50%)",
      kebab: 135,
      kebabColor: "hsl(180, 70%, 50%)",
      fries: 116,
      friesColor: "hsl(80, 70%, 50%)",
      donut: 131,
      donutColor: "hsl(210, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 175,
      "hot dogColor": "hsl(204, 70%, 50%)",
      burger: 133,
      burgerColor: "hsl(190, 70%, 50%)",
      sandwich: 114,
      sandwichColor: "hsl(127, 70%, 50%)",
      kebab: 165,
      kebabColor: "hsl(331, 70%, 50%)",
      fries: 96,
      friesColor: "hsl(155, 70%, 50%)",
      donut: 141,
      donutColor: "hsl(210, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 112,
      "hot dogColor": "hsl(327, 70%, 50%)",
      burger: 65,
      burgerColor: "hsl(216, 70%, 50%)",
      sandwich: 3,
      sandwichColor: "hsl(7, 70%, 50%)",
      kebab: 34,
      kebabColor: "hsl(91, 70%, 50%)",
      fries: 196,
      friesColor: "hsl(21, 70%, 50%)",
      donut: 166,
      donutColor: "hsl(84, 70%, 50%)",
    },
  ];
  return (
    <div className=" h-[90vh]">
      <h1 className="flex items-center justify-center text-4xl font-bold">
        Todo Analytics
      </h1>
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
        }}
      />
    </div>
  );
}
