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

export default function StockMarket() {
  const { host, authType, authToken } = useOutletContext();

  const [selectedStock, setSelectedStock] = useState("gravitee");

  // Ksqldb data streams share a consumer ID
  const [ksqldbConsumerId] = useState(() => uuidv4());

  // Cash balance data management
  const [cashBalance, setCashBalance] = useState();
  const { lastMessage: cashBalanceLastMessage } = useWebSocket(
    `ws://${host}/stock-market/pksqlc-6v8k8CASH`,
    {
      queryParams: {
        "X-Gravitee-Client-Identifier": ksqldbConsumerId,
        "api-key": authToken,
      },

      shouldReconnect: () => true,
      reconnectAttempts: 20,
      onOpen: () => console.log("Cash Balance WebSocket opened"),
      onError: (error) => console.log(`Cash Balance WebSocket error: ${error}`),
      onClose: () => console.log("Cash Balance WebSocket closed"),
    },
    // Only attempt to connect the real-time websocket when conditions are met
    authType === "apiKey"
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
        "api-key": authToken,
      },

      shouldReconnect: () => true,
      reconnectAttempts: 20,
      onOpen: () => console.log("Stock prices WebSocket opened"),
      onError: (error) => console.log(`Stock prices WebSocket error: ${error}`),
      onClose: () => console.log("Stock prices WebSocket closed"),
    },
    // Only attempt to connect the real-time websocket when conditions are met
    authType === "apiKey"
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
        "api-key": authToken,
      },

      shouldReconnect: () => true,
      reconnectAttempts: 20,
      onOpen: () => console.log("Portfolio WebSocket opened"),
      onError: (error) => console.log(`Portfolio WebSocket error: ${error}`),
      onClose: () => console.log("Portfolio WebSocket closed"),
    },
    // Only attempt to connect the real-time websocket when conditions are met
    authType === "apiKey"
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
      <div className="flex h-full overflow-clip pl-10">
        <div className="mt-4 flex h-full max-h-full flex-auto flex-col overflow-x-auto overflow-y-clip pb-10">
          <div className="flex justify-between px-10">
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Selected Stock</div>
              <div className=" text-2xl font-extrabold">
                {selectedStock[0].toUpperCase() + selectedStock.slice(1)}
              </div>
            </div>
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Buying Power</div>
              <div className=" text-2xl font-extrabold">
                {"$ " + cashBalance}
              </div>
            </div>
          </div>
          <div className="h-[99%] flex-auto">
            <ResponsiveLine
              data={[
                {
                  id: selectedStock,
                  color: "hsl(65, 70%, 50%)",
                  data: stockPrices[selectedStock]
                    ? stockPrices[selectedStock].map((item) => ({
                        x: convertUnixToLocale(item.datetime),
                        y: item.currentPrice,
                      }))
                    : [{ x: 0, y: 0 }],
                },
              ]}
              yScale={{
                type: "linear",
                stacked: false,
                min: "auto",
                max: "auto",
              }}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              yFormat=" >-.2f"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Datetime",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Price",
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
          <div className="flex h-1/4 justify-between px-10">
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Selected Stock</div>
              <div className=" text-2xl font-extrabold">{"TEST"}</div>
            </div>
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Buying Power</div>
              <div className=" text-2xl font-extrabold">
                {"$ " + cashBalance}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/4 max-w-[40%] flex-col overflow-y-auto bg-gray-100">
          {stockOptions.map((stockOptions) => (
            <div
              className=" flex w-full cursor-pointer items-center justify-center gap-5 border-[1px] border-space-neutral-200 p-5 text-lg text-black hover:opacity-50"
              key={stockOptions.name}
              onClick={() => setSelectedStock(stockOptions.name)}
            >
              <div className="w-1/3 font-bold">{stockOptions.name}</div>
              <div className="h-[99%] w-1/3">
                <ResponsiveLine
                  data={[
                    {
                      id: selectedStock,
                      color: "hsl(65, 70%, 50%)",
                      data: stockPrices[selectedStock]
                        ? stockPrices[selectedStock].map((item) => ({
                            x: convertUnixToLocale(item.datetime),
                            y: item.currentPrice,
                          }))
                        : [{ x: 0, y: 0 }],
                    },
                  ]}
                  enableGridX={false}
                  enableGridY={false}
                  enablePoints={false}
                  yScale={{
                    type: "linear",
                    stacked: false,
                    min: "auto",
                    max: "auto",
                  }}
                />
              </div>
              <div className="flex w-1/3 items-center justify-center bg-green-200 p-2">
                {stockOptions.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
