import { useEffect, useState } from 'react';
import Accounts from './components/Accounts/Accounts';
// import Header from './components/Header/Header';
import fetchResource from './helpers/fetchAPI';
import LoginForm from './components/LoginForm/LoginForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    fetchResource('http://localhost:3000/client/accounts').then((response) => {
      if (response.status === 401) {
        setIsLoggedIn(false);

        return;
      }
      response.json().then(() => {
        setIsLoggedIn(true);
      });
    });
  }, []);

  return (
    <>
      <p>123</p>
      {isLoggedIn ? <Accounts /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}
