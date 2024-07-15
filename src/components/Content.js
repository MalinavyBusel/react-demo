import {useState, useEffect} from "react";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function Content() {
    const [accounts, setAccounts] = useState([]);
    const token = getCookie('token');
    useEffect(() => {
        fetch('http://localhost:3000/client/accounts', {
            method: 'GET',
            headers: { 'Authorization': token}
        })
            .then(response => response.json())
            .then(data => {
                setAccounts(data.accounts);
            })
    }, [])
    return (
        <>
            <b>There is something about your profile</b>
            <ul>
                {accounts.map((account) => <li key={account.id}>{JSON.stringify(account)}</li>)}
            </ul>
        </>
    )
}