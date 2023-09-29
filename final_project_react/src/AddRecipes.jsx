import React, { useState } from "react";  // Import de React et useState depuis React

// Import de la fonction v4 (générer un UUID) depuis la bibliothèque uuid
import { v4 as uuidv4 } from "uuid";

function AddRecipes() {
  // Déclaration des états pour recipe, url et recipes
  const [recipe, setRecipe] = useState("");  // State pour le titre de la recette
  const [url, setUrl] = useState("");  // State pour l'URL de l'image
  const [recipes, setRecipes] = useState([]);  // State pour la liste de recettes

  // Fonction pour ajouter une recette
  const handleAddRecipe = () => {
    // Vérification que recipe et url ne sont pas vides
    if (recipe !== "" && url !== "") {
      // Création de la nouvelle recette avec un ID généré et les valeurs de recipe et url
      const newRecipe = {
        id: uuidv4(),
        title: recipe,
        image: url,
      };
      // Mise à jour du state recipes en ajoutant la nouvelle recette
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    }
    // Réinitialisation des valeurs de recipe et url
    setRecipe("");
    setUrl("");
  };

  // Fonction pour supprimer une recette en fonction de son ID
  const handleDelete = (id) => {
    // Mise à jour du state recipes en filtrant pour exclure la recette avec l'ID donné
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="recipe-app w-screen">
      <h1 className="text-center mb-12">Mes recettes</h1>
      <div className="recipeInput text-center flex flex-col">
        <input
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          className="border rounded p-2 mb-2 bg-white"  // Ajout de la classe bg-white pour le fond blanc
          type="text"
          placeholder="Entrez le titre de la recette"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded p-2 mb-2 bg-white"  // Ajout de la classe bg-white pour le fond blanc
          type="text"
          placeholder="Entrez l'URL de l'image"
        />
        <button onClick={handleAddRecipe} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Ajouter
        </button>
      </div>

      {/* Affichage de la liste des recettes */}
      <div className="recipes-list grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {recipes.map((item) => (
          <div key={item.id} className="group relative border rounded p-4 bg-white">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                src={item.image}
                alt={item.title}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-dark">
                  {item.title}
                </h3>
              </div>
              {/* Bouton pour supprimer la recette */}
              <button onClick={() => handleDelete(item.id)} className="text-red-500">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddRecipes;  // Export du composant AddRecipes
