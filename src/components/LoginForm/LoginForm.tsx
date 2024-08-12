import { useForm, FieldValues } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import authorize from '../../helpers/api/login';
import './LoginForm.css';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const authorizeHandler = (formBody: FieldValues) => authorize(formBody, navigate, setErrorMsg);
  const toggleVisibility = () => {
    const visibilityButton = document.getElementsByClassName('password-visibility-button')[0];
    const passwordField = document.getElementsByClassName('password-input')[0];
    visibilityButton.classList.toggle('unseen');
    const inputType = passwordField.attributes.getNamedItem('type');
    const newTypeValue = inputType!.value === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', newTypeValue);
  };

  return (
    <div className="form-container">
      <div className="flex-container">
        <h2 className="form-header">Login</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit(authorizeHandler)}>
        <input type="email" className="input-with-text" {...register('email')} placeholder="email" />
        <div className="password-container">
          <div className="password-visibility-button unseen" onClick={toggleVisibility}>
            <FontAwesomeIcon icon={faEye} className="eye" />
            <FontAwesomeIcon icon={faEyeSlash} className="eye-slash" />
          </div>
          <input
            type="password"
            className="input-with-text password-input"
            {...register('password')}
            placeholder="password"
          />
        </div>
        {errorMsg !== null && <div className="error-container">{errorMsg}</div>}
        <button type="submit" className="submit-button">Enter</button>
      </form>
    </div>
  );
}

export default LoginForm;
