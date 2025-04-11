import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const handleRevealCard = () => {
    setIsRevealed(true);
  };

  return (
    <Card className={`w-48 h-64 relative transition-transform duration-500 ${isRevealed ? 'transform-none' : 'transform rotate-y-180'}`}>
      <div className="absolute w-full h-full backface-hidden">
        {!isRevealed ? (
          <div className="bg-secondary h-full flex items-center justify-center rounded-md">
            <Button onClick={handleRevealCard} className="bg-accent text-accent-foreground font-bold hover:bg-accent/80 transition-colors duration-300">
              Reveal Card
            </Button>
          </div>
        ) : (
          <CardContent className="p-0 flex items-center justify-center">
            <img src={card.imageUrl} alt={card.name} className="rounded-md h-full w-full object-cover" />
          </CardContent>
        )}
      </div>
    </Card>
  );
};
