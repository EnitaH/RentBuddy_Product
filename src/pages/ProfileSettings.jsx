import { useState } from "react"; 
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  Camera,
  Lock,
  Shield,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/profile-settings.css";
import { updateUser } from "../utils/propertyStore";
import { updateUserPassword } from "../utils/propertyStore";

export default function ProfileSettings() {
  const navigate = useNavigate();

  const savedUserRaw = localStorage.getItem("user");
  const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;

  const [activeSection, setActiveSection] = useState("account");

 const [formData, setFormData] = useState({
  fullName: savedUser?.full_name || savedUser?.fullName || "Sarah Johnson",
  email: savedUser?.email || "sarah.j@university.ac.uk",
  phone: savedUser?.phone || "",
  location: savedUser?.location || "",
  bio: savedUser?.bio || "",
  memberSince: savedUser?.member_since || savedUser?.memberSince || "Jan 2026",
  profileImage: savedUser?.profileImage || "",
});

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [privacyData, setPrivacyData] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    reviewAlerts: true,
    savedPropertyUpdates: true,
    marketingEmails: false,
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePrivacyToggle(e) {
    const { name, checked } = e.target;
    setPrivacyData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleNotificationToggle(e) {
    const { name, checked } = e.target;
    setNotificationData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }
  async function handleSaveAccount() {
  try {
    if (!savedUser?.id) {
      setMessage("User not found.");
      return;
    }

    const result = await updateUser(savedUser.id, {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
    });

    const updatedUser = {
      ...(savedUser || {}),
      ...result.user,
      phone: formData.phone,
      bio: formData.bio,
      profileImage: formData.profileImage,
      privacySettings: privacyData,
      notificationSettings: notificationData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Account information updated successfully.");
  } catch (error) {
    console.error("Update profile error:", error);
    setMessage(error.message || "Failed to update account information.");
  }
}
  async function handleSavePassword() {
  if (
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.confirmNewPassword
  ) {
    setMessage("Please fill in all password fields.");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    setMessage("New passwords do not match.");
    return;
  }

  try {
    if (!savedUser?.id) {
      setMessage("User not found.");
      return;
    }

    await updateUserPassword(savedUser.id, {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    setMessage("Password updated successfully.");
  } catch (error) {
    console.error(error);
    setMessage(error.message || "Failed to update password.");
  }
}

  function handleSavePrivacy() {
    const updatedUser = {
      ...(savedUser || {}),
      ...formData,
      privacySettings: privacyData,
      notificationSettings: notificationData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Privacy settings updated successfully.");
  }

  function handleSaveNotifications() {
    const updatedUser = {
      ...(savedUser || {}),
      ...formData,
      privacySettings: privacyData,
      notificationSettings: notificationData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Notification preferences updated successfully.");
  }

  function renderAccountSection() {
    return (
      <>
        <div className="card-header">
          <h2>Account Information</h2>
          <button type="button" className="edit-text-btn">
            Edit
          </button>
        </div>

        <div className="settings-field">
          <label>
            <User size={14} />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <Mail size={14} />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <Phone size={14} />
            <span>Phone Number</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <MapPin size={14} />
            <span>Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <FileText size={14} />
            <span>Bio</span>
          </label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <Calendar size={14} />
            <span>Member Since</span>
          </label>
          <input
            type="text"
            name="memberSince"
            value={formData.memberSince}
            onChange={handleChange}
          />
        </div>

        <button className="save-profile-btn" onClick={handleSaveAccount}>
          Save Account Info
        </button>
      </>
    );
  }

  function renderPasswordSection() {
    return (
      <>
        <div className="card-header">
          <h2>Change Password</h2>
        </div>

        <div className="settings-field">
          <label>
            <Lock size={14} />
            <span>Current Password</span>
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <Lock size={14} />
            <span>New Password</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <Lock size={14} />
            <span>Confirm New Password</span>
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <button className="save-profile-btn" onClick={handleSavePassword}>
          Update Password
        </button>
      </>
    );
  }

  function renderPrivacySection() {
    return (
      <>
        <div className="card-header">
          <h2>Privacy Settings</h2>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Profile Visible</strong>
            <p>Allow other users to view your profile.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="profileVisible"
              checked={privacyData.profileVisible}
              onChange={handlePrivacyToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Show Email</strong>
            <p>Let approved contacts see your email address.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="showEmail"
              checked={privacyData.showEmail}
              onChange={handlePrivacyToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Show Phone Number</strong>
            <p>Let approved contacts see your phone number.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="showPhone"
              checked={privacyData.showPhone}
              onChange={handlePrivacyToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Allow Messages</strong>
            <p>Receive messages from landlords and tenants.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="allowMessages"
              checked={privacyData.allowMessages}
              onChange={handlePrivacyToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button className="save-profile-btn" onClick={handleSavePrivacy}>
          Save Privacy Settings
        </button>
      </>
    );
  }

  function renderNotificationSection() {
    return (
      <>
        <div className="card-header">
          <h2>Notification Preferences</h2>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Email Notifications</strong>
            <p>Receive important account updates by email.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notificationData.emailNotifications}
              onChange={handleNotificationToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Review Alerts</strong>
            <p>Get notified about new reviews and replies.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="reviewAlerts"
              checked={notificationData.reviewAlerts}
              onChange={handleNotificationToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Saved Property Updates</strong>
            <p>Get updates on saved listings and changes.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="savedPropertyUpdates"
              checked={notificationData.savedPropertyUpdates}
              onChange={handleNotificationToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-setting-row">
          <div>
            <strong>Marketing Emails</strong>
            <p>Receive promotions and product updates.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={notificationData.marketingEmails}
              onChange={handleNotificationToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button className="save-profile-btn" onClick={handleSaveNotifications}>
          Save Notification Settings
        </button>
      </>
    );
  }

  return (
    <div className="page-container profile-settings-page">
      <header className="profile-settings-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <Logo />
      </header>

      <section className="profile-settings-title">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </section>

      <section className="profile-photo-card">
        <div className="profile-photo-wrap">
          <div className="profile-photo-circle">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile" />
            ) : null}
          </div>

          <button type="button" className="camera-btn">
            <Camera size={14} />
          </button>
        </div>

        <p>Click the camera icon to change your profile picture</p>
      </section>

      <section className="profile-settings-card">
        <div className="settings-nav-grid">
          <button
            type="button"
            className={`settings-nav-btn ${
              activeSection === "account" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("account");
              setMessage("");
            }}
          >
            <User size={14} />
            <span>Account Information</span>
          </button>

          <button
            type="button"
            className={`settings-nav-btn ${
              activeSection === "password" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("password");
              setMessage("");
            }}
          >
            <Lock size={14} />
            <span>Change Password</span>
          </button>

          <button
            type="button"
            className={`settings-nav-btn ${
              activeSection === "privacy" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("privacy");
              setMessage("");
            }}
          >
            <Shield size={14} />
            <span>Privacy Settings</span>
          </button>

          <button
            type="button"
            className={`settings-nav-btn ${
              activeSection === "notifications" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("notifications");
              setMessage("");
            }}
          >
            <Bell size={14} />
            <span>Notification Preferences</span>
          </button>
        </div>
      </section>

      <section className="profile-settings-card">
        {activeSection === "account" && renderAccountSection()}
        {activeSection === "password" && renderPasswordSection()}
        {activeSection === "privacy" && renderPrivacySection()}
        {activeSection === "notifications" && renderNotificationSection()}

        {message && <p className="settings-success-message">{message}</p>}
      </section>

      <section className="danger-zone-card">
        <h2>Danger Zone</h2>
        <button type="button" className="delete-account-btn">
          Delete Account
        </button>
      </section>
    </div>
  );
}