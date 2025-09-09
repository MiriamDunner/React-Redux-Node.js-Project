
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// import { loginOrRegister } from "../features/user/userSlice";
// import { useNavigate } from 'react-router-dom';

// function RegisterForm({ onSuccess }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     tz: "",
//     email: "",
//     password: "",
//     isAdmin:false,
//     orders:[],
//   });

//   const dispatch = useDispatch();
//   const error = useSelector((state) => state.user.error);
//   const status = useSelector((state) => state.user.status);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
// const navigate = useNavigate();

// const handleLoginSuccess = (user) => {
//   dispatch(setCurrentUser(user));
//   navigate("/home");
// };



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.tz || !formData.password) {
//       return alert("יש להזין תעודת זהות וסיסמה");
//     }

//     const resultAction = await dispatch(loginOrRegister(formData));
//     if (loginOrRegister.fulfilled.match(resultAction)) {
//       onSuccess(resultAction.payload); 
//     }
   
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-black text-white p-6 rounded-lg w-96 mx-auto mt-10"
//     >
//       <h2 className="text-2xl mb-4">התחברות / הרשמה</h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="שם מלא"
//         className="w-full p-2 mb-2 bg-gray-800"
//         onChange={handleChange}
//         value={formData.name}
//       />
//       <input
//         type="text"
//         name="tz"
//         placeholder="תעודת זהות"
//         className="w-full p-2 mb-2 bg-gray-800"
//         onChange={handleChange}
//         value={formData.tz}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="אימייל"
//         className="w-full p-2 mb-2 bg-gray-800"
//         onChange={handleChange}
//         value={formData.email}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="סיסמה"
//         className="w-full p-2 mb-4 bg-gray-800"
//         onChange={handleChange}
//         value={formData.password}
//         required
//       />

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <button
//         type="submit"
//         className="w-full bg-white text-black py-2 rounded"
//         disabled={status === "loading"}
//       >
//         {status === "loading" ? "טוען..." : "התחבר / הרשם"}
//       </button>
//     </form>
//   );
// }

// export default RegisterForm;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginOrRegister } from "../features/user/userSlice";
import { useNavigate } from 'react-router-dom';

import "./RegisterForm.css";

function RegisterForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    tz: "",
    email: "",
    password: "",
    isAdmin: false,
    orders: [],
  });

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tz || !formData.password) {
      return alert("יש להזין תעודת זהות וסיסמה");
    }

    const resultAction = await dispatch(loginOrRegister(formData));
    if (loginOrRegister.fulfilled.match(resultAction)) {
      onSuccess(resultAction.payload);
      navigate("/home");
    }
  };

  return (

    <form onSubmit={handleSubmit} className="form-container">
  <h2 className="form-title">התחברות / הרשמה</h2>

  <label className="form-label">שם מלא</label>
  <input
    type="text"
    name="name"
    placeholder="שם מלא"
    className="form-input"
    onChange={handleChange}
    value={formData.name}
  />

  <label className="form-label">תעודת זהות</label>
  <input
    type="text"
    name="tz"
    placeholder="תעודת זהות"
    className="form-input"
    onChange={handleChange}
    value={formData.tz}
    required
  />

  <label className="form-label">אימייל</label>
  <input
    type="email"
    name="email"
    placeholder="אימייל"
    className="form-input"
    onChange={handleChange}
    value={formData.email}
  />

  <label className="form-label">סיסמה</label>
  <input
    type="password"
    name="password"
    placeholder="סיסמה"
    className="form-input"
    onChange={handleChange}
    value={formData.password}
    required
  />

  {error && <p className="error-message">{error}</p>}

  <button
    type="submit"
    className="submit-btn"
    disabled={status === "loading"}
  >
    {status === "loading" ? "טוען..." : "התחבר / הרשם"}
  </button>
</form>

  );
}

export default RegisterForm;
