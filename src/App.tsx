import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';
import { Toaster } from './components/ui/Toaster';
import Landing from './pages/LandingPage';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          {/* Deep space violet gradient */}
          <div className="min-h-screen bg-deep-space">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resume/:id/edit"
                  element={
                    <ProtectedRoute>
                      <ResumeBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resume/new"
                  element={
                    <ProtectedRoute>
                      <ResumeBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resume/:id/preview"
                  element={
                    <ProtectedRoute>
                      <ResumePreview />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Landing />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
