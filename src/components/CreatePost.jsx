import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.loggedIn) {
        props.flashMessage('You must be logged in to view this page', 'danger');
        navigate('/login');
        }
    }, );

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the data from the form
        let title = event.target.title.value;
        let content = event.target.content.value;

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        // Set up the request content
        let requestContent = JSON.stringify({ title, content });

        // Make the fetch request
        let response = await fetch('https://responsible-knowledgeable-restaurant.glitch.me/blog/posts', {
        method: 'POST',
        headers: myHeaders,
        body: requestContent,
        });

        if (response.ok) {
        let data = await response.json();
        props.flashMessage(`${data.title} has been created`, 'primary');
        navigate('/');
        } else {
        props.flashMessage('There was an issue, please try again', 'warning');
        }
    };

    return (
        <>
            <main className="form-create w-100 m-auto mt-5">
            <h1 className="h3 mb-3 fw-normal text-light text-center">Create a New Post</h1>
            <form action='' onSubmit={handleSubmit}>
                <div className='form-group'>
                <div className="form-floating text-light">
                    <input
                        type='text'
                        className='form-control my-3'
                        placeholder='Enter Title of Post'
                        name='title'
                    />
                    <label for="floatingInput">Title</label>
                </div>
                <div className="form-floating text-light">
                    <input
                        type='text'
                        className='form-control my-3'
                        placeholder='Enter Title of Post'
                        name='content'
                    />
                    <label for="floatingInput">Content</label>
                </div>
                <input type='submit' value='Create Post' className='btn btn-danger w-100 mb-5' />
                </div>
            </form>
            </main>
        </>
    );
}
