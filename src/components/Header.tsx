import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <h1>Klaudiusz Biegacz</h1>
      <button className="registration-btn">
        <Link
          to="/recruitment-task/registration"
          className="registration-btn-text"
        >
          formularz rejestracyjny
        </Link>
      </button>
    </nav>
  );
};

export default Header;
