import React, { useState } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';

import './style.scss';

const Index = ({ toggle, login, register }) => {
  const [loginToggle, setLoginToggle] = useState(true);
  const [registerToggle, setRegisterToggle] = useState(false);

  const ToggleLogin = () => {
    setLoginToggle(true);
    setRegisterToggle(false);
  };

  const ToggleRegister = () => {
    setRegisterToggle(true);
    setLoginToggle(false);
  };

  return (
    <div
      style={{
        display: toggle ? 'block' : 'none',
      }}
      className='auth'>
      <div className='auth-wrapper'>
        <div className='auth-title flex flex-ai-c flex-jc-c'>
          <button
            onClick={ToggleLogin}
            className={`login-title ${
              (loginToggle && login) || loginToggle ? 'btn-title-active' : ''
            }`}>
            Login
          </button>
          <span>or</span>
          <button
            onClick={ToggleRegister}
            className={`signup-title ${
              (registerToggle && register) || registerToggle
                ? 'btn-title-active'
                : ''
            }`}>
            Register
          </button>
        </div>
        <Login toggle={loginToggle} />
        <Register toggle={registerToggle} />
      </div>
    </div>
  );
};

export default Index;
