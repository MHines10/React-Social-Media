import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateUser({userId}, props) {

    // const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (!props.loggedIn){
            props.flashMessage('You must be logged in to view this page', 'danger');
            navigate('/login');
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

        fetch(`https://responsible-knowledgeable-restaurant.glitch.me/auth/users/${userId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        })
        .then(response => {
            if (response.status === 403) {
                alert('You do not have access to update this user');
            }
            return response.json();
        })
        .then(data => {
            alert('User updated successfully!');
            console.log(data);
        })
        .catch(error => {
            console.log(error);
            alert('An error occurred while updating the user');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <label>
                ID:
                <input type="text" name="id" onChange={e => setId(e.target.value)} />
            </label>
            <br /> */}
            <label>
                First Name:
                <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Update User</button>
        </form>
    );
}