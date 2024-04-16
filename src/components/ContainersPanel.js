import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Button } from '@chakra-ui/react';
import axios from 'axios';

const ContainersPanel = () => {
  const [containers, setContainers] = useState([]);

  const fetchContainers = async () => {
    try {
      const response = await axios.post('http://localhost:3001/exec', {
        command: 'docker ps --format "{{.ID}}: {{.Names}}"'
      });
      setContainers(response.data.split('\n').filter(Boolean).map(container => {
        const [id, name] = container.split(': ');
        return { id, name };
      }));
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  const handleStop = async (id) => {
    try {
      await axios.post('http://localhost:3001/exec', {
        command: `docker stop ${id}`
      });
      // Refresh the containers list
      fetchContainers();
    } catch (error) {
      console.error('Error stopping container:', error);
    }
  };

  const handleStart = async (id) => {
    try {
      await axios.post('http://localhost:3001/exec', {
        command: `docker start ${id}`
      });
      // Refresh the containers list
      fetchContainers();
    } catch (error) {
      console.error('Error starting container:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" textAlign="center" mb={5}>
        Containers
      </Heading>
      <List spacing={3}>
        {containers.map(container => (
          <ListItem key={container.id} padding="2" boxShadow="md" borderRadius="md">
            {container.name} (ID: {container.id})
            <Button colorScheme="red" size="sm" onClick={() => handleStop(container.id)}>Stop</Button>
            <Button colorScheme="green" size="sm" onClick={() => handleStart(container.id)}>Start</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContainersPanel;
