import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Product.css'; // Importer le fichier CSS

const Product = () => {
  // État local pour stocker les informations de la recette
  const [recipeInfo, setRecipeInfo] = useState(null);
  
  // Utilisation de useParams pour obtenir l'ID de la recette à partir de l'URL
  const { id } = useParams();

  // Utilisation de useEffect pour effectuer un appel API lors du chargement du composant
  useEffect(() => {
    // URL de l'API avec l'ID de la recette
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=540108f8478b474aa487cfad84bd030a`;

    // Appel API pour obtenir les informations de la recette
    axios
      .get(apiUrl)
      .then((response) => {
        // Mise à jour de l'état avec les données de la recette obtenues
        setRecipeInfo(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la recette :', error);
      });
  }, [id]);

  return (
    <div className="product-container">
      {recipeInfo ? (
        <div>
          <h1 className="product-title">{recipeInfo.title}</h1>
          <img src={recipeInfo.image} alt={recipeInfo.title} className="product-image" />
          <div className="product-section">
            <h2 className="product-heading">Ingrédients :</h2>
            <ul className="product-list">
              {recipeInfo.extendedIngredients.map((ingredient, index) => (
                <li key={index} className="product-item">{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div className="product-section">
            <h2 className="product-heading">Instructions :</h2>
            <ol className="product-list">
              {recipeInfo.analyzedInstructions[0].steps.map((step, index) => (
                <li key={index} className="product-item">{step.step}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default Product;
