import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import useStockData from './hooks/useStockData';
import './App.css';

function App() {
  const { stock, isLoading, error, searchStock } = useStockData();

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={searchStock} />

      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && stock && <StockCard {...stock} />}
    </div>
  );
}

export default App;