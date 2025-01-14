interface VanishingManSVGProps {
  remainingGuesses: number;
}

export const VanishingManSVG = ({ remainingGuesses }: VanishingManSVGProps) => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
    {/* Stand */}
    <line
      x1="40"
      y1="180"
      x2="160"
      y2="180"
      stroke="currentColor"
      strokeWidth="4"
    />
    <line
      x1="60"
      y1="20"
      x2="60"
      y2="180"
      stroke="currentColor"
      strokeWidth="4"
    />
    <line
      x1="60"
      y1="20"
      x2="120"
      y2="20"
      stroke="currentColor"
      strokeWidth="4"
    />
    <line
      x1="120"
      y1="20"
      x2="120"
      y2="40"
      stroke="currentColor"
      strokeWidth="4"
    />

    {/* Man parts - they appear based on remaining guesses */}
    {remainingGuesses < 6 && (
      <circle
        cx="120"
        cy="60"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="animate-fade-in"
      />
    )}
    {remainingGuesses < 5 && (
      <line
        x1="120"
        y1="80"
        x2="120"
        y2="120"
        stroke="currentColor"
        strokeWidth="4"
        className="animate-draw-line"
      />
    )}
    {remainingGuesses < 4 && (
      <line
        x1="120"
        y1="90"
        x2="90"
        y2="100"
        stroke="currentColor"
        strokeWidth="4"
        className="animate-draw-line"
      />
    )}
    {remainingGuesses < 3 && (
      <line
        x1="120"
        y1="90"
        x2="150"
        y2="100"
        stroke="currentColor"
        strokeWidth="4"
        className="animate-draw-line"
      />
    )}
    {remainingGuesses < 2 && (
      <line
        x1="120"
        y1="120"
        x2="90"
        y2="150"
        stroke="currentColor"
        strokeWidth="4"
        className="animate-draw-line"
      />
    )}
    {remainingGuesses < 1 && (
      <line
        x1="120"
        y1="120"
        x2="150"
        y2="150"
        stroke="currentColor"
        strokeWidth="4"
        className="animate-draw-line"
      />
    )}
  </svg>
);
