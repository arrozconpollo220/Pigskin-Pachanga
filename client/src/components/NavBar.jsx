import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import LogoutButton from "./LogoutButton";


function NavBar({ isLoggedIn }) {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/Dashboard", label: "Dashboard" },
    { to: "/Draft", label: "Draft" },
    { to: "/Matchup", label: "Match up" },
  ];

  return (
    <Navbar expand="lg" className="bg-transparent" style={{ paddingTop: '0px' }}>
      <nav className="nav nav-tabs">
        {/* <img src={logo} alt="PSP-logo" style={{ width: "200px", height: "200px" }} /> */}
        <Navbar.Brand className="KG">
          <div className="box">

            <div className="title">
              <span className="block"></span>
              <h1>Pigskin Pachanga</h1>
            </div>
          </div>
        </Navbar.Brand>

        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <Button variant="primary" className="m-3" style={{ padding: "0.375rem 0.75rem", fontSize: "1rem", lineHeight: "1.5", height: "auto" }}>
              {item.label}
            </Button>
          </Link>
        ))}

        {!isLoggedIn && (
          <Link to="/Login">
            <Button variant="primary" className="m-3" style={{ padding: "0.375rem 0.75rem", fontSize: "1rem", lineHeight: "1.5", height: "auto" }}>
              Login
            </Button>
          </Link>
        )}

        {isLoggedIn && (
          <LogoutButton className="btn btn-primary m-3" />
        )}
      </nav>
    </Navbar>
  );
}

export default NavBar;
