import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Dashboard, AdminProducts, AdminStart, Users, Fika, UserStart, UserLanding } from './pages';

// Components
import { AdminLogin, AdminNavigation, AdminSaldo, Buttons, Categories, ListUsers, Products, UserAlert, UserConfirmation, UserLogin, UserNavbar, UserPassword, UserSaldo } from './components';

// import Start from './pages/users/Start'
// import Categories from './pages/users/UserLanding'
// import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<UserStart />}
            />
            <Route
              path="/categories"
              element={<Categories />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
