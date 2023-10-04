import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import useWebSocket from "react-use-websocket";
import { v4 as uuidv4 } from "uuid";
import { SaveFormButton } from "../components/CustomButtons";
import CustomHeader from "../components/CustomHeader";
import { createToast } from "../helpers/helpers";

const convertUnixToLocale = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  return date.toLocaleString();
};

const calcTotalReturns = (totalProceeds, sharesPurchased, currentPrice) =>
  totalProceeds + sharesPurchased * currentPrice;

export default function StockMarket() {
  const { host, authType, authToken } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure user can not place additional orders until this one is processed
    setOrdersDisabled({ cashBalancePending: true, portfolioPending: true });

    const stock = selectedStock;
    const action = e.nativeEvent.submitter.name;
    const shares =
      action == "buy"
        ? e.target.stockQuantity.value
        : -e.target.stockQuantity.value;
    const price = stockPrices[selectedStock].at(-1)["currentPrice"];
    try {
      const res = await fetch("http://" + host + "/stock-market/orders", {
        method: "POST",
        headers: {
          "X-Gravitee-API-Key": authToken,
        },
        body: JSON.stringify({
          STOCK: stock,
          EXECUTION_PRICE: price,
          SHARES_PURCHASED: shares,
          ACTION: action,
        }),
      });

      // Catch non-2xx HTTP status codes
      if (!res.ok) {
        throw new Error(`HTTP status code ${res.status}.`);
      }
      createToast(
        `Executed ${action} order for ${shares} shares of ${
          stock[0].toUpperCase() + stock.slice(1)
        }. Total: $${(price * shares).toFixed(2)}`,
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedStock, setSelectedStock] = useState("gravitee");
  const [stockQuantity, setStockQuantity] = useState(0);

  const [ordersDisabled, setOrdersDisabled] = useState({
    cashBalancePending: true,
    portfolioPending: true,
  });
  const [buysDisabled, setBuysDisabled] = useState(true);
  const [sellsDisabled, setSellsDisabled] = useState(true);

  // Ksqldb data streams share a consumer ID
  const [ksqldbConsumerId] = useState(() => uuidv4());

  // Cash balance data management
  const [cashBalance, setCashBalance] = useState(0);
  const { lastMessage: cashBalanceLastMessage } = useWebSocket(
    `ws://${host}/stock-market/cash`,
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
        // Allow users to submit orders once previous order has been processed
        setOrdersDisabled((prevState) => ({
          ...prevState,
          cashBalancePending: false,
        }));
      })();
    }
  }, [cashBalanceLastMessage]);

  // Stock prices data management
  const [stockPrices, setStockPrices] = useState([]);
  const { lastMessage: stockPricesLastMessage } = useWebSocket(
    `ws://${host}/stock-market/current_stock_prices`,
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
          const updatedData = {
            ...prevData,
            [key]: [...(prevData[key] ?? []), { currentPrice, datetime }],
          };

          // Sort the stock prices based on currentPrice in descending order
          const sortedStocks = Object.keys(updatedData).sort((a, b) => {
            const aPrice = updatedData[a]?.at(-1)?.currentPrice || 0;
            const bPrice = updatedData[b]?.at(-1)?.currentPrice || 0;
            return bPrice - aPrice;
          });

          // Use sorted array to construct sorted object with updated data
          const sortedStockPrices = {};
          sortedStocks.forEach((stock) => {
            sortedStockPrices[stock] = updatedData[stock];
          });

          return sortedStockPrices;
        });
      })();
    }
  }, [stockPricesLastMessage]);

  // Portfolio data management
  const [portfolio, setPortfolio] = useState([]);
  const { lastMessage: portfolioLastMessage } = useWebSocket(
    `ws://${host}/stock-market/portfolio`,
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
        const {
          SHARES_PURCHASED: sharesPurchased,
          TOTAL_INVESTMENT: totalInvestment,
          TOTAL_PROCEEDS: totalProceeds,
          REALIZED_RETURNS: realizedReturns,
        } = parsedData;
        const stock = parsedData["key"]["STOCK"];

        setPortfolio((prevData) => {
          return {
            ...prevData,
            [stock]: {
              sharesPurchased,
              totalInvestment,
              totalProceeds,
              realizedReturns,
            },
          };
        });
        setOrdersDisabled((prevState) => ({
          ...prevState,
          portfolioPending: false,
        }));
      })();
    }
  }, [portfolioLastMessage]);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <CustomHeader title="Stock Market"></CustomHeader>
      <div className="flex h-full gap-4 overflow-clip">
        <div className="flex h-full max-h-full flex-auto flex-col overflow-auto border-2 bg-white pb-10 pt-4">
          <div className="flex gap-10 px-10">
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Selected Stock</div>
              <div className=" text-2xl font-extrabold">
                {selectedStock[0].toUpperCase() + selectedStock.slice(1)}
              </div>
            </div>
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Current Price</div>
              <div className=" text-2xl font-extrabold">
                {"$" +
                  (stockPrices[selectedStock]
                    ?.at(-1)
                    ?.currentPrice.toFixed(2) ?? 0)}
              </div>
            </div>
            <div className="ml-auto flex flex-col">
              <div className=" uppercase text-gray-400">Buying Power</div>
              <div className="text-2xl font-extrabold">
                {"$" +
                  (cashBalance ?? 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </div>
            </div>
          </div>
          <div className="h-[99%] min-h-0 flex-auto">
            <ResponsiveLine
              data={[
                {
                  id: selectedStock,
                  data: stockPrices[selectedStock]?.map((item) => ({
                    x: convertUnixToLocale(item.datetime),
                    y: item.currentPrice,
                  })) ?? [{ x: 0, y: 0 }],
                },
              ]}
              tooltip={({ point }) => {
                return (
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
                    <div>
                      Price: <strong>${point.data.y.toFixed(2)}</strong>
                    </div>
                  </div>
                );
              }}
              margin={{ top: 50, right: 90, bottom: 50, left: 100 }}
              colors={() => "#009999"}
              yScale={{
                type: "linear",
                stacked: false,
                min: "auto",
                max: "auto",
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Datetime",
                legendOffset: 20,
                legendPosition: "middle",
                tickValues: [
                  convertUnixToLocale(
                    stockPrices[selectedStock]?.at(0)?.["datetime"]
                  ),
                  convertUnixToLocale(
                    stockPrices[selectedStock]?.at(-1)?.["datetime"]
                  ),
                ],
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Price",
                legendOffset: -50,
                legendPosition: "middle",
              }}
              enablePoints={false}
              useMesh={true}
            />
          </div>
          <div className="flex items-center gap-10 px-10 py-5">
            <h2 className="m-0 text-xl font-bold uppercase text-gray-400">
              Your Position
            </h2>
            <div className="ml-20 flex flex-col">
              <div className="uppercase text-gray-400">Shares</div>
              <div className=" text-lg font-bold">
                {portfolio[selectedStock]?.["sharesPurchased"] ?? 0}
              </div>
            </div>
            <div className="flex flex-col">
              <div className=" uppercase text-gray-400">Total Return</div>
              <div className=" text-lg font-bold">
                {"$" +
                  calcTotalReturns(
                    portfolio[selectedStock]?.["realizedReturns"] ?? 0,
                    portfolio[selectedStock]?.["sharesPurchased"] ?? 0,
                    stockPrices[selectedStock]?.at(-1)?.["currentPrice"] ?? 0
                  ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-1/4 max-w-[40%] flex-col gap-4">
          <div className="relative flex flex-col overflow-y-auto border-2 bg-white">
            <h2 className="sticky top-0 ml-3 mt-6 bg-white/95 text-lg font-normal uppercase text-gray-400">
              Available Stocks
            </h2>
            {Object.keys(stockPrices).map((stock) => (
              <div
                className=" flex w-full cursor-pointer items-center justify-center gap-7 p-5 text-lg text-black hover:opacity-50"
                key={stock}
                onClick={() => {
                  setSelectedStock(stock);
                  setStockQuantity(0);
                  setBuysDisabled(true);
                  setSellsDisabled(true);
                }}
              >
                <div className="w-1/3 font-bold">{stock}</div>
                <div className="h-[99%] w-1/3">
                  <ResponsiveLine
                    data={[
                      {
                        id: stock,
                        data: stockPrices[stock]?.map((item) => ({
                          x: convertUnixToLocale(item.datetime),
                          y: item.currentPrice,
                        })) ?? [{ x: 0, y: 0 }],
                      },
                    ]}
                    colors={() => "#009999"}
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
                <div className="flex w-max min-w-max items-center justify-center rounded-lg bg-green-500/80 p-2">
                  {"$" +
                    (stockPrices[stock]?.at(-1)?.["currentPrice"].toFixed(2) ??
                      0)}
                </div>
              </div>
            ))}
          </div>
          <form
            id="stock-orders"
            className="relative min-h-[50%] overflow-y-auto border-2 bg-white"
            onSubmit={handleSubmit}
            onChange={(e) => {
              let sellMax = portfolio[selectedStock]?.["sharesPurchased"] ?? 0;
              let buyMax =
                Math.floor(
                  cashBalance / stockPrices[selectedStock]?.at(-1)?.currentPrice
                ) ?? 0;

              e.target.value <= sellMax && e.target.value > 0
                ? setSellsDisabled(false)
                : setSellsDisabled(true);
              e.target.value <= buyMax && e.target.value > 0
                ? setBuysDisabled(false)
                : setBuysDisabled(true);
            }}
          >
            <fieldset
              disabled={
                ordersDisabled.cashBalancePending ||
                ordersDisabled.portfolioPending
              }
              className="flex flex-col gap-5"
            >
              <h2 className="sticky top-0 ml-3 mt-6 bg-white/95 text-lg font-normal uppercase text-gray-400">
                Buy/sell Stocks
              </h2>
              <div className="flex w-full items-center justify-between gap-7 px-5 text-lg text-black">
                <div>Shares</div>
                <input
                  name="stockQuantity"
                  className="min-w-[50%] max-w-[50%] rounded-xl border p-2 text-lg text-black focus:shadow-inner focus:outline-none focus:valid:shadow-accent-400 focus:invalid:shadow-red-700 disabled:cursor-not-allowed disabled:bg-space-neutral-100/10"
                  type="number"
                  min={1}
                  step={1}
                  value={stockQuantity}
                  onChange={(e) => {
                    setStockQuantity(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="flex w-full items-center justify-between gap-7 px-5 text-lg text-black">
                <div>Price</div>
                <div>
                  {"$" +
                    (stockPrices[selectedStock]
                      ?.at(-1)
                      ?.currentPrice.toFixed(2) ?? 0)}
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-7 px-5 text-lg text-black">
                <div>Total</div>
                <div name="orderTotal">
                  {"$" +
                    (
                      (stockPrices[selectedStock]?.at(-1)?.currentPrice ?? 0) *
                      stockQuantity
                    ).toFixed(2)}
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-7 px-5 text-lg text-black">
                <SaveFormButton
                  name="buy"
                  id="buy-button"
                  text={"Buy"}
                  disabledButton={
                    buysDisabled ||
                    ordersDisabled.cashBalancePending ||
                    ordersDisabled.portfolioPending
                  }
                />
                <SaveFormButton
                  name="sell"
                  id="sell-button"
                  text={"Sell"}
                  disabledButton={
                    sellsDisabled ||
                    ordersDisabled.cashBalancePending ||
                    ordersDisabled.portfolioPending
                  }
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
