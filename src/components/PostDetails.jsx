import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PostDetails() {
    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://responsible-knowledgeable-restaurant.glitch.me/blog/posts/${postId}`,{
                method: 'GET',
            });
            const data = await response.json();
            setPost(data);
        };
        fetchPost();
    }, [postId]);

    return (
        <>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to='/'>Back to All Posts</Link>
        </>
    );
}
