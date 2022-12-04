import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  return (
    <div className="registration-page">
      <div className="registration">
        <h1>Formularz Rejestracyjny</h1>
        <div className="blue-line"></div>
        <Form />
      </div>
      <div
        className="backhome-btn"
        onClick={() => navigate("/recruitment-task")}
      ></div>
    </div>
  );
};

export default Registration;
