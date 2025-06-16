import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (shelter) => {
    const exists = favorites.some(f => f.id === shelter.id);
    setFavorites(
      exists
        ? favorites.filter(f => f.id !== shelter.id)
        : [...favorites, shelter]
    );
  };

  const isFavorited = (shelterId) =>
    favorites.some((shelter) => shelter.id === shelterId);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
