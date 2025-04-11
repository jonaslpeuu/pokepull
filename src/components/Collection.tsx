
import React from 'react';

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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {cards.map(card => (
        <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={card.imageUrl} alt={card.name} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="text-md font-semibold text-gray-800">{card.name}</h3>
            <p className="text-sm text-gray-600">Rarity: {card.rarity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
