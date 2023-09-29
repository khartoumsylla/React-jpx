import React, { createContext, useState, useEffect } from "react";  // Import de React, createContext, useState et useEffect depuis React

// Création du contexte RecipeContext
export const RecipeContext = createContext();

// Composant Provider du contexte RecipeContext
export const RecipeContextProvider = ({ children }) => {

  // State pour les recettes aimées (likedRecipes), initialisé à partir de localStorage
  const [likedRecipes, setLikedRecipes] = useState(() => {
    const savedLikedRecipes = localStorage.getItem("likedRecipes");
    return savedLikedRecipes ? JSON.parse(savedLikedRecipes) : [];
  });

  // Effet pour mettre à jour les recettes aimées dans localStorage
  useEffect(() => {
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  // Fonction pour ajouter une recette aux recettes aimées
  const likeRecipe = (recipeId) => {
    if (!likedRecipes.includes(recipeId)) {
      setLikedRecipes([...likedRecipes, recipeId]);
    }
  };

  // Fonction pour supprimer une recette des recettes aimées
  const unlikeRecipe = (recipeId) => {
    const updatedLikedRecipes = likedRecipes.filter((id) => id !== recipeId);
    setLikedRecipes(updatedLikedRecipes);
  };

  // Fonction pour vérifier si une recette est aimée
  const isRecipeLiked = (recipeId) => {
    return likedRecipes.includes(recipeId);
  };

  // Fonction pour récupérer la liste des recettes aimées
  const getLikedRecipes = () => {
    // Attention, la variable "recipes" n'est pas définie ici, vous devez l'importer ou la définir
    // const likedRecipeList = recipes.filter((recipe) => likedRecipes.includes(recipe.id));
    const likedRecipeList = []; // Vous devez remplacer cette ligne par la logique appropriée pour obtenir les recettes aimées
    return likedRecipeList;
  };

  // Valeurs du contexte
  const contextValues = {
    likeRecipe,
    unlikeRecipe,
    isRecipeLiked,
    getLikedRecipes,
  };

  // Rendu du contexte Provider avec les valeurs
  return <RecipeContext.Provider value={contextValues}>{children}</RecipeContext.Provider>;
};
