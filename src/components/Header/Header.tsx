import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import deleteTokens from '../../helpers/deleteTokens';
import getCookie from '../../helpers/getCookie';

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    deleteTokens();
    navigate('/');
  };
  const isLoggedIn = getCookie('Authorization') !== undefined;

  return (
    <div className="header">
      <Link to="/" className="navlink">Home</Link>
      <Link to="/accounts" className="navlink">Accounts</Link>
      <Link to="/banks" className="navlink">Banks</Link>
      {isLoggedIn ? (
        <button
          type="button"
          className="logout-button navlink"
          onClick={handleClick}
        >
          Logout
        </button>
      ) : false}
    </div>
  );
}

export default Header;
