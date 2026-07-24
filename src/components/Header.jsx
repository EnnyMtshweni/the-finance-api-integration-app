const TAPE_ITEMS = [
  { symbol: 'AAPL', change: '+0.8%', direction: 'up' },
  { symbol: 'MSFT', change: '+1.2%', direction: 'up' },
  { symbol: 'TSLA', change: '-2.1%', direction: 'down' },
  { symbol: 'NVDA', change: '+3.4%', direction: 'up' },
  { symbol: 'AMZN', change: '-0.4%', direction: 'down' },
  { symbol: 'GOOGL', change: '+0.6%', direction: 'up' },
];
// duplicate list
function Header() {
  const tapeItems = [...TAPE_ITEMS, ...TAPE_ITEMS];

  return (
    <header className="header">
      <h1 className="header__title">
        <span className="header__title-icon">📈</span>
        EasyTrack
      </h1>
      <p className="header__desc">
        Explore real-time stock market data. Search any stock symbol to view
        the latest stock information.
      </p>

      <div className="ticker-tape" aria-hidden="true">
        <div className="ticker-tape__track">
          {tapeItems.map((item, index) => (
            <span
              key={`${item.symbol}-${index}`}
              className={`ticker-tape__item ticker-tape__item--${item.direction}`}
            >
              {item.symbol} {item.direction === 'up' ? '▲' : '▼'} {item.change}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;