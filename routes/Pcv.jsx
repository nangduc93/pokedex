import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PokemonDetail from "../components/PokemonDetail";

export default function Pokemon() {
  const { name } = useParams();

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Failed to load pokemon data</div>;
  }

  return <PokemonDetail pokemon={pokemon} />;
}
