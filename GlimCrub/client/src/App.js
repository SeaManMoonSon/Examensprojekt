import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
// import { AdminLogin, AdminNavigation, AdminSaldo, Buttons, Categories, ListUsers, Products, UserAlert, UserConfirmation, UserLogin, UserNavbar, UserPassword, UserSaldo } from './components';

// Components
// import { AdminLogin, AdminNavigation, AdminSaldo, Buttons, ListUsers, Products, UserAlert, UserConfirmation, UserLogin, UserNavbar, UserPassword, UserSaldo } from './components';

import Start from './pages/users/Start'
import Categories from './pages/users/UserLanding'
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
              element={<Start />}
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
