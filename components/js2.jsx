import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Skeleton,
  Tag,
  Text,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";

const padZero = (num) => {
  return num.toString().padStart(4, "0");
};

const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

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
              #{padZero(pokemon.id)}
            </Text>
            <Heading fontSize="3xl">{formatName(pokemon.name)}</Heading>
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

export default PokemonCard;
