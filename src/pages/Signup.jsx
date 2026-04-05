import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/auth.css";

export default function Signup() {
  return (
    <div className="page-container auth-page">
      <div className="auth-topbar">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>

        <Logo />
      </div>

      <div className="auth-content">
        <h1>Create Account</h1>
        <p>Join RentBuddy to find transparent rental information</p>

        <form className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a strong password" />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter your password" />
          </div>

          <div className="input-group">
            <label>I am a...</label>
            <select>
              <option value="">Select an option</option>
              <option value="student">Student</option>
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="other">Other</option>
            </select>
          </div>

          <label className="terms-row">
            <input type="checkbox" />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </label>

          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}