import "./App.css";
import { useState, useEffect } from "react";

type Quote = {
  text: string;
  author: string;
};

export default function App() {
  const [quoteList, setQuoteList] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuoteList(data);
        setQuote(data[0]);
      });
  }, []);

  function fetchRandomQuote(quotes: Quote[]) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  function fetchNewQuote() {
    setQuote(fetchRandomQuote(quoteList));
  }

  return (
    <main>
      <div className="text-4xl h-screen w-full  bg-slate-400 flex-col justify-between items-center m-0 p-0">
        <div className="h-fit w-5/6 border border-red-300 flex-col justify-evenly items-center">
          <h1>Project 3: Quote Generator</h1>
          <div>
            {quote && (
              <div className="flex-col justify-evenly items-center text-center">
                <h3 className="my-4">{quote.text}</h3>
                <i>- {quote.author ? quote.author : "Unknown"}</i>
              </div>
            )}
            <button
              className="border border-white rounded-xl p-2"
              onClick={fetchNewQuote}
            >
              Get the Quote
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
