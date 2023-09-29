import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { RecipeContext } from "./components/RecipeContext";

const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=540108f8478b474aa487cfad84bd030a`;

function Recipes() {
  // État local pour stocker les recettes
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { likeRecipe, unlikeRecipe, isRecipeLiked } = useContext(RecipeContext);

  // Utilisation de useEffect pour effectuer un appel API lors du chargement du composant
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(apiUrl);
        setRecipes(response.data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleLikeClick = (recipeId) => {
    // Fonction pour gérer les clics sur le bouton "J'aime"
    if (isRecipeLiked(recipeId)) {
      unlikeRecipe(recipeId);
    } else {
      likeRecipe(recipeId);
    }
  };

  return (
    <>
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Toutes les recettes</h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {recipes.map((item) => (
                <div key={item.id} className="group relative">
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
                        {/* Utilisation de Link pour créer un lien vers le détail de la recette */}
                        <Link to={`/product/${item.id}`} className="text-dark">
                          {item.title}
                        </Link>
                        <button
                            onClick={() => handleLikeClick(item.id)}
                            className={`p-2 ${
                              isRecipeLiked(item.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                            }`}
                          >
                            {isRecipeLiked(item.id) ? ' ♡' : '♥'}
                        </button>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Recipes;
