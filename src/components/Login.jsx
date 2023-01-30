import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        // Get the data from the form
        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`);
        myHeaders.append('Content-Type', 'application/json');

        let response = await fetch("https://responsible-knowledgeable-restaurant.glitch.me/auth/token", {
            method: 'POST',    
            headers: myHeaders
        })

        if (response.ok){
            let data = await response.json();
            // Get the token and token expiration from the response
            let token = data.token;
            let expiration = data.token_expiration;

            // Store the value in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);

            // flash a success message and redirect back home
            props.flashMessage('You have successfully logged in', 'success');
            props.logUserIn();
            navigate('/');
        } else {
            // flash a fail message
            props.flashMessage('Your username and/or password are incorrect', 'danger');
        }

    }

    return (
        <>
            <main className="form-signin w-100 m-auto mt-5">
                <form action="" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal text-light text-center">Log In</h1>
                    <div className="form-group">
                        <div className="form-floating text-light">
                        <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                        <label for="floatingInput">Username</label>
                        </div>
                        <div className="form-floating text-light">
                        <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                        <label for="floatingPassword">Password</label>
                        </div>

                        <div className="checkbox mb-3 text-center text-light">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>

                        <input type="submit" value="LOGIN" className="btn btn-danger w-100" />
                        <p className="mt-5 mb-3 text-center text-secondary">&copy; 2022–2023</p>
                
                    </div>
                </form>
            </main>
        </>
    )
}