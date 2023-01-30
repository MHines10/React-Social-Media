import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    const navigate = useNavigate();
    const handleRegister = event => {
        event.preventDefault();
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass){
            props.flashMessage('Passwords do not match', 'danger');
        } else {
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            let formData = JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password
            })
            fetch("https://responsible-knowledgeable-restaurant.glitch.me/auth/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        props.flashMessage(data.error, "danger")
                    } else {
                        console.log(data)
                        props.flashMessage(`${data.username} has been created`, 'success')
                        navigate('/')
                    }
                })
        }
    }


        return (
                <>
                    <main className="form-signin w-100 m-auto mt-5">
                    <form action="" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 fw-normal text-light text-center"> Sign Up</h1>
                        <div className="form-group">
                            <div className="form-floating text-light">
                            <input type="text" className="form-control my-3" placeholder='Enter Email' name='email' />
                            <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating text-light">
                            <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                            <label for="floatingInput">Username</label>
                            </div>
                            <div className="form-floating text-light">
                            <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                            <label for="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating text-light">
                            <input type="password" className="form-control my-3" placeholder='Confirm Password' name='confirmPass' />
                            <label for="floatingPassword"> Confirm Password</label>
                            </div>


                            <input type="submit" value="SIGN UP" className="btn btn-danger w-100" />
                        </div>
                        <p className="mt-5 mb-3 text-center text-secondary">&copy; 2022–2023</p>
                    </form>
                    </main>
                </>
        )
    }