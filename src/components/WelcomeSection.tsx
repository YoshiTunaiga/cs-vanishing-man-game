import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VanishingManSVG } from "@/utils/VanishingManSVG";

interface WelcomeSectionProps {
  startNewGame: () => void;
  subjectName: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  startNewGame,
  subjectName,
}) => {
  const [numOfGuesses, setNumOfGuesses] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumOfGuesses((prev) => prev - 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{subjectName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <VanishingManSVG remainingGuesses={numOfGuesses} />
          <div className="text-center">
            <Button
              onClick={startNewGame}
              className="mt-4 animate-bounce hover:scale-105 transition-transform duration-300">
              Start Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
