import { useState, useEffect } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import Auth from "../utils/auth";


function NavBar({ isLoggedIn }) {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/Dashboard", label: "Dashboard" },
    { to: "/Draft", label: "Draft" },
    { to: "/Matchup", label: "Match up" },
  ];

  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const onButtonClick = () => {
    navigate('/');
    Auth.logout();
  };

  useEffect(() => {
    const handleOnline = () => {
      console.log('Back online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('You are offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Navbar expand="lg" className="bg-transparent" style={{padding: '0%'}}>
        <nav className="nav nav-tabs">
          <Navbar.Brand className="KG">
            <h1 className="responsive-title">Pigskin Pachanga</h1>
          </Navbar.Brand>

          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button variant="primary"
                className="m-3 button-responsive"
                style={{ fontWeight: "bold", color: "#b7253d", background: "#fff", padding: "0.375rem 0.75rem", fontSize: "1rem", lineHeight: "1.5", height: "auto", border: "1px solid black" }}>
                {item.label}
              </Button>
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link to="/Login">
              <Button variant="primary"
                className="m-3 button-responsive"
                style={{ fontWeight: "bold", color: "#b7253d", background: "#fff", padding: "0.375rem 0.75rem", fontSize: "1rem", lineHeight: "1.5", height: "auto", border: "1px solid black" }}>
                Login
              </Button>
            </Link>
          ) : (
            <Link to="">
              <Button
                disabled={!isOnline}
                variant="primary"
                className={"m-3"}
                onClick={onButtonClick}
                style={{ fontWeight: "bold", color: "#b7253d", background: "#fff", padding: "0.375rem 0.75rem", fontSize: "1rem", lineHeight: "1.5", height: "auto", border: "1px solid black" }}>
                Log out
              </Button>
            </Link>
          )}

        </nav>
    </Navbar >
  );
}

export default NavBar;
