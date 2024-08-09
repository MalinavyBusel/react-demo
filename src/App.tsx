import { Outlet } from 'react-router-dom';
// import Header from './components/Header/Header';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="child-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
