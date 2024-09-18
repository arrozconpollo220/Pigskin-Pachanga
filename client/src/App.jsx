import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Login from './pages/Login'; 
import './App.css';
import Headers from './pages/Headers'
function App() {
  const [email, setEmail] = useState(""); // Asegúrate de definir el estado email
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Headers/>
        <main className="mx-3">
          <Routes>
            <Route
              path="/"
              element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
