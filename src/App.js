import { Content, LoginForm, Header } from "./components";
import { useState } from 'react';

export default function App() {
    let [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <>
            {isLoggedIn ? (
                <>
                    <Header />
                    <Content />
                </>
            ) : (
                <LoginForm setLoggedIn={setLoggedIn}/>
            )}

        </>
    )
}
