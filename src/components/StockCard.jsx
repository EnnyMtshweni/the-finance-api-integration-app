function StockCard({
  name = 'Apple Inc.',
  symbol = 'AAPL',
  price = 218.53,
  high = 220.18,
  low = 216.91,
  lastTradingDay = '2026-07-22',
}) {
  return (
    <section className="stock-card">
      <div className="stock-card__top">
        <h2 className="stock-card__name">{name}</h2>
        <span className="stock-card__symbol">{symbol}</span>
      </div>

      <p className="stock-card__price">${price.toFixed(2)}</p>

      <div className="stock-card__grid">
        <div>
          <p className="stock-card__stat-label">Today's High</p>
          <p className="stock-card__stat-value stock-card__stat-value--high">
            ${high.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="stock-card__stat-label">Today's Low</p>
          <p className="stock-card__stat-value stock-card__stat-value--low">
            ${low.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="stock-card__stat-label">Last Trading Day</p>
          <p className="stock-card__stat-value">{lastTradingDay}</p>
        </div>
      </div>
    </section>
  );
}

export default StockCard;