import { useState } from "react";
import { ChevronLeft } from "lucide-react";

// Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { WelcomeSection } from "./components/WelcomeSection";

// Data
import { csKeyTerms } from "@/data/keyTerms";
import { dbaKeyTerms } from "./data/dbaKeyTerms";

// Styles
import "./App.css";
import GameComponent from "./components/GameComponent";

const arrayOfWelcomeGames = [
  { subject: "Computer Science", subjectTerms: csKeyTerms },
  { subject: "Data Management Applications", subjectTerms: dbaKeyTerms },
];

function App() {
  const [newGame, setNewGame] = useState(true);
  type GameSelection = {
    subject: string;
    subjectTerms: { [key: string]: string };
  } | null;

  const [gameSelection, setGameSelection] = useState<GameSelection>(null);

  const resetGame = () => {
    setNewGame(true);

    setGameSelection({
      subject: "",
      subjectTerms: {},
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-4">
        {!newGame && (
          <Button
            variant="outline"
            size="icon"
            className="mt-4"
            onClick={resetGame}>
            <ChevronLeft />
          </Button>
        )}
        <h1 className="text-4xl font-semibold text-center mt-8 mb-4">
          Vanishing Man
        </h1>
      </div>
      {!newGame ? (
        <GameComponent
          subject={gameSelection?.subject || ""}
          subjectTerms={gameSelection?.subjectTerms || {}}
        />
      ) : (
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {arrayOfWelcomeGames.map((subject, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center">
                <WelcomeSection
                  key={index}
                  subjectName={subject.subject}
                  startNewGame={() => {
                    setGameSelection({
                      subject: subject.subject,
                      subjectTerms: subject.subjectTerms,
                    });
                    setNewGame(!newGame);
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}

export default App;
