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

  const onButtonClick = () => {
    navigate('/');
    Auth.logout();
  };

  return (
    <Navbar expand="lg" className="bg-transparent" style={{ paddingTop: '0px' }}>
      <nav className="nav nav-tabs" >
        <Navbar.Brand className="KG">
          <h1 className="responsive-title">Pigskin Pachanga</h1>
        </Navbar.Brand>

        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <Button variant="primary"
              className="m-3"
              style={{ background: "#b7253d", padding: "0.175rem 0.95rem", fontSize: "1rem", lineHeight: "1.25", height: "auto", border: "1px solid black" }}>
              {item.label}
            </Button>
          </Link>
        ))}

        {!isLoggedIn ? (
          <Link to="/Login">
            <Button variant="primary"
              className="m-3"
              style={{ background: "#b7253d", padding: "0.175rem 0.95rem", fontSize: "1rem", lineHeight: "1.25", height: "auto", border: "1px solid black" }}>
              Login
            </Button>
          </Link>
        ) : (
          <Link to="">
            <Button
              variant="primary"
              className={"m-3"}
              onClick={onButtonClick}
              style={{ background: "#b7253d", padding: "0.175rem 0.95rem", fontSize: "1rem", lineHeight: "1.25", height: "auto", border: "1px solid black" }}>
              Log out
            </Button>
          </Link>
        )}

      </nav>
    </Navbar >
  );
}

export default NavBar;
