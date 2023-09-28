import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { v4 as uuidv4 } from "uuid";
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

function convertUnixToLocale(unixTimestamp) {
  const date = new Date(unixTimestamp);
  return date.toLocaleString();
}

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
  const { kafkaData, host } = useOutletContext();
  const graphData = countObjectsByProperty(kafkaData, "action");

  // Ksqldb data streams share a consumer ID
  const [ksqldbConsumerId] = useState(() => uuidv4());

  // Cash balance data management
  const [cashBalance, setCashBalance] = useState();
  const { lastMessage: cashBalanceLastMessage } = useWebSocket(
    `ws://${host}/stock-market/pksqlc-6v8k8CASH`,
    {
      queryParams: {
        "X-Gravitee-Client-Identifier": ksqldbConsumerId,
      },

      shouldReconnect: () => true,
      reconnectAttempts: 20,
      onOpen: () => console.log("Cash Balance WebSocket opened"),
      onError: (error) => console.log(`Cash Balance WebSocket error: ${error}`),
      onClose: () => console.log("Cash Balance WebSocket closed"),
    }
  );
  useEffect(() => {
    if (cashBalanceLastMessage !== null) {
      (async () => {
        const data = await cashBalanceLastMessage.data.text();
        const parsedData = JSON.parse(data);
        setCashBalance(parsedData["CASH"]);
      })();
    }
  }, [cashBalanceLastMessage]);

  // Stock prices data management
  const [stockPrices, setStockPrices] = useState([]);
  const { lastMessage: stockPricesLastMessage } = useWebSocket(
    `ws://${host}/stock-market/pksqlc-6v8k8CURRENT_STOCK_PRICES`,
    {
      queryParams: {
        "X-Gravitee-Client-Identifier": ksqldbConsumerId,
      },

      shouldReconnect: () => true,
      reconnectAttempts: 20,
      onOpen: () => console.log("Stock prices WebSocket opened"),
      onError: (error) => console.log(`Stock prices WebSocket error: ${error}`),
      onClose: () => console.log("Stock prices WebSocket closed"),
    }
  );

  useEffect(() => {
    if (stockPricesLastMessage !== null) {
      (async () => {
        const data = await stockPricesLastMessage.data.text();
        const parsedData = JSON.parse(data);
        const {
          key,
          CURRENT_PRICE: currentPrice,
          DATETIME: datetime,
        } = parsedData;

        setStockPrices((prevData) => {
          key in prevData || (prevData[key] = []);
          return {
            ...prevData,
            [key]: [...prevData[key], { currentPrice, datetime }],
          };
        });
      })();
    }
  }, [stockPricesLastMessage]);

  // Portfolio data management
  const [portfolio, setPortfolio] = useState([]);
  const { lastMessage: portfolioLastMessage } = useWebSocket(
    `ws://${host}/stock-market/pksqlc-6v8k8PORTFOLIO`,
    {
      queryParams: {
        "X-Gravitee-Client-Identifier": ksqldbConsumerId,
      },

      shouldReconnect: () => true,
      reconnectAttempts: 20,
      onOpen: () => console.log("Portfolio WebSocket opened"),
      onError: (error) => console.log(`Portfolio WebSocket error: ${error}`),
      onClose: () => console.log("Portfolio WebSocket closed"),
    }
  );

  useEffect(() => {
    if (portfolioLastMessage !== null) {
      (async () => {
        const data = await portfolioLastMessage.data.text();
        const parsedData = JSON.parse(data);
        const stock = parsedData["key"]["STOCK"];
        delete parsedData.key;

        setPortfolio((prevData) => {
          return {
            ...prevData,
            [stock]: parsedData,
          };
        });
      })();
    }
  }, [portfolioLastMessage]);

  return (
    <div className="flex h-screen flex-col">
      <CustomHeader title="Stock Market"></CustomHeader>
      <div className="flex h-full overflow-clip px-10">
        <div className="flex h-full max-h-full flex-auto flex-col overflow-x-auto overflow-y-clip pb-10">
          <h2 className="m-0">Selected Stock</h2>
          <div className="h-[99%] flex-auto">
            <ResponsiveLine
              data={[
                {
                  id: "japan",
                  color: "hsl(65, 70%, 50%)",
                  data: stockPrices["gravitee"]
                    ? stockPrices["gravitee"].map((item) => ({
                        x: convertUnixToLocale(item.datetime),
                        y: item.currentPrice,
                      }))
                    : [],
                },
              ]}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "transportation",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
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
