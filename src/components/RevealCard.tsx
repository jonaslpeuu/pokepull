import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  rarity: string;
}

interface RevealCardProps {
    card: PokemonCard;
    onAddToCollection: () => void;
  }

export const RevealCard: React.FC<RevealCardProps> = ({ card, onAddToCollection }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Reset the revealed state when a new card is rendered.
    setIsRevealed(false);
  }, [card]);

  const handleRevealCard = () => {
    setIsRevealed(true);
  };

  return (
    <Card className={`w-48 h-64 relative transition-transform duration-500 ${isRevealed ? 'transform-none' : 'transform rotate-y-180'}`}>
      <div className="absolute w-full h-full backface-hidden">
        {!isRevealed ? (
          <div className="bg-secondary h-full flex items-center justify-center rounded-md">
            <button onClick={handleRevealCard} className="bg-accent text-accent-foreground font-bold hover:bg-accent/80 transition-colors duration-300 px-4 py-2 rounded">
              Reveal Card
            </button>
          </div>
        ) : (
          <div className="p-0 flex items-center justify-center">
            <img src={card.imageUrl} alt={card.name} className="rounded-md h-full w-full object-cover" />
          </div>
        )}
      </div>
    </Card>
  );
};
