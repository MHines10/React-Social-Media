import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {

    // function handleForm(e){
    //     e.preventDefault();
    //     // Get the data from the form inputs
    //     let name = e.target.username.value;
    //     let city = e.target.hometown.value;
    //     // Pass form data into updateUser function from parent component (App)
    //     props.updateUser(name, city);
    //     // Reset input values to empty strings
    //     e.target.username.value = '';
    //     e.target.hometown.value = '';
    // }

    return (
        <header className="p-3 text-bg-dark nav-bar">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                <Link to='/' className="nav-link px-5 text-danger">Home</Link>
                {props.loggedIn ? (
                                        <>
                                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                            <li><Link to='/create' className="nav-link px-2 text-light">Create Post</Link></li>
                                            <li><Link to='/updateuser' className="nav-link px-2 text-light">Update Account</Link></li>
                                            </ul>
                                            <div className="text-end">
                                            <Link to='/login' onClick={props.logUserOut} type="button" className="btn btn-danger me-2">Log Out</Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* keeps buttons at the end */}
                                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                            <li></li>
                                            </ul>


                                            <div className="text-end">
                                            <Link to='/login' type="button" className="btn btn-danger me-2">Login</Link>
                                            <Link to='/register' type="button" className="btn btn-danger">Sign Up</Link>
                                            </div>
                                        </>
                                    )}

            </div>
            </div>
        </header>
    )
}