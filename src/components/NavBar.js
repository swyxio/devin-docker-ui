import React from 'react';
import { Box, Flex, Text, Button, useColorMode, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          Docker UI
        </Text>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={toggleColorMode}>
        <Button bg="transparent" border="1px">
          Toggle Color Mode
        </Button>
      </Box>

      <Box display={{ sm: 'flex', md: 'flex' }} ml="auto" alignItems="center">
        <Link as={RouterLink} to="/" px={2}>
          Dashboard
        </Link>
        <Link as={RouterLink} to="/containers" px={2}>
          Containers
        </Link>
        <Link as={RouterLink} to="/images" px={2}>
          Images
        </Link>
        <Link as={RouterLink} to="/networks" px={2}>
          Networks
        </Link>
        <Link as={RouterLink} to="/volumes" px={2}>
          Volumes
        </Link>
        <Link as={RouterLink} to="/settings" px={2}>
          Settings
        </Link>
        <Link as={RouterLink} to="/terminal" px={2}>
          Terminal
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
