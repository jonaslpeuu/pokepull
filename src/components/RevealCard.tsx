import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PokemonCard {
  id: string;
  imageUrl: string;
}

interface RevealCardProps {
  card: PokemonCard;
}

export const RevealCard: React.FC<RevealCardProps> = ({ card }) => {
  return (
    <Card className={`w-48 h-64`}>
      <CardContent className="p-0 flex items-center justify-center">
        <img src={card.imageUrl} alt="Pokemon Card" className="rounded-md h-full w-full object-cover" />
      </CardContent>
    </Card>
  );
};

