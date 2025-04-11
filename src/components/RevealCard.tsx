
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
          <div className="bg-gray-700 h-full flex items-center justify-center">
            <Button onClick={handleRevealCard} className="bg-electric-yellow text-cerulean-blue font-bold hover:bg-vibrant-orange transition-colors duration-300">
              Reveal Card
            </Button>
          </div>
        ) : (
          <CardContent className="p-2 flex flex-col items-center justify-center">
            <img src={card.imageUrl} alt={card.name} className="max-h-40 object-contain mb-2" />
            <h3 className="text-lg font-semibold text-cerulean-blue">{card.name}</h3>
            <p className="text-sm text-gray-600">Rarity: {card.rarity}</p>
          </CardContent>
        )}
      </div>
      {isRevealed && (
        <Button onClick={onAddToCollection} className="bg-cerulean-blue text-white font-bold hover:bg-vibrant-orange transition-colors duration-300 mt-4">
          Add to Collection
        </Button>
      )}
    </Card>
  );
};
