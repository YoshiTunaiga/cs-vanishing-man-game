import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { terms } from "@/data/keyTerms";
import { VanishingManSVG } from "./utils/VanishingManSVG";
import "./App.css";

function App() {
  const termLength = Object.keys(terms).length;
  const [currentTerm, setCurrentTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameState, setGameState] = useState("playing"); // 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);
  const [wrongGuessAnimation, setWrongGuessAnimation] = useState(false);
  const [correctGuessAnimation, setCorrectGuessAnimation] = useState(false);

  const initializeGame = () => {
    const termsList = Object.keys(terms) as Array<keyof typeof terms>;
    const randomTerm = termsList[Math.floor(Math.random() * termsList.length)];
    setCurrentTerm(randomTerm);
    setDefinition(terms[randomTerm]);
    setGuessedLetters(new Set());
    setRemainingGuesses(6);
    setGameState("playing");
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleGuess = (letter: string) => {
    if (gameState !== "playing") return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter.toLowerCase());
    setGuessedLetters(newGuessedLetters);

    if (!currentTerm.toLowerCase().includes(letter.toLowerCase())) {
      setRemainingGuesses(remainingGuesses - 1);
      setWrongGuessAnimation(true);
      setTimeout(() => setWrongGuessAnimation(false), 500);
    } else {
      setCorrectGuessAnimation(true);
      setTimeout(() => setCorrectGuessAnimation(false), 500);
    }

    // Check win condition
    const isWon = [...currentTerm.toLowerCase()].every(
      (char) => char === " " || newGuessedLetters.has(char)
    );

    if (isWon) {
      setGameState("won");
      setScore(score + 1);
    } else if (remainingGuesses <= 1) {
      setGameState("lost");
    }
  };

  const displayWord = () => {
    return currentTerm
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return guessedLetters.has(char.toLowerCase()) ? char : "_";
      })
      .join(" ");
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const getStateMessage = () => {
    switch (gameState) {
      case "won":
        return "🎉 Congratulations! You won!";
      case "lost":
        return `😔 Game Over! The term was: ${currentTerm}`;
      default:
        return `Remaining guesses: ${remainingGuesses}`;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle
          className={`text-center ${
            gameState === "won" ? "animate-bounce" : ""
          }`}>
          Computer Science Vanishing Man
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div
            className={`transition-all duration-300 ${
              wrongGuessAnimation ? "scale-105 text-red-500" : ""
            } ${correctGuessAnimation ? "scale-105 text-green-500" : ""}`}>
            <VanishingManSVG remainingGuesses={remainingGuesses} />
          </div>

          <div className="text-center">
            <p
              className={`text-2xl font-mono mb-4 transition-all duration-300 ${
                correctGuessAnimation ? "scale-105 text-green-500" : ""
              }`}>
              {displayWord()}
            </p>
            <p className="text-sm italic mb-4 hover:text-blue-500 transition-colors duration-300">
              Hint: {definition}
            </p>
            <p
              className={`text-lg font-semibold ${
                gameState === "won" ? "text-green-500" : ""
              } ${gameState === "lost" ? "text-red-500" : ""}`}>
              {getStateMessage()}
            </p>
            <p className="text-sm">
              Score: {score} from {termLength} terms
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {alphabet.map((letter) => (
              <Button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={
                  guessedLetters.has(letter.toLowerCase()) ||
                  gameState !== "playing"
                }
                className={`w-full transition-all duration-300 transform hover:scale-105 
                  ${
                    guessedLetters.has(letter.toLowerCase())
                      ? currentTerm.toLowerCase().includes(letter.toLowerCase())
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : ""
                  }`}>
                {letter}
              </Button>
            ))}
          </div>

          {gameState !== "playing" && (
            <div className="text-center">
              <Button
                onClick={initializeGame}
                className="mt-4 animate-bounce hover:scale-105 transition-transform duration-300">
                Play Again
              </Button>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            <AlertCircle className="inline-block mr-1 h-4 w-4" />
            Guess the computer science term based on the hint definition!
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
