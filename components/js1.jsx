import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Flex style={{ gap: "60px", alignItems: "flex-end", paddingBlock: "6" }}>
      <Flex style={{ flexDirection: "column" }}>
        <Link to="/">
          <Heading as="h1">Pokedéx</Heading>
        </Link>
        <Text>
          Search for Pokémon by name or using the National Pokédex number
        </Text>
      </Flex>

      <Box style={{ flex: 1 }}>
        <InputGroup size="lg">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="What Pokémon are you looking for?" />
        </InputGroup>
      </Box>
    </Flex>
  );
}
