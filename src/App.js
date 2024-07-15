import LoginForm from "./components/LoginForm";
import { useState } from 'react';

export default function App() {
    let [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <>
            {isLoggedIn ? (
                <Header />
            ) : (
                <LoginForm setLoggedIn={setLoggedIn}/>
            )}

        </>
    )
}

function Header({ isLoggedIn }) {
    return (
        <div>
        </div>
    )
}

function Content() {
    return (
        <>

        </>
    )
}
