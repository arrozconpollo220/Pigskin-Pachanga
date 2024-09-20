import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NavBar() {

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/Match-up', label: 'Match up' },
    { to: '/Draft', label: 'Draft' },
    { to: '/Login', label: 'Login' },
  ];

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ width: '100vw' }}>

      <nav className="nav nav-tabs">
        <Navbar.Brand className="KG">
          <div class="box">

            <div class="title">
              <span class="block"></span>
              <h1><span className="text-primary custom-span">F</span>antasy <span className="text-primary custom-span">F</span>ootball <span className="text-danger custom-span">A</span>pp</h1>
            </div>

            <div class="role">
              <div class="block"></div>
              <p></p>
            </div>

          </div > 
        </Navbar.Brand>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <Button variant="primary" className="m-3">
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

    </Navbar>
  );
}

export default NavBar;