import { useForm, FieldValues } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import authorize from '../../helpers/api/login';
import './LoginForm.css';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const authorizeHandler = (formBody: FieldValues) => authorize(formBody, navigate, setErrorMsg);

  return (
    <div className="form-container">
      <div className="flex-container">
        <h2 className="form-header">Login</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit(authorizeHandler)}>
        <input type="email" className="input-with-text" {...register('email')} placeholder="email" />
        <FontAwesomeIcon icon={faEye} />
        <input type="password" className="input-with-text" {...register('password')} placeholder="password" />
        {errorMsg !== null && <div className="error-container">{errorMsg}</div>}
        <button type="submit" className="submit-button">Enter</button>
      </form>
    </div>
  );
}

export default LoginForm;
