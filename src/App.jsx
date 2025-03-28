import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, query, orderBy } from "./firebaseconfig";
import "./App.css";

function App() {
  const [dice1, setDice1] = useState(null);
  const [dice2, setDice2] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("¡Lanza los dados!");
  const [players, setPlayers] = useState([]);

  // Función para obtener los nombres de los jugadores y sus puntajes desde Firestore
  const getPlayers = async () => {
    const playersCollection = collection(db, "players");
    const q = query(playersCollection, orderBy("score", "desc")); // Ordenar por puntaje
    const querySnapshot = await getDocs(q);
    const playerList = querySnapshot.docs.map(doc => doc.data());
    setPlayers(playerList);
  };

  // Función para agregar un puntaje nuevo de un jugador a la base de datos
  const savePlayerScore = async (playerName, score) => {
    try {
      await addDoc(collection(db, "players"), {
        name: playerName,
        score: score
      });
      getPlayers(); // Actualizar lista de jugadores
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Efecto para cargar jugadores cuando se monta el componente
  useEffect(() => {
    getPlayers();
  }, []);

  // Función para manejar el lanzamiento de los dados
  const rollDice = () => {
    setMessage("Lanzando...");

    // Animación de rotación
    setTimeout(() => {
      const dice1Value = Math.floor(Math.random() * 6) + 1;
      const dice2Value = Math.floor(Math.random() * 6) + 1;

      setDice1(dice1Value);
      setDice2(dice2Value);

      const total = dice1Value + dice2Value;
      setMessage(`Sacaste un ${total}`);
      setScore((prevScore) => prevScore + total);
    }, 500); // Tiempo de animación de 0.5 segundos
  };

  // Función para manejar el guardado del puntaje
  const handleSaveScore = () => {
    const playerName = prompt("Ingresa tu nombre");
    if (playerName) {
      savePlayerScore(playerName, score);
    }
  };

  // Función para obtener el símbolo de la cara del dado
  const getDiceFace = (number) => {
    const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return faces[number - 1];
  };

  return (
    <div className="game-container">
      <h1>Juego de Dados</h1>
      <div className="dice-container">
        <div className="dice" id="dice1">
          {dice1 ? getDiceFace(dice1) : "🎲"}
        </div>
        <div className="dice" id="dice2">
          {dice2 ? getDiceFace(dice2) : "🎲"}
        </div>
      </div>
      <p id="result">{message}</p>
      <button id="rollDice" onClick={rollDice}>Lanzar Dados</button>
      <p>Puntaje: <span id="score">{score}</span></p>
      <button id="saveScore" onClick={handleSaveScore}>Guardar Puntaje</button>

      <div>
        <h2>Ranking de Jugadores</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.name}: {player.score} puntos
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
