import  { useEffect, useState } from 'react'
import "./index.css"
import {PokemonCards} from './PokemonCards'
const Pokemon = () => {

    const [data, setData] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const[search,setSearch]=useState("");
useEffect((() =>{

    const API="https://pokeapi.co/api/v2/pokemon?limit=500 "

   const fetchPokemon = async()=>{
    try{
const res=await fetch(API)
const data= await res.json() 
const pokeData=data.results.map(async (curData)=>{
    const res=await fetch(curData.url)
    const data=await res.json()
    return data;
});

const allData= await Promise.all(pokeData);
setData(allData);
setLoading(false)

    }
    catch(error){
        setError(error);
        setLoading(false);
    }
   }

  




    fetchPokemon();
}),[])

console.log(data)


const searchPokemon=data.filter((curData)=>{
    return curData.name.toLowerCase().includes(search.toLowerCase())
  })

console.log(loading)
if(loading)
    {
      return(
          <h1>Loading.....</h1>
      )
    }

    if(error)
    {
        return(
            <h1>{error.message}</h1>
        )
    }

  return (
<>

<section className='container'>
    <header>
        <h1>Lets Catch Pokemon</h1>
    </header>
    <div className='pokemon-search'>
        <input type='text' placeholder='Search for a Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)}/>

    </div>
</section>
<div>
    <li className="cards">
        {searchPokemon.map((pokemonData, index) => (
            <PokemonCards key={index} pokemonData={pokemonData} />
        ))}
    </li>
</div>
</>
    
  )
}

export default Pokemon