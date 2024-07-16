import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"

//* brainstorming de grupo
// acceder al componentDidMount para iniciar nuestra llamada asincrona
// fetch para pedir la info => retorna una promesa
// then/catch o async/await
// de la data extraemos el nombre del pokemon
// un bucle map para pintar los nombres de los pokemon en Links
// cuando hacemos llamadas externas necesitamos un estado para almacenar la data

function Sidebar() {

  const [ pokemonList, setPokemonList ] = useState([])

  useEffect(() => {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => {
      // console.log(response)
      return response.json()
    })
    .then((response) => {
      console.log(response.results)
      setPokemonList(response.results)
    })
    .catch((error) => {
      console.log(error)

      //* aqui tambien podriamos hacer el navigate a error
    })


  }, [])

  // BONUS => efecto de que los links tengan otros estilos si es usuario está en esa ubicación
  const linkCheck = (status) => {
    console.log("verificando status del enlace", status.isActive)

    // retornar la clase dependiendo de el estado
    if (status.isActive) {
      return "link-activo"
    } else {
      return "link-no-activo"
    }
  }

  return (
    <nav className="sidebar">
      
      {pokemonList.map((eachPokemon) => {
        return (
          // <Link to={`/poke/${eachPokemon.name}`} key={eachPokemon.name}>{eachPokemon.name}</Link>
          <NavLink className={linkCheck} to={`/poke/${eachPokemon.name}`} key={eachPokemon.name}>{eachPokemon.name}</NavLink>
        )
      })}

    </nav>
  )
}

export default Sidebar