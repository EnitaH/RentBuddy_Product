import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">
        <img src={logo} alt = "RenBuddy logo" />
      </div>
      <span className="logo-text">RentBuddy</span>
    </div>
  );
}