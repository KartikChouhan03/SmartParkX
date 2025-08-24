import React, { useState } from 'react';
import './Signin.css';
import { assets } from '../../assets/assets.js';
import {EyeClosed,Eye} from 'lucide-react'

const SignInPage = () => {
    const [userType, setUserType] = useState('user'); 
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleUserType = (type) => {
        setUserType(type);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className="signin-page-wrapper">
            {/* Left side: Background illustration */}
            <div className="signin-illustration-column">
                <img src={assets.image1} alt="" />
            </div>

            {/* Right side: Form */}
            <div className="signin-form-column">
                <div className="user-type-toggle">
                    <button
                        className={`toggle-button ${userType === 'admin' ? 'active' : ''}`}
                        onClick={() => handleToggleUserType('admin')}
                    >
                        Admin
                    </button>
                    <button
                        className={`toggle-button ${userType === 'user' ? 'active' : ''}`}
                        onClick={() => handleToggleUserType('user')}
                    >
                        User
                    </button>
                </div>

                <h2 className="form-title">Create an account</h2>
                <p className="form-subtitle">
                    Already have an account? <a href="/login" className="login-link">Log in</a>
                </p>

                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="email@gmail.com" required />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Enter Your Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="********"
                            required
                        />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeClosed size={20}/> : <Eye size={20}/>}
                        </span>
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the <a href="#terms" className="terms-link">Terms&conditions</a></label>
                    </div>

                    <button type="submit" className="create-account-btn">Create account</button>

                    <div className="or-separator">
                        <span>Or register with</span>
                    </div>

                    <div className="social-login-buttons">
                        <button type="button" className="social-button google-button">Google</button>
                        <button type="button" className="social-button facebook-button">Facebook</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;