import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RotateLoader from "react-spinners/RotateLoader";

function PokemonDetails() {

  // 0. buscar parametros dinamicos
  const params = useParams()
  console.log(params)

  const navigate = useNavigate()

  // 1. crear el estado
  const [ pokemon, setPokemon ] = useState(null)

  // 2. useEffec para hacer la llamada
  useEffect(() => {

    // forzar el loading a aparecer
    setPokemon(null)

    // 3. llamada
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
      setPokemon(response)
    })
    .catch((error) => {
      console.log(error)
      // redireccionar al usuario a una página de error
      navigate("/error")
    })

  }, [params.pokemonName]) // CADA VEZ QUE HAYA UNA CAMBIO EN EL PARAMETRO DINAMIC, REACT BUSCA DE NUEVO LA DATA

  // 4. Gestor de loading
  if (pokemon === null) {
    return <div><RotateLoader color="red" size={20} margin={5}/></div>
  }

  return (
    <div>

      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.other.dream_world.front_default} alt="pokemon"  width={200}/>
      <p>Movimientos</p>
      {pokemon.moves.slice(-5).map((eachMove, index) => {
        return <li key={index}>{eachMove.move.name}</li>
      }) }

    </div>
  )
}

export default PokemonDetails