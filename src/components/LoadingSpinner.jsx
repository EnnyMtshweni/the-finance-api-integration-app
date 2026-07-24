function LoadingSpinner() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" />
      Loading...
    </div>
  );
}

export default LoadingSpinner;