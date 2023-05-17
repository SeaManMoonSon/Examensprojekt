import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/userAuthContext';

import '@fortawesome/fontawesome-free/css/all.min.css';

// Pages
import { Dashboard, AdminProducts, AdminStart, Users, Fika, UserStart, UserLanding } from './pages';

// Components
import { AdminLogin, AdminNavigation, AdminSaldo, Buttons, Categories, ListUsers, Products, UserAlert, UserConfirmation, UserLogin, UserNavbar, UserPassword, UserSaldo } from './components';

function App() {
  const { user } = useAuthContext()

  return (
  
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<UserStart />} />
            <Route path="/login" element={<UserStart />}/>
            <Route path="/landing" element={user ? <UserLanding /> : <Navigate to="/login" />}/>
            <Route path="/fika" element={user ? <Fika /> : <Navigate to="/login" />} />
            <Route path="/admin/login" element={<AdminStart />} />
            <Route path="/admin/landing" element={user ? <Dashboard /> : <Navigate to="/admin/login"/>} />
          </Routes>
        </Router>
        
    </div>
    
  );
}

export default App;

