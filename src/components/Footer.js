import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
      <Text align="center" fontSize="sm">
        &copy; {new Date().getFullYear()} Docker UI. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
