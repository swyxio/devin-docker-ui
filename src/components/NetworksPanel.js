import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import axios from 'axios';

const NetworksPanel = () => {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const response = await axios.post('http://localhost:3001/exec', {
          command: 'docker network ls --format "{{.ID}}: {{.Name}}: {{.Driver}}: {{.Scope}}"'
        });
        const networksData = response.data.split('\n').filter(line => line).map(networkLine => {
          const [id, name, driver, scope] = networkLine.split(':').map(item => item.trim());
          return { id, name, driver, scope };
        });
        setNetworks(networksData);
      } catch (error) {
        console.error('Failed to fetch networks:', error);
      }
    };

    fetchNetworks();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" textAlign="center" mb={5}>
        Networks
      </Heading>
      <List spacing={3}>
        {networks.length > 0 ? (
          networks.map((network, index) => (
            <ListItem key={index}>
              <Text fontWeight="bold">{network.name}</Text>
              <Text>ID: {network.id}</Text>
              <Text>Driver: {network.driver}</Text>
              <Text>Scope: {network.scope}</Text>
            </ListItem>
          ))
        ) : (
          <Text>No networks available.</Text>
        )}
      </List>
    </Box>
  );
};

export default NetworksPanel;
