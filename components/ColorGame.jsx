import React, { useState, useEffect } from "react";
import ColorButton from "./ColorButton";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newTarget = getRandomColor();
    const newOptions = [newTarget, ...Array(5).fill().map(getRandomColor)].sort(
      () => Math.random() - 0.5
    );

    setTargetColor(newTarget);
    setOptions(newOptions);
    // setMessage("Guess the correct color!");
    setHasGuessed(false);
  };

  const restart = () => {
    const newTarget = getRandomColor();
    const newOptions = [newTarget, ...Array(5).fill().map(getRandomColor)].sort(
      () => Math.random() - 0.5
    );

    setTargetColor(newTarget);
    setOptions(newOptions);
    setHasGuessed(false);
    setMessage("Guess the correct color!");
    setScore(0)
  }

  const handleGuess = (selectedColor) => {
    if (hasGuessed) return;

    const successMessage = [
      "Ghe Ghe, You are Correct! 💃🎉",
      "yayyy, Good One 🔥",
      "Well Done, That is the right choice 💝",
      "Wow, You've got an eye for colors 🥳",
      "Guess what, That's the right answer 👍"
    ];

    const failedMessage = [
      "Ehya, Wrong! Try again. 🤦", 
      "Ouch, So close 😒",
      "You had a Chance, Give it another go 💔",  
    ]

    if (selectedColor === targetColor) {
      const randomMessage = successMessage[Math.floor(Math.random() * successMessage.length)]
      setMessage(randomMessage);
      setScore(score + 1);
      setHasGuessed(true);
      startNewGame()
    } else {
      const randomMessage = failedMessage[Math.floor(Math.random() * failedMessage.length)]
      setMessage(randomMessage);
    }

    // setHasGuessed(true);
  };

  return (
    <div className="color-game">
      <h2 data-testid="gameInstructions">{message}</h2>
      <div
        data-testid="colorBox"
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: targetColor,
          margin: "20px auto",
          border: "2px solid black",
          borderRadius : "5px",
        }}
      ></div>
      <div>
        {options.map((color, index) => (
          <ColorButton key={index} color={color} handleClick={handleGuess} />
        ))}
      </div>
      <h3 data-testid="score">Score: {score}</h3>
      <button
        data-testid="newGameButton"
        onClick={restart}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          border: `3px solid ${targetColor}`,
        }}
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGame;