import { useForm } from 'react-hook-form'

export default function LoginForm({ setLoggedIn }) {
    const {register, handleSubmit} = useForm();

    function authorize(formBody) {
        const form = document.getElementsByClassName('login-form')[0];
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify(formBody),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                setLoggedIn(true);
                console.log(data);
                localStorage.setItem('token', 'Bearer ' + data['accessToken'])
                console.log(localStorage.getItem('token'))
            });
    }
    return (
        <form className='login-form' onSubmit={handleSubmit(authorize)}>
            <input type='email' {...register('email')}/>
            <input type='password' {...register('password')}/>
            <button type='submit'>Войти</button>
        </form>
    )
}