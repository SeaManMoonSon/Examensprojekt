import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { renderRoutes } from 'react-router-config';
// import { routes } from './routes/AppRoutes.js';

// Pages
import { Dashboard, AdminProducts, AdminStart, Users, Fika, UserStart, UserLanding } from './pages';

// Components
import { AdminLogin, AdminNavigation, AdminSaldo, Buttons, Categories, ListUsers, Products, UserAlert, UserConfirmation, UserLogin, UserNavbar, UserPassword, UserSaldo } from './components';

// import UserStart from './pages/users/UserStart'
// import UserLanding from './pages/users/UserLanding'
// import Fika from './pages/users/Fika'

function App() {

  return (
  
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<UserStart />} />
            <Route path="/landing" element={<UserLanding />} />
            <Route path="/fika" element={<Fika />} />
          </Routes>
        </Router>
    </div>
    
  );
}

export default App;

