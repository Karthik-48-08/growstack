import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import RegisterApplication from './pages/RegisterApplication';
import WhyUs from './pages/WhyUs';
import Success from './pages/Success';
import ProgramEnrollment from './pages/ProgramEnrollment';
import DayView from './pages/DayView';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import useSocketStore from './lib/useSocketStore';
import useAuthStore from './lib/authStore';

function App() {
  const connectSocket = useSocketStore((s) => s.connect);
  const disconnectSocket = useSocketStore((s) => s.disconnect);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      connectSocket();
    } else {
      disconnectSocket();
    }
    return () => {
      disconnectSocket();
    };
  }, [token, connectSocket, disconnectSocket]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/success" element={<Success />} />
            <Route path="/register" element={<RegisterApplication />} />

            {/* Authenticated routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/program/:programId"
              element={
                <ProtectedRoute>
                  <ProgramEnrollment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/:dayId"
              element={
                <ProtectedRoute>
                  <DayView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
