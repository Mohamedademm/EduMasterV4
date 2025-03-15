import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/LoginRegister.css';
import axios from 'axios';
import Login from './Login';
import Register from './Register';

function LoginRegister() {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: "", color: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const content = document.getElementById('contentLR');
    const registerBtn = document.getElementById('registerLR');
    const loginBtn = document.getElementById('loginLR');
    const body = document.querySelector('body');

    if (registerBtn && loginBtn) {
      registerBtn.addEventListener('click', () => {
        content.classList.add('active');
        body.classList.add('register-active');
      });

      loginBtn.addEventListener('click', () => {
        content.classList.remove('active');
        body.classList.remove('register-active');
      });
    }
  }, []);

  // Vérifie la force du mot de passe
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
    if (strength === 0) return { text: "Très faible", color: "red", value: 0 };
    if (strength === 1) return { text: "Faible", color: "orange", value: 25 };
    if (strength === 2) return { text: "Moyen", color: "yellow", value: 50 };
    if (strength === 3) return { text: "Fort", color: "lightgreen", value: 75 };
    return { text: "Très fort", color: "green", value: 100 };
  };

  // Gestion du changement des champs d'inscription
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion du changement des champs de connexion
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Gestion de l'inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', registerData);
      alert(response.data.message);
      if (registerData.role === 'user' || registerData.role === 'teacher') {
        const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
          email: registerData.email,
          password: registerData.password
        });
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
        // Stockage de l'ID du teacher si le rôle est "teacher"
        if (loginResponse.data.user.role === 'teacher') {
          localStorage.setItem('teacherId', loginResponse.data.user._id);
        }
        alert('Registration and login successful');
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Stockage de l'ID du teacher si le rôle est "teacher"
      if (response.data.user.role === 'teacher') {
        localStorage.setItem('teacherId', response.data.user._id);
      }
      alert('Login successful');
      if (response.data.user.role === 'admin') {
        navigate('/Dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const showLogin = () => {
    document.querySelector(".contentLR").classList.remove("right-panel-active");
  };
  
  const showRegister = () => {
    document.querySelector(".contentLR").classList.add("right-panel-active");
  };

  return (
    <div className="background-gradientLR">
      {loading && (
        <div className="spinner-overlayLR">
          <div className="spinnerLR"></div>
        </div>
      )}
      <div className="contentLR justify-content-center align-items-center d-flex shadow-lg" id="contentLR">
        {/* Formulaire d'inscription */}
        <Register
          handleRegister={handleRegister}
          handleRegisterChange={handleRegisterChange}
          registerData={registerData}
          showRegisterPassword={showRegisterPassword}
          setShowRegisterPassword={setShowRegisterPassword}
          passwordStrength={passwordStrength}
        />

        {/* Formulaire de connexion */}
        <Login
          handleLogin={handleLogin}
          handleLoginChange={handleLoginChange}
          showLoginPassword={showLoginPassword}
          setShowLoginPassword={setShowLoginPassword}
        />

        {/* Switch panel */}
        <div className="switch-contentLR">
          <div className="switchLR">
            <div className="switch-panelLR switch-leftLR">
              <h1>Hello, Again</h1>
              <p>We are happy to see you back</p>
              <button id="loginLR" className="hiddenLR btn border-white text-white w-50 fs-6" onClick={showLogin}>
                Login
              </button>
            </div>
            <div className="switch-panelLR switch-rightLR">
              <h1>Welcome</h1>
              <p>Join Our Unique Platform, Explore a New Experience</p>
              <button id="registerLR" className="hiddenLR btn border-white text-white w-50 fs-6" onClick={showRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
    </div>
  );
}

export default LoginRegister;
