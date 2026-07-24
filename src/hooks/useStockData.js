import { useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

/*
 useStockData
 Handles all Alpha Vantage API calls for FinTrack.
 */
function useStockData() {
  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchStock = useCallback(async (rawSymbol) => {
    const symbol = rawSymbol.trim().toUpperCase();

    if (!symbol) {
      setError('Please enter a stock symbol.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const quoteRes = await fetch(
        `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      if (!quoteRes.ok) throw new Error('Network response was not ok.');
      const quoteData = await quoteRes.json();

      const quote = quoteData['Global Quote'];
      if (!quote || Object.keys(quote).length === 0) {
        throw new Error(
          quoteData['Note'] || quoteData['Information'] || 'Symbol not found.'
        );
      }

      // OVERVIEW gives the company name. 
      let companyName = symbol;
      try {
        const overviewRes = await fetch(
          `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
        );
        const overviewData = await overviewRes.json();
        if (overviewData.Name) {
          companyName = overviewData.Name;
        }
      } catch {
        
      }

      setStock({
        name: companyName,
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        lastTradingDay: quote['07. latest trading day'],
      });
    } catch (err) {
      setError(err.message || 'Unable to load stock data.');
      setStock(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stock, isLoading, error, searchStock };
}

export default useStockData;