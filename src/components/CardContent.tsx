import person from "../assets/person.svg";
import confirm from "../assets/confirm.svg";

interface Props {
  currentPerson: {
    name: string;
    birth_year: string;
    eye_color: string;
  };
  imgUrl: string;
}

const CardContent = (props: Props) => {
  const { name, eye_color, birth_year } = props.currentPerson;
  const { imgUrl } = props;
  return (
    <>
      <div className="img-container">
        <img src={imgUrl} alt="person" className="card-img" />
      </div>
      <div className="card-name-container">
        <h2 className="card-name">{name}</h2>
        <div className="card-icons">
          <img src={person} alt="person icon" />
          <img src={confirm} alt="person icon" />
        </div>
      </div>
      <div className="card-details">
        <p>age: {birth_year.slice(0, -3)}</p>
        <p>eye color: {eye_color}</p>
      </div>
    </>
  );
};

export default CardContent;
