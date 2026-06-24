import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs" element={<div className="flex-grow flex items-center justify-center text-3xl font-bold">Programs Page Coming Soon</div>} />
            <Route path="/why-us" element={<div className="flex-grow flex items-center justify-center text-3xl font-bold">Why Us Page Coming Soon</div>} />
            <Route path="/success" element={<div className="flex-grow flex items-center justify-center text-3xl font-bold">Success Showcase Coming Soon</div>} />
            <Route path="/register" element={<div className="flex-grow flex items-center justify-center text-3xl font-bold">Application Form Coming Soon</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
