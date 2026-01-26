import React, { useState, useEffect } from "react";
import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser, signupUser } from "../../lib/api";
import { useAuth } from "../../Context/AuthContext";

const SocialButton = ({ icon: Icon }) => (
  <button className="social-button">
    <Icon size={20} />
  </button>
);

// --- SIGN IN FORM ---
const SignInForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.error || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

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
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    vehicleNumber: "",
  });

  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await signupUser(form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.error || "Signup failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleSignup}>
        <input
          placeholder="Name"
          className="input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="Vehicle Number"
          className="input"
          onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })}
        />

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

  useEffect(() => {
    console.log("AuthPage mounted");
  }, []);

  return (
    <div className={`auth-container ${isLogin ? "" : "slide-right"}`}>
      <div className="card">
        <div className="form-panel">
          {isLogin ? (
            <SignInForm />
          ) : (
            <SignUpForm onSignupSuccess={() => setIsLogin(true)} />
          )}
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
                <p>
                  Enter your personal details and start your journey with us
                </p>
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
