import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { VanishingManSVG } from "@/utils/VanishingManSVG";

interface WelcomeSectionProps {
  initializeNewGame: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  initializeNewGame,
}) => {
  const [numOfGuesses, setNumOfGuesses] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumOfGuesses((prev) => prev - 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <VanishingManSVG remainingGuesses={numOfGuesses} />
      <div className="text-center">
        <Button
          onClick={initializeNewGame}
          className="mt-4 animate-bounce hover:scale-105 transition-transform duration-300">
          Start Game
        </Button>
      </div>
    </div>
  );
};
