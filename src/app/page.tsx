"use client";

import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RevealCard } from "@/components/RevealCard";
import { Collection } from "@/components/Collection";
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sun, Moon, Star } from "lucide-react";

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
  const availableCards = [...cards]; // Create a copy to avoid modifying the original array

  // Shuffle the available cards to ensure randomness
  for (let i = availableCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableCards[i], availableCards[j]] = [availableCards[j], availableCards[i]];
  }

  // Select the first 'numberOfCards' unique cards
  const selectedCards: { [id: string]: boolean } = {};
  let count = 0;
  for (let i = 0; i < availableCards.length && count < numberOfCards; i++) {
    const card = availableCards[i];
    if (!selectedCards[card.id]) {
      pack.push(card);
      selectedCards[card.id] = true;
      count++;
    }
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
  const [resetCards, setResetCards] = useState(false); // State to trigger card reset
  const cardRefs = useRef<{[key: string]: any}>({});


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

    // Reset the pack before opening a new one
    setPack([]);
    const newPack = openBoosterPack(cards);
    setPack(newPack);
    setResetCards(prev => !prev);

  };

  const handleAddToCollection = (card: PokemonCard) => {
    setCollection(prevCollection => {
      const cardExists = prevCollection.find(c => c.id === card.id);
      if (cardExists) {
        // Card already exists, remove it
        return prevCollection.filter(c => c.id !== card.id);
      } else {
        // Card doesn't exist, add it
        return [...prevCollection, card];
      }
    });
  };

  const isCardInCollection = (card: PokemonCard) => {
    return collection.some(c => c.id === card.id);
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
              {theme === 'light' ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
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
                <div key={card.id} className="relative">
                  <RevealCard key={card.id} card={card} reset={resetCards}  />
                  <button
                    onClick={() => handleAddToCollection(card)}
                    className="absolute top-2 left-2 bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors duration-300 p-2 rounded-full"
                    aria-label={language === 'en' ? (isCardInCollection(card) ? 'Remove from collection' : 'Add to collection') : (isCardInCollection(card) ? 'Aus Sammlung entfernen' : 'Zur Sammlung hinzufügen')}
                  >
                    {isCardInCollection(card) ? <Star className="h-4 w-4 fill-electric-yellow" /> : <Star className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
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
