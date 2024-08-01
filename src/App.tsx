import { useEffect, useState } from 'react';
import Accounts from './components/Accounts/Accounts';
// import Header from './components/Header/Header';
import fetchResource from './helpers/fetchAPI';
import LoginForm from './components/LoginForm/LoginForm';

export default function App() {
  const [accounts, setAccounts] = useState<{ id: string }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    fetchResource('http://localhost:3000/client/accounts').then((response) => {
      if (response.status === 401) {
        setIsLoggedIn(false);

        return;
      }
      response.json().then((data) => {
        setAccounts(data.accounts);
      });
    });
  }, [isLoggedIn]);

  return (
    <>
      <p>123</p>
      {isLoggedIn ? <Accounts accounts={accounts} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}
