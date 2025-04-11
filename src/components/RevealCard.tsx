'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PokemonCard {
  id: string;
  imageUrl: string;
}

interface RevealCardProps {
  card: PokemonCard;
  reset: boolean;
}

export const RevealCard: React.FC<RevealCardProps> = ({ card, reset }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsRevealed(false); // Reset the card to face down when 'reset' changes
  }, [reset]);

  const handleRevealCard = () => {
    setIsRevealed(true);
  };

  return (
    <Card className={`w-48 h-64 relative transition-transform duration-500 ${isRevealed ? '' : 'rotate-y-180'}`}>
      <div className="absolute w-full h-full backface-hidden">
        {isRevealed ? (
          <CardContent className="p-0 flex items-center justify-center">
            <img src={card.imageUrl} alt="Pokemon Card" className="rounded-md h-full w-full object-cover" />
          </CardContent>
        ) : (
          <div className="bg-secondary h-full flex items-center justify-center rounded-md">
            <button onClick={handleRevealCard} className="bg-accent text-accent-foreground font-bold hover:bg-accent/80 transition-colors duration-300 px-4 py-2 rounded">
              Reveal Card
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};
