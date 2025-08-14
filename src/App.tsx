import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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


function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/resume/:id/edit" element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } />
                <Route path="/resume/new" element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } />
                <Route path="/resume/:id/preview" element={
                  <ProtectedRoute>
                    <ResumePreview />
                  </ProtectedRoute>
                } />
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