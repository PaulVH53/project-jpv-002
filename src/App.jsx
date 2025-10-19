import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingPage from '@/pages/LandingPage';
import JobsPage from '@/pages/JobsPage';
import SuccessStoriesPage from '@/pages/SuccessStoriesPage';
import SuccessStoryDetailPage from '@/pages/SuccessStoryDetailPage';
import AccessPage from '@/pages/AccessPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ApplicationsPage from '@/pages/ApplicationsPage';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { BallTriangle } from 'react-loader-spinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#0A2540"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return user ? children : <Navigate to="/acceso" />;
};

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/vacantes" element={<JobsPage />} />
            <Route path="/casos-de-exito" element={<SuccessStoriesPage />} />
            <Route path="/casos-de-exito/:storyId" element={<SuccessStoryDetailPage />} />
            <Route path="/acceso" element={<AccessPage />} />
            <Route path="/panel" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/perfil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/aplicaciones" element={<PrivateRoute><ApplicationsPage /></PrivateRoute>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;