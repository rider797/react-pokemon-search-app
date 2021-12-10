import React from "react";
import PropTypes from "prop-types";

function PokemonInfo(props) {
  const [imageSrc, setImageSrc] = React.useState(""); //this is a state
  const [desc, setDesc] = React.useState("loading..."); //you can write in a comment to the user in the useState
  const [weight, setWeight] = React.useState("");
  //desc is description, src is source

  async function fetchPokemon() {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${props.pokemon.toLowerCase()}`
    );
    const pokemon = await response.json();
    setImageSrc(pokemon.sprites.front_default);

    setTimeout(() => {
      setImageSrc(pokemon.sprites.back_default);
    }, 3000);
    //could also use setInterval to keep it rotating between front and back */

    response = await fetch(pokemon.species.url);

    const species = await response.json();
    const flavorTextEntry = species.flavor_text_entries.find(
      element => element.language.name === "en"
    );
    setDesc(flavorTextEntry.flavor_text);

    setWeight(pokemon.weight);
  }

  React.useEffect(() => {
    fetchPokemon();
  }, [props.pokemon]);

  return (
    <div className="container">
      <div className="resultName">{props.pokemon}</div>
      <img src={imageSrc} alt={props.pokemon} />
      <div className="resultDescription">{desc}</div>
      <div>weight: {weight}</div>
    </div>
  );
}

PokemonInfo.propType = {
  pokemon: PropTypes.string.isRequired
};
// to make sure the property is used the way they are defined. A help for developers: https://reactjs.org/docs/typechecking-with-proptypes.html

export default PokemonInfo;

/*React.useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.toLowerCase()}`)
      .then(response => {
        return response.json();
      })
      .then(pokemon => {
        setImageSrc(pokemon.sprites.front_default);
        //the sprites and front_default are names in the pokemon api
        return pokemon.species.url;
      })
      .then(pokemonSpeciesUrl => {
        return fetch(pokemonSpeciesUrl);
      })
      .then(response => {
        return response.json();
      })
      .then(species => {
        setDesc(
          species.flavor_text_entries.find(function(element) {
            return element.language.name === "en";
          }).flavor_text
        );
      });
  }, [props.pokemon]);
  */
