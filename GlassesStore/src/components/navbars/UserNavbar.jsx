// // import { Link } from 'react-router-dom';
// // // import logo from './logo.png'; 
// // function UserNavbar() {
// //   return (
// //     <nav>
// //         {/* <img src="/logo.png" alt="לוגו" style={{ height: '50px' }} /> */}
// //         {/* <img src={logo} alt="לוגו" style={{ height: '50px' }} /> */}
// //       <Link to="/products">מוצרים</Link>
// //       <Link to="/orders">ההזמנות שלי</Link>
// //       <Link to="/cart">העגלה</Link>
// //       <Link to="/">יציאה</Link>
// //     </nav>
// //   );
// //    return (
// //     <button onClick={handleLogout}>🚪 יציאה</button>
// //   );
// // }

// // export default UserNavbar;
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../features/user/userSlice';
// import { useDispatch, useSelector } from 'react-redux'; 

// import './UserNavbar.css'; 

// function UserNavbar() {
//   const navigate = useNavigate();
//     const dispatch = useDispatch(); 
//   const user = useSelector((state) => state.user.currentUser);

//  const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch(logout()); 
//     navigate("/"); 
//   };

//   const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';


//   return (
//     <nav className="navbar">
//       <img src="/logo1.jpg" alt="לוגו" className="logo" />
//       <div className="nav-links">
//          <Link to="/products"><img src="/images/product.png"className="products" ></img></Link>
//        {/* <Link to="/orders">ההזמנות שלי</Link> */}
//       <Link to="/cart" ><img src="/images/cart2.png"  className="cartimg"></img></Link>
//       <button className="logout-button" onClick={handleLogout}>
//            <img src="/images/exit2.jpg" className='exit' ></img></button>
//       </div>
//       <div className="profile-section">
//         <div className="profile-circle">
//           {getInitial(user?.name)}
//         </div>
        
        
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserNavbar.css';

function UserNavbar() {
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
        <Link to="/cart">
          <img src="/images/cart100.jpg" alt="עגלה" />
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          <img src="/images/exit2.png" alt="יציאה" />
        </button>
        <Link to="/my-orders">
         <img src="/images/orders.jpg" alt="myOrders" />
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

export default UserNavbar;

