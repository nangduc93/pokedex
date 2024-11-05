import {
  Container,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Qutlet,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Icon } from "@chakra-ui/react";

export default function Root() {
  return (
    <Container maxWidth={"container.xl"}>
      <Flex gap={60} alignItems="flex-end" paddingBlock={6}>
        <Flex flexDirection="column">
          <Link to="/">
            <Heading as="h1">Pokedéx</Heading>
          </Link>
          <Text>
            Search for Pokémon by name or using the National Pokédex number
          </Text>
        </Flex>

        <Box flex={1}>
          <InputGroup size="lg">
            <InputLeftElement>
              <Icon />
            </InputLeftElement>
            <Input placeholder="What Pokémon are you looking for?" />
          </InputGroup>
        </Box>
      </Flex>

      <Outlet />
    </Container>
  );
}
