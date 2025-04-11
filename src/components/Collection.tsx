
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  rarity: string;
}

interface CollectionProps {
  cards: PokemonCard[];
}

export const Collection: React.FC<CollectionProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map(card => (
        <Card key={card.id} className="w-48 h-64">
          <CardContent className="p-0 flex flex-col items-center">
            <img src={card.imageUrl} alt={card.name} className="rounded-md h-full w-full object-cover" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
