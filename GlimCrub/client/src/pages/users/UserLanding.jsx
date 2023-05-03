//components
import Categories from '../../components/misc/Categories'

const UserLanding = () => {
    return (
        <div className="categories-container">

                <div className="categories__left">
                    <p>Categories left</p>
                    <h2>Welcome, username!</h2>
                    </div>

                <div className="categories__right">
                    <p>Categories right</p>
                    <Categories />
                </div>
        </div>
    )
}

export default UserLanding