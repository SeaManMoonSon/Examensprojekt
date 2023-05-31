//components
import { CategoriesFika } from "../../components";
import Categories from "../../components/misc/Categories";
import Logout from "../../components/misc/Logout";
import UserBalance from "../../components/users/UserBalance";
import UserConfirmation from "../../components/users/UserConfirmation";
import { useAuthContext, userAuthContext } from "../../hooks/userAuthContext";

import '../../sass/style.scss'

const UserLanding = () => {
  const { user } = useAuthContext();

  return (
    <div className="categories-container">

      <div className="categories__user-container">
        
      <div className="categories__img"></div>
      <div className="categories__img img-fika"></div>

      <div className="categories__user">


        <div className="categories__user-balance">
          {/* <UserBalance /> */}
        </div>
        <div className="categories__user-logout">
          
        </div>
      </div>
      </div>

      <div className="categories__menu">
      <div className="categories__menu-welcome">
          {user && (
            <div>
              <h3>Välkommen, {user.user.name.split(" ")[0]}</h3>
            </div>
          )}
          {user.user.role === "deltagare" && (
            <p>Ditt saldo: {user.user.balance} sek</p>
          )}
        </div>
        
        <div className="categories__menu-items">
          <Categories />
          {/* <CategoriesFika /> */}
        </div>
        <Logout />
        </div>
      </div>
  );
};

export default UserLanding;
