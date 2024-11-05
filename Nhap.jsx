import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 16}&limit=16`
      ).then((res) => res.json()),
  });

  return (
    <Container maxWidth={"container.xl"}>
      <Flex gap={60} alignItems="flex-end" paddingBlock={6}>
        <Flex flexDirection="column">
          <Heading as="h1">Pokedéx</Heading>
          <Text>
            Search for Pokémon by name or using the National Pokédex number
          </Text>
        </Flex>
        <Box flex={1}>
          <InputGroup size="lg">
            <Icon />

            <Input placeholder="What Pokémon are you looking for?" />
          </InputGroup>
        </Box>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.results.map((pokemon) => <PokemonCard url={pokemon.url} />)
        )}
      </Grid>
      <Flex justifyContent="center" marginTop={5} gap={1}>
        <Button
          onClick={() => setPage(1)}
          colorScheme={page == 1 ? "purple" : "gray"}
        >
          1
        </Button>
        <Button
          onClick={() => setPage(2)}
          colorScheme={page == 2 ? "purple" : "gray"}
        >
          2
        </Button>
        <Button
          onClick={() => setPage(3)}
          colorScheme={page == 3 ? "purple" : "gray"}
        >
          3
        </Button>
      </Flex>
    </Container>
  );
}

export default App;

function PokemonCard({ url }) {
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
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
    <Card backgroundColor={"green.500"}>
      <CardBody>
        <Flex justifyContent="space-between">
          <Box>
            <Text fontWeight={700} fontFamily="monospace" fontSize="lg">
              #{pokemon.id}
            </Text>
            <Heading fontSize="3xl">{pokemon.name}</Heading>
            <Flex gap={2} marginTop={2}>
              {pokemon.types.map((type) => (
                <Tag
                  key={type.type.name}
                  // colorScheme={type.type.name}
                  variant="solid"
                >
                  <Text fontSize="xs" fontWeight={600}>
                    {type.type.name.toUpperCase()}
                  </Text>
                </Tag>
              ))}
            </Flex>
          </Box>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            boxSize={"100px"}
          />
        </Flex>
      </CardBody>
    </Card>
  );
}
