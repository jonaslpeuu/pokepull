
"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RevealCard } from "@/components/RevealCard";
import { Collection } from "@/components/Collection";

// Define the type for a Pokemon card
interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  rarity: string;
}

// Function to simulate opening a booster pack
const openBoosterPack = (cards: PokemonCard[], numberOfCards: number = 5): PokemonCard[] => {
  const pack: PokemonCard[] = [];
  for (let i = 0; i < numberOfCards; i++) {
    // Simple random selection for now
    const randomIndex = Math.floor(Math.random() * cards.length);
    pack.push(cards[randomIndex]);
  }
  return pack;
};

export default function Home() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [pack, setPack] = useState<PokemonCard[]>([]);
  const [collection, setCollection] = useState<PokemonCard[]>([]);
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    // Load cards from local JSON file
    const loadCards = async () => {
      try {
        const response = await fetch('/data/pokemonCards.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PokemonCard[] = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Could not load Pokemon cards:", error);
      }
    };

    loadCards();
  }, []);

  const handleOpenPack = () => {
    if (cards.length === 0) {
      alert("Cards are still loading. Please wait.");
      return;
    }
    const newPack = openBoosterPack(cards);
    setPack(newPack);
  };

  const handleAddToCollection = (newCards: PokemonCard[]) => {
    setCollection(prevCollection => {
      const updatedCollection = [...prevCollection, ...newCards];
      return updatedCollection;
    });
    setPack([]); // Clear the pack after adding to collection
  };

  const toggleCollection = () => {
    setShowCollection(!showCollection);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-cerulean-blue">
      <header className="text-center text-white mb-8">
        <h1 className="text-4xl font-bold">PokePull</h1>
        <p className="text-md">Open Pokemon cards and start your collection!</p>
      </header>

      <main className="flex flex-col items-center justify-center w-full">
        <Button onClick={handleOpenPack} className="bg-electric-yellow text-cerulean-blue font-bold hover:bg-vibrant-orange transition-colors duration-300 mb-4">
          Open Booster Pack
        </Button>

        {pack.length > 0 && (
          <div className="mb-4">
            <h2 className="text-white text-center mb-2">Your New Cards:</h2>
            <div className="flex justify-center space-x-4">
               {pack.map(card => (
                <RevealCard key={card.id} card={card} onAddToCollection={() => handleAddToCollection([card])} />
              ))}
            </div>
             <Button onClick={() => handleAddToCollection(pack)} className="bg-cerulean-blue text-white font-bold hover:bg-vibrant-orange transition-colors duration-300 mt-4">
                Add to Collection
              </Button>
          </div>
        )}

        <Button onClick={toggleCollection} className="bg-electric-yellow text-cerulean-blue font-bold hover:bg-vibrant-orange transition-colors duration-300 mt-4">
          {showCollection ? 'Hide Collection' : 'View Collection'}
        </Button>

        {showCollection && (
          <Collection cards={collection} />
        )}
      </main>

      <footer className="text-center mt-8 text-gray-300">
        <p>&copy; {new Date().getFullYear()} PokePull. All rights reserved.</p>
      </footer>
    </div>
  );
}
