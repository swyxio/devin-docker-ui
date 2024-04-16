import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import axios from 'axios';

const VolumesPanel = () => {
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        const response = await axios.post('http://localhost:3001/exec', {
          command: 'docker volume ls --format "{{.Driver}}: {{.Name}}"'
        });
        const volumesData = response.data.split('\n').filter(line => line).map(volumeLine => {
          const [driver, name] = volumeLine.split(':').map(item => item.trim());
          return { driver, name };
        });
        setVolumes(volumesData);
      } catch (error) {
        console.error('Failed to fetch volumes:', error);
      }
    };

    fetchVolumes();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" textAlign="center" mb={5}>
        Volumes
      </Heading>
      <List spacing={3}>
        {volumes.length > 0 ? (
          volumes.map((volume, index) => (
            <ListItem key={index}>
              <Text fontWeight="bold">{volume.name}</Text>
              <Text>Driver: {volume.driver}</Text>
            </ListItem>
          ))
        ) : (
          <Text>No volumes available.</Text>
        )}
      </List>
    </Box>
  );
};

export default VolumesPanel;
