"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        document.title = 'Teacher Login';
    }, []);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/forgot-password/', {
                email: email
            });
            if (response.data.success) {
                setSuccessMsg(response.data.message);
            } else {
                setErrorMsg(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMsg('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter Your Registered Email</h5>
                        <div className="card-body">
                            {successMsg && <p className='text-success'>{successMsg}</p>}
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                                <input type="email" value={email} name='email' onChange={handleChange} className="form-control" />
                            </div>
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
