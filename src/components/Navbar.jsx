import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <span className="brand-mark">R</span>
          RentalKan
        </Link>

        <div className="nav-menu">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/product">
            Products
          </NavLink>

          <NavLink to="/my-rentals">
            Bookings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
