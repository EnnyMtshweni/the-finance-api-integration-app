# EasyTrack

A React app for exploring real-time stock market data. Search any stock
symbol to view its current price, daily high/low, and last trading day.

Built as part of the ZAIO Week 14 assignment on API calls, `fetch`,
`useEffect`, and loading/error states.

## Features

- Search any stock ticker symbol (e.g. `AAPL`, `MSFT`, `TSLA`)
- Live price, daily high/low, and last trading day pulled from the
  [Alpha Vantage](https://www.alphavantage.co/) API
- Loading spinner while a request is in flight
- Graceful error handling for invalid symbols and API rate limits
- All API logic isolated in a single custom hook: `useStockData`

## Tech Stack

- React (Vite)
- Alpha Vantage API (`GLOBAL_QUOTE` + `OVERVIEW` endpoints)
- Plain CSS (no framework)

## Project Structure

```
fintrack/
├── .env.example
├── README.md
└── src/
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── Header.jsx
    │   ├── SearchBar.jsx
    │   ├── StockCard.jsx
    │   ├── LoadingSpinner.jsx
    │   └── ErrorMessage.jsx
    └── hooks/
        └── useStockData.js
```

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd fintrack
npm install
```

### 2. Add your API key

Get a free key at [alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key).

Copy the example env file and add your key:

```bash
cp .env.example .env
```

```
VITE_ALPHA_VANTAGE_API_KEY=your_actual_key
```

Restart the dev server after adding it — Vite only reads `.env` on startup.

### 3. Run the app

```bash
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## How It Works

- `SearchBar` collects a ticker symbol and calls `searchStock(symbol)` from
  the `useStockData` hook.
- `useStockData` fetches `GLOBAL_QUOTE` (price/high/low/date) and `OVERVIEW`
  (company name) from Alpha Vantage, and exposes `stock`, `isLoading`, and
  `error` state.
- `App.jsx` conditionally renders `LoadingSpinner`, `ErrorMessage`, or
  `StockCard` based on that state.

## Known Limitations

- Alpha Vantage's free tier allows **25 requests/day** and **~5/minute**.
- The free tier does not return a real HTTP error when the limit is hit —
  it returns a `200 OK` response with a `Note`/`Information` field instead
  of data, so `useStockData` checks for that explicitly and surfaces it as
  an error message.
- The `OVERVIEW` endpoint doesn't have data for every symbol (e.g. some
  ETFs); in that case the ticker symbol is shown in place of a company name.

## Assignment Notes

- **API used:** Alpha Vantage (finance)
- **Challenge:** Alpha Vantage doesn't fail with a normal HTTP error status
  when you hit the rate limit — it silently returns 200 with a `Note`
  field, so error handling required inspecting the response body rather
  than relying on `response.ok`.

## Deployment

Build for production with:

```bash
npm run build
```

Deploy the `dist/` folder to your host of choice (Vercel, Netlify, GitHub
Pages, etc.). Remember to set `VITE_ALPHA_VANTAGE_API_KEY` as an
environment variable in your host's dashboard — `.env` files aren't
committed to git.