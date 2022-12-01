import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  created: string;
  vehicles: string[];
}

interface Context {
  people: Person[];
  isLoading: boolean;
  imgUrl: string;
  getData: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const PeopleContext = React.createContext<Context>({
  people: [],
  isLoading: false,
  imgUrl: "",
  getData: () => {},
  setLoading: () => {},
});

export const PeopleContextProvider: React.FC<Props> = (props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [queryNr, setQueryNr] = useState(1);

  const addPerson = (person: Person) => {
    setPeople((prevState) => [...prevState, person]);
  };

  const getImg = async () => {
    const response2 = await fetch("https://picsum.photos/534/383");
    const { url } = response2;
    setImgUrl(url);
  };

  const getPerson = async () => {
    const response = await fetch(`https://swapi.dev/api/people/${queryNr}`);
    if (response.ok) {
      const { name, birth_year, eye_color, created, vehicles } =
        await response.json();
      addPerson({ name, birth_year, eye_color, created, vehicles });
      setQueryNr((prevNr) => prevNr + 1);
      await getImg();
    }
  };

  const getData = async () => {
    setIsLoading(true);
    await getPerson();
    setIsLoading(false);
  };

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const providerValue = {
    people,
    isLoading,
    imgUrl,
    getData,
    setLoading,
  };

  return (
    <PeopleContext.Provider value={providerValue}>
      {props.children}
    </PeopleContext.Provider>
  );
};
