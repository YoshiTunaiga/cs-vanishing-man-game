import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

// Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WelcomeSection } from "./components/WelcomeSection";
import FlipCard from "./components/FlipCard";
import { VanishingManSVG } from "./utils/VanishingManSVG";

// Data
import { terms } from "@/data/keyTerms";

// Styles
import "./App.css";

function App() {
  const termLength = Object.keys(terms).length;
  const [termsList, setTermsList] = useState<(keyof typeof terms)[]>([]);
  const [newGame, setNewGame] = useState(true);
  const [currentTerm, setCurrentTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameState, setGameState] = useState("playing"); // 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);
  const [wrongGuessAnimation, setWrongGuessAnimation] = useState(false);
  const [correctGuessAnimation, setCorrectGuessAnimation] = useState(false);
  const [guessedWords, setGuessedWords] = useState<
    { term: string; definition: string }[]
  >([]);
  const [showNewWordAnimation, setShowNewWordAnimation] = useState(false);

  const initializeGame = () => {
    const randomTerm = termsList.pop() || "";
    setCurrentTerm(randomTerm);
    setDefinition(terms[randomTerm as keyof typeof terms]);
    setGuessedLetters(new Set());
    setRemainingGuesses(6);
    setGameState("playing");
  };

  useEffect(() => {
    if (termsList.length === 0) {
      const termsList = Object.keys(terms) as (keyof typeof terms)[];
      setTermsList(termsList);
    }
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termsList]);

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
      setGuessedWords((prev) => [
        ...prev,
        { term: currentTerm, definition: definition },
      ]);
      setShowNewWordAnimation(true);
    } else if (remainingGuesses < 1) {
      setGameState("lost");
    }
  };

  const displayWord = () => {
    const words = currentTerm.split(" ");
    // Displays the term with multiple words vertically to avoid confusion for the user.
    return (
      <div className="flex flex-col items-center space-y-2">
        {words.map((word, index) => (
          <p key={index} className="font-mono">
            {word
              .split("")
              .map((char) =>
                guessedLetters.has(char.toLowerCase()) ? char : "_"
              )
              .join(" ")}
          </p>
        ))}
      </div>
    );
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
        {!newGame ? (
          <div className="space-y-6">
            <div
              className={`transition-all duration-300 ${
                wrongGuessAnimation ? "scale-105 text-red-500" : ""
              } ${correctGuessAnimation ? "scale-105 text-green-500" : ""}`}>
              <VanishingManSVG remainingGuesses={remainingGuesses} />
            </div>

            <div className="text-center">
              <div
                className={`text-2xl mb-4 transition-all duration-300 ${
                  correctGuessAnimation ? "scale-105 text-green-500" : ""
                }`}>
                {displayWord()}
              </div>
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

            {guessedWords.length > 0 && (
              <div className="mt-8">
                <h3 className="text-center font-semibold mb-4">
                  Guessed Words
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {guessedWords.map((word, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        showNewWordAnimation &&
                        index === guessedWords.length - 1
                          ? "animate-slide-up-fade"
                          : ""
                      }`}>
                      <FlipCard term={word.term} definition={word.definition} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center text-sm text-gray-500">
              <AlertCircle className="inline-block mr-1 h-4 w-4" />
              Guess the computer science term based on the hint definitions!
            </div>
          </div>
        ) : (
          <WelcomeSection
            initializeNewGame={() => {
              initializeGame();
              setNewGame(!newGame);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default App;
