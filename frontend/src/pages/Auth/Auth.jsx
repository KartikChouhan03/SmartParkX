import React, { useState } from "react";
import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const SocialButton = ({ icon: Icon }) => (
  <button className="social-button">
    <Icon size={20} />
  </button>
);

// --- SIGN IN FORM ---
const SignInForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent form reload
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <div className="social-buttons">
        <SocialButton icon={Mail} />
        <SocialButton icon={Facebook} />
        <SocialButton icon={Github} />
        <SocialButton icon={Linkedin} />
      </div>
      <p>Or login with email</p>
      <form className="form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <a href="" className="forgot-link">
          Forgot Your Password?
        </a>
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
    </div>
  );
};

// --- SIGN UP FORM ---
const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <div className="social-buttons">
        <SocialButton icon={Mail} />
        <SocialButton icon={Facebook} />
        <SocialButton icon={Github} />
        <SocialButton icon={Linkedin} />
      </div>
      <p>or use your email for registration</p>
      <form className="form" onSubmit={handleSignup}>
        <input type="text" placeholder="Name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <button type="submit" className="signup-button">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

// --- MAIN AUTH PAGE ---
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`container ${isLogin ? "" : "slide-right"}`}>
      <div className="card">
        <div className="form-panel">
          {isLogin ? <SignInForm /> : <SignUpForm />}
        </div>
        <div className="overlay-panel">
          <div className="overlay-content">
            {isLogin ? (
              <>
                <h2>Welcome Back!</h2>
                <p>
                  Sign in to access your account and continue where you left off
                </p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="button button-overlay"
                >
                  SIGN UP
                </button>
              </>
            ) : (
              <>
                <h2>Hello, Friend!</h2>
                <p>Enter your personal details and start your journey with us</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="button button-overlay"
                >
                  LOGIN
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
