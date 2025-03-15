import React from 'react';

const Register = ({ handleRegister, handleRegisterChange, registerData, showRegisterPassword, setShowRegisterPassword, passwordStrength }) => {
  return (
    <div className=" col-md-6LR d-flex justify-content-center">
      <form onSubmit={handleRegister}>
        <div className="header-textLR mb-4">
          <h1>Create Account</h1>
        </div>
        <div className="input-groupLR mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            className="form-control form-control-lg bg-light fs-6"
            onChange={handleRegisterChange}
            required
          />
        </div>
        <div className="input-groupLR mb-3">
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            className="form-control form-control-lg bg-light fs-6"
            onChange={handleRegisterChange}
            required
          />
        </div>
        <div className="input-groupLR mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control form-control-lg bg-light fs-6"
            onChange={handleRegisterChange}
            required
          />
        </div>
        <div className="input-groupLR mb-3 position-relative  input-wrapper--dirty">
  <div className="input-wrapper" style={{ position: 'relative' }}>
    <input
      type={showRegisterPassword ? "text" : "password"}
      name="password"
      placeholder="Password"
      className="form-control form-control-lg bg-light fs-6"
      onChange={handleRegisterChange}
      required
    />
    {/* Élément d'animation de la force du mot de passe */}
    <div
      className="caret progress"
      style={{ '--strength': `${passwordStrength.value}%` }}
    ></div>
  </div>
  {/* Affichage du texte de force */}
  <div style={{ color: passwordStrength.color, fontWeight: "bold", marginTop: "5px" }}>
    {passwordStrength.text}
  </div>
  <button1
    type="button"
    className="toggle-password-iconLR"
    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
  >
    {showRegisterPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.34 21.34 0 0 1 5.06-6.94" />
        <path d="M1 1l22 22" />
        <path d="M10.58 10.58a3 3 0 0 1 4.24 4.24" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )}
  </button1>
</div>
<div className="input-groupLR mb-3">
          <select
            name="role"
            className="form-control form-control-lg bg-light fs-6"
            onChange={handleRegisterChange}
            value={registerData.role}
          >
            <option value="user">User</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="input-groupLR mb-3 justify-content-center">
          <button className="btn border-white text-white w-50 fs-6" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
