import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import Careers from './components/Careers';
import Blog from './components/Blog';
import LoginRegister from './components/LoginRegister';
import SignupManager from './components/dash/SignupManager';
import Contact from './components/Contact';
import ChatAndForum from './components/ChatAndForum';
import Paiements from './components/PaiementsG';
import NotificationManagement from './components/NotificationManagement';
import SupportTicketSystem from './components/SupportTicketSystem';
import GestionProfil from './components/GestionProfil';
import EduMaster from './components/EduMaster';
import PrivateRoute from './components/PrivateRoute';
import RoadmapPage from './components/RoadmapPage';
import ChatBot from './components/ChatBot';

// Teacher pages 
import HomeTeacher from './components/Teacher/HomeTeacher';
import CoursTeacher from './components/Teacher/CoursTeacher';
import CreeCours from './components/Teacher/CreeCours';
import CoursHTML from './components/Teacher/CoursHTML';
import HtmlCours from './components/Teacher/HtmlCours';
import CreeTecherMicroCours from './components/Teacher/CreeTecherMicroCours';

// Dashboard pages (routes protégées)
import Dashboard from './components/dash/Dashboard';
import AdminCours from './components/dash/AdminCours';
import AdminUser from './components/dash/AdminUser';
import AdminTeacher from './components/dash/AdminTeacher';
import Certifications from './components/dash/certifications';
import Settings from './components/dash/Settings';

import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Liste des routes où la Navbar ne doit pas s'afficher
  const hideNavbarRoutes = [
    '/Dashboard',
    '/dashboard',
    '/ManagerInterface',
    '/SignupManager',
     '/AdminCours',
     '/AdminUser',
     '/AdminTeacher',
     '/certifications',
     '/settings'
  ];

  // Vérifie si le chemin actuel commence par l'une des routes où on cache la Navbar
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {/* Afficher la Navbar si la route n'est pas dans hideNavbarRoutes */}
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ChatAndForum" element={<ChatAndForum />} />
        <Route path="/Paiements" element={<Paiements />} />
        <Route path="/NotificationManagement" element={<NotificationManagement />} />
        <Route path="/SupportTicketSystem" element={<SupportTicketSystem />} />
        <Route path="/GestionProfil" element={<GestionProfil />} />
        <Route path="/EduMaster" element={<EduMaster />} />

        <Route path="/RoadmapPage" element={<RoadmapPage />} />
        <Route path="/ChatBot" element={<ChatBot />} />

        

        {/* Routes pour les professeurs */}
        <Route path="/HomeTeacher" element={<HomeTeacher />} />
        <Route path="/CoursTeacher" element={<CoursTeacher />} />
        <Route path="/CreeCours" element={<CreeCours />} />
        <Route path="/courshtml" element={<CoursHTML />} />
        <Route path="/HtmlCours" element={<HtmlCours />} />
        <Route path="/CreeTecherMicroCours" element={<CreeTecherMicroCours />} />

        {/* Routes pour l'inscription du manager */}
        <Route path="/SignupManager" element={<SignupManager />} />

        {/* Routes protégées avec PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AdminCours" element={<AdminCours />} />
          <Route path="/AdminUser" element={<AdminUser />} />
          <Route path="/AdminTeacher" element={<AdminTeacher />} />
          <Route path="/Certifications" element={<Certifications />} />
          <Route path="/Settings" element={<Settings />} />

          

        </Route>
      </Routes>
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;
