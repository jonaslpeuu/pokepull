"use client";

import React from 'react';
import { Star } from "lucide-react";

interface StarButtonProps {
  card: { id: string; };
  collection: { id: string; }[];
  handleAddToCollection: (card: { id: string; }) => void;
  language: string;
}

const StarButton: React.FC<StarButtonProps> = ({ card, collection, handleAddToCollection, language }) => {
  const isCardInCollection = collection.some(c => c.id === card.id);

  return (
    <button
      onClick={() => handleAddToCollection(card)}
      className="absolute top-2 left-2 bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors duration-300 p-2 rounded-full"
      aria-label={language === 'en' ? (isCardInCollection ? 'Remove from collection' : 'Add to collection') : (isCardInCollection ? 'Aus Sammlung entfernen' : 'Zur Sammlung hinzufügen')}
    >
      {isCardInCollection ? <Star className="h-4 w-4 fill-electric-yellow" /> : <Star className="h-4 w-4" />}
    </button>
  );
};

export default StarButton;
