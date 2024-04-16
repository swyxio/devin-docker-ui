import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        Docker Dashboard
      </Heading>
      {/* Dashboard content will go here */}
    </Box>
  );
};

export default Dashboard;
