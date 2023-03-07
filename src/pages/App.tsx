import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <html className="min-h-screen h-full bg-gray-50">
      <body className="min-h-screen h-full">
        <Link to={`login`}>to login</Link>
      </body>
  </html>
  );
}

export default App;
