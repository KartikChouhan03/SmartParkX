import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets.js';
import { EyeClosed, Eye } from 'lucide-react'

const LoginPage = () => {
    const [userType, setUserType] = useState('user'); // 'user' or 'admin'
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleUserType = (type) => {
        setUserType(type);
        // You might want to clear form fields or reset state when switching types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Login form submitted!');
        // You'd typically send this data to an authentication service
    };

    return (
        <div className="login-page-wrapper">
            {/* Left side: Background illustration */}
            <div className="login-illustration-column">
                <img src={assets.image1} alt="Login illustration" />
            </div>

            {/* Right side: Form */}
            <div className="login-form-column">
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

                <h2 className="form-title">Welcome back</h2>
                <p className="form-subtitle">
                    Don't have an account? <a href="/signin" className="signup-link">Sign up</a>
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="email@gmail.com" required />
                    </div>
                    
                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
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
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <button type="submit" className="login-btn">Log in</button>

                    <div className="or-separator">
                        <span>Or log in with</span>
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

export default LoginPage;
