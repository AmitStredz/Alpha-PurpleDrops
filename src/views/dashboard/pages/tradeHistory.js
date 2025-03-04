import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/api";
import axios from "axios";

export default function TradeHistory() {
  const [tradeHistory, setTradeHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchtradeData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/bot/full-trade-history/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("tradeData response: ", response?.data);

      setTradeHistory(response.data);
    } catch (error) {
      console.error(
        "Error fetching cycle status:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchtradeData();
  }, []);

  return (
    <div className="flex flex-col p-10 w-full">
      <div className="flex ">
        <span className="text-[44px] text-white">Trade History</span>
      </div>

      {/* Table */}
      <div className="flex flex-col  bg-white rounded-2xl w-full">
        <div className="header flex justify-between items-center w-full bg-slate-200 p-5 rounded-t-2xl">
          <span>All History</span>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="border text-black"
                name="usd"
              />
              <label htmlFor="usd">USD</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="bnb" />
              <label htmlFor="usd">BNB</label>
            </div>
          </div>
        </div>

        <div className="w-full overflow-auto p-5">
          <table className="w-full">
            <thead className="">
              <tr className=" bg-white bg-opacity-10 text-[12px] sm:text-[16px] ">
                <th className="">id</th>
                <th className="">Symbol</th>
                <th className="">Side</th>
                <th className="">Quantity</th>
                <th className="">Price</th>
                <th className="">Profit</th>
                <th className="">Created date</th>
                <th className="">Created time</th>
              </tr>
            </thead>
            {tradeHistory?.trades.length > 0 ? (
              tradeHistory?.trades?.map((item, index) => (
                <tbody className="text-[12px] sm:text-[16px] text-slate-400 z-[1000000]">
                  <tr key={index} className="border-b border-gray-700">
                    <td className="">{item?.id}</td>
                    <td className="">{item?.symbol}</td>
                    <td
                      className={`py-2 px-4 ${
                        item?.side == "BUY" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item?.side}
                    </td>
                    <td className="py-2 px-4">{item?.quantity}</td>
                    <td className="py-2 px-4">{item?.price}</td>
                    <td className="py-2 px-4">{item?.profit}</td>
                    <td className="py-2 px-4">
                      {new Date(item?.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(item?.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <div>No trading history found.</div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
