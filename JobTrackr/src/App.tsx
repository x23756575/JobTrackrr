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

export default function App() {

  return (

   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Landing/>}></Route>
       <Route path="/home" element={<Home/>}></Route>
       <Route path="/login" element={<LoginPage/>}></Route>
       <Route path="/signup" element={<SignupPage/>}></Route>
       <Route path="/scan" element={<ResumePage/>}></Route>
       <Route path="/chat" element={<ChatPage/>}></Route>
       <Route path="/track" element={<TrackPage/>}></Route>
       <Route path="/calendar" element={<CalendarPage/>}></Route>
       <Route path="/rewrite" element={<RewritePage/>}></Route>
       <Route path="/terms-of-service" element={<TermsPage/>}></Route>
       <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
       <Route path="/test" element={<TestPage/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

