import React from 'react';

const Login = ({ handleLogin, handleLoginChange, showLoginPassword, setShowLoginPassword }) => {
  return (
    <div className="form-group col-md-6 right-boxLR">
      <form onSubmit={handleLogin}>
        <div className="header-textLR mb-4">
          <h1>Sign In</h1>
        </div>
        <div className="input-groupLR mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control form-control-lg bg-light fs-6"
            onChange={handleLoginChange}
            required
          />
        </div>
        <div className="input-groupLR mb-3 position-relative">
          <input
            type={showLoginPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="form-control form-control-lg bg-light fs-6"
            onChange={handleLoginChange}
            required
          />
          <button1
            type="button"
            className="toggle-password-iconLR"
            onClick={() => setShowLoginPassword(!showLoginPassword)}
          >
            {showLoginPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <div className="input-groupLR mb-5 d-flex justify-content-between">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="formcheck" />
            <label htmlFor="formcheck" className="form-check-label text-secondary">
              <small>Remember me</small>
            </label>
          </div>
          <div className="forgot">
            <small>
              <a href="#">Forgot password?</a>
            </small>
          </div>
        </div>
        <div className="input-groupLR mb-3 justify-content-center">
          <button className="btn text-white w-50 fs-6" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
