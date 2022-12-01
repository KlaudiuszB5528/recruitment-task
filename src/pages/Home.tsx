import Header from "../components/Header";
import Card from "../components/Card";
import { useContext } from "react";
import { PeopleContext } from "../context/people";

const Home = () => {
  const { getData } = useContext(PeopleContext);
  return (
    <div className="homepage">
      <Header />
      <Card />
      <div className="next-profile-btn-container">
        <button className="next-profile-btn" onClick={getData}>
          next profiles
        </button>
      </div>
    </div>
  );
};
export default Home;
