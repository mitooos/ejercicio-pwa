import React, { useState, useEffect } from "react";

const Joke = () => {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    if (!navigator.onLine) {
      let localStorageItems = localStorage.getItem("characters");
      if (localStorageItems) {
        setCharacters(JSON.parse(localStorageItems));
      }
    } else {
      const ts = "abretesesamo";
      const pk = "6f535813e52ac035195ae100c2250de6";
      const hash = "255e6683b73436b44254118a94fd2016";
      let characterData = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${pk}&hash=${hash}`
      );
      let jsonData = await characterData.json();
      localStorage.setItem("characters", JSON.stringify(jsonData.data.results));
      setCharacters(jsonData.data.results);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const renderCharacters = () => {
    if (characters.length >= 1) {
      return (
        <ul>
          {characters.map((character) => (
            <li>{character.name}</li>
          ))}
        </ul>
      );
    } else {
      return <h2>Loading ....</h2>;
    }
  };

  return (
    <div>
      <h1>Characters</h1>
      {renderCharacters()}
    </div>
  );
};

export default Joke;
