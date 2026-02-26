import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! The page you are looking for does not exist.</p>
      <a href="/" className="notfound-link">Go back to Home</a>
    </div>
  );
};

export default NotFoundPage;
