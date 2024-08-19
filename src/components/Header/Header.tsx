import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Link to="/" className="navlink">Home</Link>
      <Link to="/accounts" className="navlink">Accounts</Link>
      <Link to="/banks" className="navlink">Banks</Link>
    </div>
  );
}

export default Header;
