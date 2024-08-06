import { useForm, FieldValues } from 'react-hook-form';
import React from 'react';
import fetchResource from '../../helpers/fetchAPI';

type LoginFormInputProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginForm(
  { setIsLoggedIn }: LoginFormInputProps,
) {
  const { register, handleSubmit } = useForm();

  function authorize(formBody: FieldValues) {
    fetchResource('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify(formBody),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response: Response) => response.json())
      .then(() => {
        setIsLoggedIn(true);
      });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(authorize)}>
      <input type="email" {...register('email')} />
      <input type="password" {...register('password')} />
      <button type="submit">Войти</button>
    </form>
  );
}
