// Import des modules
import React from 'react';  // Import de React
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import du routage de React Router
import Layout from './Layout';  // Import du composant Layout depuis le fichier 'Layout.js'
import NoPage from './NoPage';  // Import du composant NoPage depuis le fichier 'NoPage.js'
import Home from './Home';  // Import du composant Home depuis le fichier 'Home.js'
import Product from './Product';  // Import du composant Product depuis le fichier 'Product.js'
import Recipes from './Recipes';  // Import du composant Recipes depuis le fichier 'Recipes.js'
import Favorie from './Favorie';  // Import du composant Favorie depuis le fichier 'Favorie.js'
import AddRecipes from './AddRecipes';  // Import du composant AddRecipes depuis le fichier 'AddRecipes.js'
import { RecipeContextProvider } from './components/RecipeContext';  // Import du contexte RecipeContextProvider depuis le fichier 'RecipeContext.js'

// Définition du composant principal App
function App() {
  return (
    <>
      {/* Configuration du router */}
      <BrowserRouter>
        <Routes>
          {/* Configuration des routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />  // Route pour la page d'accueil
            <Route path="product/:id" element={<Product />} />  // Route pour un produit spécifique
            <Route path="favorie" element={<RecipeContextProvider><Favorie/></RecipeContextProvider>} />  // Route pour les favoris
            <Route path="addRecipes" element={<AddRecipes />} />  // Route pour ajouter une recette
            <Route path="recipes" element={<RecipeContextProvider><Recipes/></RecipeContextProvider>} />  // Route pour afficher les recettes
            <Route path="*" element={<NoPage />} />  // Route pour les pages non trouvées
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;  // Export du composant App
