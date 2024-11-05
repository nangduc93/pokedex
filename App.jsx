import { useState } from "react";
import {
  Container,
  Box,
  Card,
  Flex,
  Heading,
  Grid,
  GridItem,
  Image,
  Input,
  Link,
  Text,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { Tag } from "./components/ui/tag";
import { Icon } from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  // const {
  //   data = [],
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["pokemons"],
  //   queryFn: async () => {
  //     const data = await fetch("https://pokeapi.co/api/v2/pokemon").then(
  //       (res) => res.json()
  //     );
  //     const pokemons = await Promise.all(
  //       data.results.map((pokemon) =>
  //         fetch(pokemon.url).then((res) => res.json())
  //       )
  //     );
  //     return pokemons;
  //   },
  // });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () =>
      fetch(`https://pokeapi.co/api/v2/pokemon`).then((res) => res.json()),
  });

  return (
    <Container maxW={"8xl"}>
      <Flex gap={60} alignItems="flex-end" paddingBlock={6}>
        <Flex flexDirection="column">
          <Link to="/">
            <Heading size="5xl">Pokedéx</Heading>
          </Link>
          <Text>
            Search for Pokémon by name or using the National Pokédex number
          </Text>
        </Flex>

        <Box flex={1}>
          <InputGroup
            size="xl"
            startElement={
              <Icon fontSize="20px" color="gray.800">
                <IoSearchSharp />
              </Icon>
            }
            width="full"
          >
            <Input
              size="xl"
              placeholder="What Pokémon are you looking for?"
              variant="subtle"
            />
          </InputGroup>
        </Box>
      </Flex>

      <Grid gridTemplateColumns={"repeat(4, 1fr)"} gap={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          // data.map((pokemon) => (
          //   <Card.Root bgColor="#8bbe8a" width="300px" key={pokemon.id}>
          //     <Card.Body
          //       display="flex"
          //       flexDirection="row"
          //       justifyContent="space-between"
          //     >
          //       <GridItem>
          //         <Flex gap={2}>
          //           <Box>
          //             <Text># {pokemon.id}</Text>
          //             <Heading size={"3xl"} color="white">
          //               {pokemon.name}
          //             </Heading>
          //             <Flex>
          //               {pokemon.types.map((type) => (
          //                 <Tag
          //                   bg="green.500"
          //                   color="white"
          //                   key={type.type.name}
          //                 >
          //                   <Text>{type.type.name.toUpperCase()}</Text>
          //                 </Tag>
          //               ))}
          //             </Flex>
          //           </Box>
          //         </Flex>
          //       </GridItem>

          //       <GridItem>
          //         <Image
          //           src={
          //             pokemon.sprites.other["official-artwork"].front_default
          //           }
          //           alt={pokemon.name}
          //           boxSize={"100px"}
          //         />
          //       </GridItem>
          //     </Card.Body>
          //   </Card.Root>
          data?.results.map((pokemon) => <PokemonCard url={pokemon.url} />)
          // ))
        )}
      </Grid>
      <ReactPaginate pageCount={10} />
    </Container>
  );
}

function PokemonCard({ url }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon", url],
    queryFn: async () => {
      const res = await fetch(url);
      return res.json();
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Card.Root bgColor="#8bbe8a" width="300px" key={pokemon.id}>
      <Card.Body
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <GridItem>
          <Flex gap={2}>
            <Box>
              <Text># {pokemon.id}</Text>
              <Heading size={"3xl"} color="white">
                {pokemon.name}
              </Heading>
              <Flex>
                {pokemon.types.map((type) => (
                  <Tag bg="green.500" color="white" key={type.type.name}>
                    <Text>{type.type.name.toUpperCase()}</Text>
                  </Tag>
                ))}
              </Flex>
            </Box>
          </Flex>
        </GridItem>

        <GridItem>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            boxSize={"100px"}
          />
        </GridItem>
      </Card.Body>
    </Card.Root>
  );
}
