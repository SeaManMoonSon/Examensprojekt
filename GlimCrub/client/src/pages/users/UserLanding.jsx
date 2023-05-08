//components
import Categories from '../../components/misc/Categories'
import Logout from '../../components/misc/Logout'
import UserBalance from '../../components/users/UserBalance'

const UserLanding = () => {
    
    return (
        <div className="categories-container">

                <div className="categories__user">

                    <div className="categories__user-info">
                    <h2>Welcome, username!</h2>
                    <h3>Vad vill du äta idag?</h3>
                    </div>

                    <div className="categories__user-balance"><UserBalance /></div>
                    <div className="categories__user-logout"><Logout /></div>
                    </div>

                <div className="categories__menu">
                    <p>Meny:</p>
                    <div className="categories__menu-items"><Categories /></div>
                </div>
        </div>
    )
}

export default UserLanding