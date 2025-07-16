import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Newsletter from './components/Newsletter';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DonationForm from './components/DonationForm';
import FindFood from './components/FindFood';
import DonationConfirmation from './components/DonationConfirmation';
import FeedRequestConfirmation from './components/FeedRequestConfirmation';
import Feedback from './components/Feedback';
import Chat from './components/Chat'; // <-- Import Chat component
import ChangePassword from './components/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/Auth'; // Update this line
import ErrorBoundary from './components/ErrorBoundary';
import Profile from './components/Profile'; // <-- Import Profile component
import Dashboard from './components/Dashboard'; // <-- Import Dashboard component

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <Features />
                <HowItWorks />
                <Newsletter />
                <Testimonials />
                <Footer />
              </>
            } />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirmation" element={<DonationConfirmation />} />
            <Route path="/request-confirmation" element={<FeedRequestConfirmation />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/chat" element={<Chat />} />           {/* <-- Add Chat route */}
            <Route path="/change-password" element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/donate" element={
              <ProtectedRoute roles={['Doner', 'Admin']}>
                <DonationForm />
              </ProtectedRoute>
            } />
            <Route path="/feed" element={
              <ProtectedRoute roles={['Receiver', 'Admin']}>
                <FindFood />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['Admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* Add Contact route if needed */}
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

