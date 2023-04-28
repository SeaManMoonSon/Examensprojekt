import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Pages & Components
import Start from './pages/users/Start'
import Categories from './pages/users/Categories'
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
