import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import EfficiencyPage from './pages/EfficiencyPage';
import PowerAnalytics from './pages/PowerAnalytics';
import RobotPage from './pages/RobotPage';
import AlertsPage from './pages/AlertsPage';
import QuickActions from './pages/QuickActions';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';

function AppContent() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? (
                <>
                  <Navbar />
                  <Overview />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route 
              path="/efficiency" 
              element={user ? (
                <>
                  <Navbar />
                  <EfficiencyPage />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route 
              path="/power" 
              element={user ? (
                <>
                  <Navbar />
                  <PowerAnalytics />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route 
              path="/robot" 
              element={user ? (
                <>
                  <Navbar />
                  <RobotPage />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route 
              path="/alerts" 
              element={user ? (
                <>
                  <Navbar />
                  <AlertsPage />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route 
              path="/actions" 
              element={user ? (
                <>
                  <Navbar />
                  <QuickActions />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={user ? (
                <>
                  <Navbar />
                  <Settings />
                </>
              ) : <Navigate to="/login" />} 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
