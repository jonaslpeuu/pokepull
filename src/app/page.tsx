"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RevealCard } from "@/components/RevealCard";
import { Collection } from "@/components/Collection";
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Define the type for a Pokemon card
interface PokemonCard {
  id: string;
  imageUrl: string;
}

// Function to simulate opening a booster pack
const openBoosterPack = (cards: PokemonCard[], numberOfCards: number = 5): PokemonCard[] => {
  const pack: PokemonCard[] = [];
  const availableCards = [...cards]; // Create a copy to avoid modifying the original array

  for (let i = 0; i < numberOfCards; i++) {
    if (availableCards.length === 0) {
      console.warn("Not enough unique cards available.");
      break; // Stop if there are no more unique cards
    }
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    pack.push(availableCards[randomIndex]);
    availableCards.splice(randomIndex, 1); // Remove the selected card to avoid duplicates
  }
  return pack;
};

export default function Home() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [pack, setPack] = useState<PokemonCard[]>([]);
  const [collection, setCollection] = useState<PokemonCard[]>([]);
  const [showCollection, setShowCollection] = useState(false);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('en'); // 'en' for English, 'de' for German

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
      alert(language === 'en' ? "Cards are still loading. Please wait." : "Karten werden noch geladen. Bitte warten.");
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

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-background">
      <header className="text-center text-foreground mb-4 w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors duration-300 px-4 py-2 rounded">
                {language === 'en' ? 'Language' : 'Sprache'}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('de')}>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1 className="text-4xl font-bold">PokePull</h1>
          <div>
            <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors duration-300 px-4 py-2 rounded">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </div>
        </div>
        <p className="text-md text-secondary-foreground">
          {language === 'en'
            ? 'Open Pokemon cards and start your collection!'
            : 'Öffne Pokémon-Karten und beginne deine Sammlung!'}
        </p>
      </header>

      <main className="flex flex-col items-center justify-center w-full">
        <Button onClick={handleOpenPack} className="bg-accent text-accent-foreground font-bold hover:bg-accent/80 transition-colors duration-300 mb-4">
          {language === 'en' ? 'Open Booster Pack' : 'Boosterpack öffnen'}
        </Button>

        {pack.length > 0 && (
          <div className="mb-4">
            <h2 className="text-foreground text-center mb-2">
              {language === 'en' ? 'Your New Cards:' : 'Deine neuen Karten:'}
            </h2>
            <div className="flex justify-center space-x-4">
              {pack.map(card => (
                <RevealCard key={card.id} card={card} onAddToCollection={() => handleAddToCollection([card])} />
              ))}
            </div>
            <Button onClick={() => handleAddToCollection(pack)} className="bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-colors duration-300 mt-4">
              {language === 'en' ? 'Add to Collection' : 'Zur Sammlung hinzufügen'}
            </Button>
          </div>
        )}

        <Button onClick={toggleCollection} className="bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors duration-300 mt-4">
          {showCollection ? (language === 'en' ? 'Hide Collection' : 'Sammlung ausblenden') : (language === 'en' ? 'View Collection' : 'Sammlung ansehen')}
        </Button>

        {showCollection && (
          <Collection cards={collection} />
        )}
      </main>

      <footer className="text-center mt-8 text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PokePull. {language === 'en' ? 'All rights reserved.' : 'Alle Rechte vorbehalten.'}</p>
      </footer>
    </div>
  );
}
