import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaUser, FaSun, FaMoon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../Css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAuthenticated = localStorage.getItem('token');

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [dropdownNavbarOpen, setdropdownNavbarOpen] = useState(false);


  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="navContainer">
        <div className="navWrapper">
          <div className="logoNavLinks">
          <NavLink to="/" className="navButtonEduMaster" data-text="Awesome">
            <span className="navActualText">&nbsp;EduMaster&nbsp;</span>
            <span aria-hidden="true" className="navHoverText">&nbsp;EduMaster&nbsp;</span>
          </NavLink>


            <div className="navLinks">
              <NavLink to="/" className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}>
                {t('Home')}
              </NavLink>
              <NavLink to="/courses" className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}>
                {t('Courses')}
              </NavLink>
              <NavLink to="/careers" className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}>
                {t('Careers')}
              </NavLink>
              
              
              <NavLink to="/blog" className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}>
                {t('Blog')}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}>
                {t('Contact')}
              </NavLink>

               {/* dropdownNavbar */}
               <div className="dropdownNavbar">
                <button className="dropbtn" onClick={() => setdropdownNavbarOpen(!dropdownNavbarOpen)}>
                  {t('More')}
                </button>
                {dropdownNavbarOpen && (
                  <div className="dropdownNavbar-content">
                    <NavLink to="/ChatAndForum" className="dropdownNavbar-link">
                      {t('ChatAndForum')}
                    </NavLink>
                    <NavLink to="/Paiements" className="dropdownNavbar-link">
                      {t('GPaiements')}
                    </NavLink>
                    <NavLink to="/NotificationManagement" className="dropdownNavbar-link">
                      {t('NotificationManagement')}
                    </NavLink>
                    <NavLink to="/SupportTicketSystem" className="dropdownNavbar-link">
                      {t('SupportTicketSystem')}
                    </NavLink>
                    <NavLink to="/RoadmapPage" className="dropdownNavbar-link">
                      {t('RoadmapPage')}
                    </NavLink>
                    
                    <NavLink to="/HomeTeacher" className="dropdownNavbar-link">
                      {t('HomeTeacher')}
                    </NavLink>
                    
                    <NavLink to="/CoursTeacher" className="dropdownNavbar-link">
                      {t('CoursTeacher')}
                    </NavLink>
                    
                    <NavLink to="/CreeCours" className="dropdownNavbar-link">
                      {t('CreeCours')}
                    </NavLink>

                    <NavLink to="/ChatBot" className="dropdownNavbar-link">
                      {t('ChatBot')}
                    </NavLink>
                    
                    
                    
                  </div>
                )}
              </div>
             
            </div>
          </div>
          
          {/* Sélecteur de langue */}
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-selector">
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>

          <div className="authButtons">
            {isAuthenticated ? (
              <>
                <button className="logoutButton" onClick={handleLogout}>
                  {t('Logout')}
                </button>
                <div className="profile-container" onClick={() => navigate('/GestionProfil')} title={t('Profile')}>
                  <FaUser className="profile-icon" />
                </div>
              </>
            ) : (
              <button className="signupButton" onClick={() => navigate('/login')}>
                {t('Login')}
              </button>
            )}
          </div>

          {/* Mode sombre */}
          <div className="darkModeToggle" onClick={() => setDarkMode(prev => !prev)}>
            <div className={`toggle-switch ${darkMode ? 'dark' : 'light'}`}>
              <div className="toggle-circle">
                {darkMode ? <FaSun className="darkModeIcon" /> : <FaMoon className="darkModeIcon" />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
