import { FieldValues } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
import React from 'react';
import fetchResource from '../fetchAPI';

const getAuthorizeOptions = (formBody: FieldValues) => ({
  method: 'POST',
  body: JSON.stringify(formBody),
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include' as RequestCredentials,
});

const authorize = async (
  formBody: FieldValues,
  navigate: NavigateFunction,
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const response = await fetchResource('http://localhost:3000/auth/login', getAuthorizeOptions(formBody));
    if (!response.ok) {
      setErrorMsg('Invalid username or password');

      return;
    }
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from') || '/';
    setErrorMsg(null);
    navigate(from);
  } catch (err) {
    setErrorMsg('The server is not responding. Try again later.');
  }
};

export default authorize;
