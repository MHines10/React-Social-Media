import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div className="card text-center my-5 postcard">
            <div className="card-header tabbar">
                <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item ">
                    <a className="nav-link active text-light bg-primary" href="/">Title</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to={`blog/posts/${post.id}`}>See More</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/">Update</a>
                </li>
                </ul>
            </div>
            <div className="card-body">
                <h2 className="card-title text-light mb-5">{ post.title }</h2>
            </div>
        </div>
    )
}