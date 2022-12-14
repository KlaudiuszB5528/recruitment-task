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
  const [isLastPerson, setIsLastPerson] = useState<boolean>(false);

  const addPerson = (person: IPerson) => {
    setPeople((prevState) => [...prevState, person]);
    setQueryNr((prevNr) => prevNr + 1);
  };
  //I used try catch block to handle errors in case of no internet connection or because of the API server being down
  //I used async await to handle promises and to make the code more readable
  //I used fetch to get data from the API and then I used JSON.parse to convert the response to JSON
  //I used useEffect to make sure that the function is called only once when the component is mounted
  //Probably without try catch I would use response.status to handle errors and make it in a more elegant way in one function with Promise.all
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
      if (response.status === 200 && name !== people.at(-1)?.name)
        addPerson({ name, birth_year, eye_color, created, vehicles });
      else {
        alert("Brak nowych osób do pobrania");
        setIsLastPerson(true);
      }
    } catch {
      alert("Nie udało się wczytać danych osoby");
    }
  };

  const getData = async () => {
    if (!isLastPerson) {
      setIsLoading(true);
      await getPerson();
      await getImg();
      setIsLoading(false);
    }
    if (isLastPerson) alert("To już koniec listy osób");
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
