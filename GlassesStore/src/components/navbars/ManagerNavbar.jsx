
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserNavbar.css';

function ManagerNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/products">
          <img src="/images/product.png" alt="מוצרים" />
        </Link>
        <Link to="/allUsersPage"> 
           <img src="/images/person.jpg" alt="persons" />
              </Link>
        <button className="logout-button" onClick={handleLogout}>
          <img src="/images/exit2.png" alt="יציאה" />
        </button>
          <Link to="/AddProductPage"> 
           <img src="/images/plus.png" alt="addProduct" />
              </Link>
      <Link to="/orders">
      <img src="/images/orders.jpg" alt="AllOrders" />
      </Link>
      </div>

      <div className="profile-section">
        <div className="profile-wrapper">
          <div className="profile-circle">
            {getInitial(user?.name)}
          </div>
          <div className="profile-tooltip">
            {user?.name}
          </div>
        </div>
      </div>
        <div className="navbar-center">
    <Link to='/home'><img src="/logo1.jpg" alt="לוגו" className="logo1" /></Link>  
  </div>
    </nav>
  );
}

export default ManagerNavbar;

