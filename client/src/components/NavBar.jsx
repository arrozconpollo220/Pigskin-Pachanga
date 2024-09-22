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
    { to: "/Match-up", label: "Match up" },
  ];

  return (
    <Navbar expand="lg" className="bg-transparent" >
      <nav className="nav nav-tabs">
        <Navbar.Brand className="KG">
          <div className="box">
            <div className="title">
              <span className="block"></span>
              {/* <h1>
                <span className="text-primary custom-span">F</span>antasy 
                <span className="text-primary custom-span">F</span>ootball
                <span className="text-danger custom-span">A</span>pp
              </h1> */}
            </div>
            <div className="role">
              <div className="block"></div>
              <p></p>
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
