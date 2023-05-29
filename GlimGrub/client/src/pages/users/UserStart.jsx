import { useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/userAuthContext";

//media
import startImg from '../../media/start-img.jpg';

// styles
import '../../sass/style.scss'

const UserStart = () => {
  const { user } = useAuthContext();
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(login(ssn, password));

    const loginSuccessful = await login(ssn, password);
    if (loginSuccessful) {
      navigate('/landing');
    }
  };

  return (
    <div className="login-page__container">

      <div className="login-page__img">
      </div>

      <div className="login-page__form-container">
        <form onSubmit={handleSubmit}>
          <div className="login-page__form-text">
            <h3>GlimCrub</h3>
            <p>Välkommen</p>
          </div>

          <div className="login-page__form-input">
            {/* <label>Personnummer:</label> */}
            <input
              type="text"
              name="ssn"
              onChange={(e) => setSsn(e.target.value)}
              value={ssn}
              placeholder="Personnummer"
            />

            {/* <label>PIN</label> */}
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="PIN"
            />

            <button>Logga in</button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserStart;
