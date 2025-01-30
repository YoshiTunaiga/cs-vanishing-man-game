import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

// Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FlipCard from "@/components/FlipCard";
import { VanishingManSVG } from "../utils/VanishingManSVG";

import { Button } from "@/components/ui/button";

// Styles
import "../App.css";

interface GameComponentProps {
  subject: string;
  subjectTerms: Record<string, string>;
}

interface GuessedWord {
  term: string;
  definition: string;
}

const GameComponent: React.FC<GameComponentProps> = ({
  subject,
  subjectTerms,
}) => {
  const termsLength = subjectTerms ? Object.keys(subjectTerms).length : 0;
  const [termsList, setTermsList] = useState<string[]>(
    Object.keys(subjectTerms || {})
  );
  const [currentTerm, setCurrentTerm] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [remainingGuesses, setRemainingGuesses] = useState<number>(5);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [score, setScore] = useState<number>(0);
  const [wrongGuessAnimation, setWrongGuessAnimation] =
    useState<boolean>(false);
  const [correctGuessAnimation, setCorrectGuessAnimation] =
    useState<boolean>(false);
  const [guessedWords, setGuessedWords] = useState<GuessedWord[]>([]);
  const [showNewWordAnimation, setShowNewWordAnimation] =
    useState<boolean>(false);

  const initializeGame = () => {
    const randomTerm = termsList?.pop() || "";
    setCurrentTerm(randomTerm);
    setDefinition(subjectTerms[randomTerm] || "");
    setGuessedLetters(new Set());
    setRemainingGuesses(5);
    setGameState("playing");
  };

  useEffect(() => {
    if (termsList && termsList.length === 0) {
      const termsList = Object.keys(subjectTerms || {});
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
          {subject}
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
              Score: {score} from {termsLength} terms
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
                className="mt-4 animate-bounce hover:scale-105 transition-transform duration-300"
                onClick={initializeGame}>
                Next Term
              </Button>
            </div>
          )}

          {guessedWords.length > 0 && (
            <div className="mt-8">
              <h3 className="text-center font-semibold mb-4">Guessed Words</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {guessedWords.map((word, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      showNewWordAnimation && index === guessedWords.length - 1
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
      </CardContent>
    </Card>
  );
};

export default GameComponent;
