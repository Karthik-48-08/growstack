import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import RegisterApplication from './pages/RegisterApplication';
import WhyUs from './pages/WhyUs';
import Success from './pages/Success';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import useSocketStore from './lib/useSocketStore';

function App() {
  const connectSocket = useSocketStore(state => state.connect);
  const disconnectSocket = useSocketStore(state => state.disconnect);

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/success" element={<Success />} />
            <Route path="/register" element={<RegisterApplication />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
