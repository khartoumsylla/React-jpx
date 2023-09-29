import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import navItems from "./data/navItems";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

function Layout() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();  // Fonction pour la navigation

  React.useEffect(() => {
    // Écouteur d'événement pour redimensionner la fenêtre
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item, index) => (
        // Création de la liste des liens de navigation
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to={item.link} className="text-black hover:underline">
            {item.text}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-black" href="/home">
          {/* Logo */}
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium text-black"
          >
            FAIM !
          </Typography>
          <div className="hidden lg:block">{navList}</div>

          {/* Bouton pour ajouter une recette */}
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => navigate("/addRecipes")}  // Utilisation de useNavigate
          >
            <span>Ajouter une recette</span>
          </Button>

          {/* Bouton pour ouvrir le menu sur mobile */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {/* Icônes pour le bouton */}
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>

        {/* Menu mobile */}
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}

            {/* Bouton pour ajouter une recette dans le menu mobile */}
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
              onClick={() => navigate("/addRecipes")}  // Utilisation de useNavigate
            >
              <span>Ajouter une recette</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>

      {/* Contenu principal */}
      <div className="mt-16 ml-20 p-6">
        <Outlet />  {/* Emplacement où les composants enfants seront rendus */}
      </div>
    </>
  );
}

export default Layout;
