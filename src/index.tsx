import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter, LoaderFunctionArgs, RouterProvider, redirect,
} from 'react-router-dom';
import App from './App';
import Accounts from './components/Accounts/Accounts';
import Banks from './components/Banks/Banks';
import LoginForm from './components/LoginForm/LoginForm';
import getCookie from './helpers/getCookie';

const protectedLoader = ({ request }: LoaderFunctionArgs) => {
  if (getCookie('Authorization') === undefined) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);

    return redirect(`/login?${params.toString()}`);
  }

  return null;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'accounts',
        element: <Accounts />,
        loader: protectedLoader,
      },
      {
        path: 'banks',
        element: <Banks />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
    ],
  },
]);

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
