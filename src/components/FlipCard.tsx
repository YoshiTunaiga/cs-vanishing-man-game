import { useState } from "react";

interface FlipCardProps {
  term: string;
  definition: string;
}

const FlipCard = ({ term, definition }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-72 h-24 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}>
      <div
        className={`relative w-full h-full transition-all duration-500`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "",
        }}>
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-white border rounded-lg flex items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
          }}>
          <span className="font-semibold">{term}</span>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-blue-50 border rounded-lg p-2 flex items-center justify-center text-center text-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}>
          <span>{definition}</span>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
