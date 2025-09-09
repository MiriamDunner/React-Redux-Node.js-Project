
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './MyOrdersPage.css';

// function AllUsersPage() {
//   const userTz = useSelector((state) => state.user.currentUser?.tz || 'אנונימי');
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedUserId, setExpandedUserId] = useState(null);

//   useEffect(() => {
//     console.log('userTz:', userTz);
//     if (userTz === 'אנונימי') {
//       console.log('מפנה ל-/login כי המשתמש לא מחובר');
//       setError('אנא התחבר כדי לראות את המשתמשים');
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     const fetchAllUsers = async () => {
//       try {
//         console.log('שולף את כל המשתמשים');
//         const response = await fetch(`http://localhost:4000/user`);
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.log('תגובת שגיאה מה-API:', errorText, 'סטטוס:', response.status);
//           if (response.status === 404) {
//             setUsers([]);
//             setLoading(false);
//             return;
//           }
//           throw new Error(errorText || 'שגיאה בשליפת המשתמשים');
//         }
//         const data = await response.json();
//         console.log('כל המשתמשים התקבלו:', data);
//         setUsers(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error('שגיאה בשליפת המשתמשים:', err);
//       }
//     };

//     fetchAllUsers();
//   }, [userTz, navigate]);

//   const toggleDetails = (userId) => {
//     setExpandedUserId(expandedUserId === userId ? null : userId);
//   };

//   return (
//     <div className="my-orders-container">
//       <h2 className="my-orders-title">כל המשתמשים</h2>
//       {loading && (
//         <div className="loading">
//           <div className="spinner"></div>
//           טוען משתמשים...
//         </div>
//       )}
//       {error && <div className="error">שגיאה: {error}</div>}
//       {!loading && !error && users.length === 0 && (
//         <p className="no-orders">אין משתמשים להצגה</p>
//       )}
//       {!loading && !error && users.length > 0 && (
//         <ul className="orders-list">
//           {users.map((user, index) => (
//             <li key={user.id || user.tz} className="order-item" style={{ animationDelay: `${index * 0.1}s` }}>
//               <div className="order-details">
//                 <p className="user-name">
//                   <span className="user-icon">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
//                       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </span>
//                   {user.name || 'משתמש לא ידוע'}
//                 </p>
//                 <p><span className="order-label">תעודת זהות:</span> {user.tz || user.id}</p>
//                 <button
//                   className="details-button"
//                   onClick={() => toggleDetails(user.id || user.tz)}
//                 >
//                   {expandedUserId === (user.id || user.tz) ? 'הסתר פרטים' : 'פרטים נוספים'}
//                 </button>
//                 {expandedUserId === (user.id || user.tz) && (
//                   <div className="user-details-grid">
//                     {Object.entries(user).map(([key, value]) => (
//                       <div key={key} className="user-detail-box">
//                         <span className="detail-label">{key}:</span>
//                         <span className="detail-value">{value.toString()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AllUsersPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MyOrdersPage.css';

function AllUsersPage() {
  const userTz = useSelector((state) => state.user.currentUser?.tz || 'אנונימי');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    console.log('userTz:', userTz);
    if (userTz === 'אנונימי') {
      console.log('מפנה ל-/login כי המשתמש לא מחובר');
      setError('אנא התחבר כדי לראות את המשתמשים');
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchAllUsers = async () => {
      try {
        console.log('שולף את כל המשתמשים');
        const response = await fetch(`http://localhost:4000/user`);
        if (!response.ok) {
          const errorText = await response.text();
          console.log('תגובת שגיאה מה-API:', errorText, 'סטטוס:', response.status);
          if (response.status === 404) {
            setUsers([]);
            setLoading(false);
            return;
          }
          throw new Error(errorText || 'שגיאה בשליפת המשתמשים');
        }
        const data = await response.json();
        console.log('כל המשתמשים התקבלו:', data);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('שגיאה בשליפת המשתמשים:', err);
      }
    };

    fetchAllUsers();
  }, [userTz, navigate]);

  const toggleDetails = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const filterUserDetails = (user) => {
    const restrictedFields = ['orders', 'isAdmin', 'password'];
    return Object.entries(user).filter(([key]) => !restrictedFields.includes(key));
  };

  return (
    <div className="my-orders-container">
      <h2 className="my-orders-title">כל המשתמשים</h2>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          טוען משתמשים...
        </div>
      )}
      {error && <div className="error">שגיאה: {error}</div>}
      {!loading && !error && users.length === 0 && (
        <p className="no-orders">אין משתמשים להצגה</p>
      )}
      {!loading && !error && users.length > 0 && (
        <ul className="users-grid">
          {users.map((user, index) => (
            <li key={user.id || user.tz} className="user-card" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="order-details">
                <p className="user-name">
                  <span className="user-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  {user.name || 'משתמש לא ידוע'}
                </p>
                <p><span className="order-label">תעודת זהות:</span> {user.tz || user.id}</p>
                <button
                  className="details-button"
                  onClick={() => toggleDetails(user.id || user.tz)}
                >
                  {expandedUserId === (user.id || user.tz) ? 'הסתר פרטים' : 'פרטים נוספים'}
                </button>
                {expandedUserId === (user.id || user.tz) && (
                  <div className="user-details-list">
                    {filterUserDetails(user).map(([key, value]) => (
                      <p key={key} className="user-detail">
                        <span className="detail-label">{key}:</span>
                        <span className="detail-value">{value.toString()}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllUsersPage;