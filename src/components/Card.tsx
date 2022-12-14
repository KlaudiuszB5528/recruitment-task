import Loader from "./Loader";
import CardContent from "./CardContent";
import { useContext } from "react";
import { PeopleContext } from "../context/people";

const Card = () => {
  const { people, isLoading, imgUrl } = useContext(PeopleContext);
  const currentPerson = people.at(-1) || {
    name: "",
    birth_year: "",
    eye_color: "",
  };
  return (
    <div className="card">
      {isLoading ? (
        <Loader />
      ) : (
        <CardContent imgUrl={imgUrl} currentPerson={currentPerson} />
      )}
    </div>
  );
};

export default Card;
