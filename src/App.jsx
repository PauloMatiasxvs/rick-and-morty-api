import React, { useState, useEffect } from 'react';

function App() {
  const [character, setCharacter] = useState(null);
  const [currentCharacterId, setCurrentCharacterId] = useState(1);
  const [inputId, setInputId] = useState('');

  useEffect(() => {
    fetchCharacter(currentCharacterId);
  }, [currentCharacterId]);

  function fetchCharacter(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
      })
      .catch(error => console.error('Erro ao buscar personagem:', error));
  }

  function handlePreviousButtonClick() {
    if (currentCharacterId > 1) {
      setCurrentCharacterId(prevId => prevId - 1);
    }
  }

  function handleNextButtonClick() {
    setCurrentCharacterId(prevId => prevId + 1);
  }

  function handleSearchButtonClick() {
    const id = parseInt(inputId);
    if (!isNaN(id) && id > 0) {
      setCurrentCharacterId(id);
    }
  }

  return (
    <div className="app-container">
      <div className="character-image">
        {character && <img src={character.image} alt="Imagem do Personagem" id="character-image" />}
      </div>
      <div className="character-info">
        {character && (
          <>
            <h2 id="character-name">{character.name}</h2>
            <p id="character-status">Status: {character.status}</p>
            <p id="character-species">Espécie: {character.species}</p>
            <p id="character-gender">Gênero: {character.gender}</p>
            <p id="character-origin">Origem: {character.origin.name}</p>
            <p id="character-location">Localização: {character.location.name}</p>
            <p id="character-created">Criado em: {new Date(character.created).toLocaleDateString('pt-BR')}</p>
            <p id="character-id">ID: {character.id}</p>
          </>
        )}
      </div>
      <div className="episodes-and-controls">
        <div className="episode-list">
          <h2>Episódios</h2>
          <ul>
            {character && character.episode.map((episode, index) => (
              <li key={index}>{episode}</li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <button id="previous-button" onClick={handlePreviousButtonClick}>Anterior</button>
          <button id="next-button" onClick={handleNextButtonClick}>Próximo</button>
        </div>
        <div className="search-container">
          <input 
            id="character-id-input"
            type="number"  
            placeholder="Buscar personagem pelo ID" 
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <button id="search-button" onClick={handleSearchButtonClick}>Buscar</button>
        </div>
      </div>
    </div>
  );
}

export default App;

