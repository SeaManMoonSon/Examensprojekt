import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

const UserStart = () => {
  const [users, setUsers] = useState ('')
  const [password, setPassword] = useState ('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    //console.log(users, password);
    await login(users, password);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Logga in</h3>

      <label>Personnummer:</label>
      <input type="text" 
            onChange={(e) => setUsers(e.target.value)}
            value={users}
      />
      <label>PIN</label>
      <input type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
      />

      <button>Logga in</button>
      { error && <div className="error">{error}</div>}
    </form>
  )
}

export default UserStart
