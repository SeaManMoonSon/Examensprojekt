import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../hooks/userAuthContext'

const UserStart = () => {
  const { user } = useAuthContext()
  const [ssn, setSsn] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const history = useHistory(); // Instantiate useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loginSuccessful = await login(ssn, password);
    if (loginSuccessful) {
      history.push('/newpage'); // Navigate to new page
    }
  }

  return (
    <div className="container">
      {user && (
        <div>
          <h2>{user.name}</h2>
        </div>
      )}

      <form className="login" onSubmit={handleSubmit}>
        <h3>Logga in</h3>

        <label>Personnummer:</label>
        <input
          type="text"
          name="ssn"
          onChange={(e) => setSsn(e.target.value)}
          value={ssn}
        />

        <label>PIN</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>Logga in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default UserStart

// import { useEffect, useState } from "react";

// // components
// import UserLogin from "../../components/users/UserLogin";

// const UserStart = () => {
//   const [users, setUsers] = useState(null)

//   useEffect(() =>  {
//       const fetchUser = async () => {
//           const response = await fetch('/api/users')
//           const json = await response.json()

//           if (response.ok) {
//               setUsers(json)
//           }
//       }

//       fetchUser()
//   }, [])

//   const [products, setProducts] = useState(null);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       const response = await fetch("/api/products");
//       const json = await response.json();

//       if (response.ok) {
//         setProducts(json);
//       }
//     };

//     fetchMenu();
//   }, []);

//   return (
//     <div className="start">
//       <UserLogin />
//       {/* <div className="users">
//         {products && products.map((product) => 
//         product.menu && product.menu.snack.map((item) => (
//                 <p key={item._id}>{item.name}</p>
//               ))
//           )}
//       </div> */}
//     </div>
//   );
// };

// export default UserStart;