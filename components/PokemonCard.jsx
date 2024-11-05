import {
  Box,
  Card,
  Flex,
  Heading,
  GridItem,
  Image,
  Skeleton,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function PokemonCard({ url }) {
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
