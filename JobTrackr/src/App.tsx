import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from "./Landing.tsx";
import LoginPage from "./LoginPage.tsx";
import SignupPage from "./SignupPage.tsx";
import Home from "./HomePage.tsx";
import ResumePage from "./ResumePage.tsx";
import ChatPage from "./Chat.tsx";
import TrackPage from "./Applications.tsx";
import CalendarPage from "./Calendar.tsx";
import RewritePage from "./Rewrite.tsx";
import TermsPage from "./terms.tsx";
import PrivacyPolicy from "./pp.tsx"
import TestPage from "./testtimeline.tsx";
import PaymentsPage from "./Payments.tsx";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function App() {

  return (

      <AuthProvider>
         <BrowserRouter>
           <Routes>
             <Route path="/" element={<Landing />} />
             <Route path="/login" element={<LoginPage />} />
             <Route path="/signup" element={<SignupPage />} />
             <Route path="/terms-of-service" element={<TermsPage />} />
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />

             <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
             <Route path="/scan" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
             <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
             <Route path="/track" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
             <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
             <Route path="/rewrite" element={<ProtectedRoute><RewritePage /></ProtectedRoute>} />
             <Route path="/test" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
             <Route path="/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
          </Routes>
         </BrowserRouter>
      </AuthProvider>
  )
}

