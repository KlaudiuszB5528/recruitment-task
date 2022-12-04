import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export interface IPerson {
  name: string;
  birth_year: string;
  eye_color: string;
  created: string;
  vehicles: string[];
}

interface IContext {
  people: IPerson[];
  isLoading: boolean;
  imgUrl: string;
  getData: () => void;
}

export const PeopleContext = React.createContext<IContext>({
  people: [],
  isLoading: false,
  imgUrl: "",
  getData: () => {},
});

export const PeopleContextProvider: React.FC<Props> = (props) => {
  const [people, setPeople] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [queryNr, setQueryNr] = useState<number>(1);

  const addPerson = (person: IPerson) => {
    if (person.name !== people.at(-1)?.name) {
      setPeople((prevState) => [...prevState, person]);
      setQueryNr((prevNr) => prevNr + 1);
    } else {
      setQueryNr((prevNr) => prevNr - 1);
      alert("Brak nowych osób do pobrania");
    }
  };

  const getImg = async () => {
    try {
      const response2 = await fetch("https://picsum.photos/534/383");
      const { url } = response2;
      setImgUrl(url);
    } catch {
      setImgUrl("");
      alert("Nie udało sie załadować obrazu");
    }
  };

  const getPerson = async () => {
    try {
      // const response = await fetch(
      //   `https://swapi.dev/api/people/${queryNr}`
      // );
      const response = await fetch(
        `https://swapi.py4e.com/api/people/${queryNr}`
      );
      const { name, birth_year, eye_color, created, vehicles } =
        await response.json();
      if (response.status === 200)
        addPerson({ name, birth_year, eye_color, created, vehicles });
    } catch {
      alert("Nie udało się wczytać danych osoby");
    }
  };

  const getData = async () => {
    setIsLoading(true);
    await getImg();
    await getPerson();
    setIsLoading(false);
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
  };

  return (
    <PeopleContext.Provider value={providerValue}>
      {props.children}
    </PeopleContext.Provider>
  );
};
