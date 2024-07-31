import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [ amount, setAmount ] = useState(0);
  const [ from, setFrom ] = useState("usd");
  const [ to, setTo ] = useState("inr");
  const [ convertedAmount, setConvertedAmount ] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const currencyOptions = Object.keys(currencyInfo);

  const swapCurrency = useCallback(() => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  });

  const convertAmount = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://imgs.search.brave.com/DP14wW4MN7wGcbjMmwRiibc5F-q_icr5J7QjIbwcBe8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lMC5w/eGZ1ZWwuY29tL3dh/bGxwYXBlcnMvODEy/LzIvZGVza3RvcC13/YWxscGFwZXItbW9u/ZXktc3RvY2stbWFy/a2V0LWdhbGxlcnkt/Ymx1ZS1zdG9jay1t/YXJrZXQtZmluYW5j/aWFsLW1hcmtldC5q/cGc')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convertAmount();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={currencyOptions}
                onCurrencyChange={(currency) => setAmount(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapCurrency}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={currencyOptions}
                onCurrencyChange={(currency)=> setTo(currency)}
                amountDisable={true}
                selectCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
