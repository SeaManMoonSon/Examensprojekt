//components
import { CategoriesFika } from "../../components";
import Categories from "../../components/misc/Categories";
import Logout from "../../components/misc/Logout";
import UserBalance from "../../components/users/UserBalance";
import { useAuthContext, userAuthContext } from "../../hooks/userAuthContext";

const UserLanding = () => {
  const { user } = useAuthContext();

  return (
    <div className="categories-container">
      <div className="categories__user">
        <div className="categories__user-info">
          {user && (
            <div>
              <h2>{user.user.name}</h2>
            </div>
          )}

          <h3>Vad vill du äta idag?</h3>
        </div>

        <div className="categories__user-balance">
          <UserBalance />
        </div>
        <div className="categories__user-logout">
          <Logout />
        </div>
      </div>

      <div className="categories__menu">
        <p>Meny:</p>
        <div className="categories__menu-items">
          <Categories />
          <CategoriesFika />
        </div>
      </div>
    </div>
  );
};

export default UserLanding;
