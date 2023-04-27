import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages & Components
import Start from './pages/Start'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Start />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
