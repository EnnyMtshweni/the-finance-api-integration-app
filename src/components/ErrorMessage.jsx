function ErrorMessage({ message = 'Unable to load stock data.' }) {
  return (
    <div className="error-message" role="alert">
      <span aria-hidden="true">⚠️</span>
      {message}
    </div>
  );
}

export default ErrorMessage;