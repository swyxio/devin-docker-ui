import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, List, ListItem } from '@chakra-ui/react';
import axios from 'axios';

const ImagesPanel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post('http://localhost:3001/exec', {
          command: 'docker images --format "{{.Repository}}:{{.Tag}}:{{.ID}}"'
        });
        const imagesData = response.data.split('\n').filter(line => line).map(imageLine => {
          const [repository, tag, id] = imageLine.split(':');
          return { repository, tag, id };
        });
        setImages(imagesData);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" textAlign="center" mb={5}>
        Images
      </Heading>
      <List spacing={3}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <ListItem key={index}>
              <Text fontWeight="bold">{image.repository}:{image.tag}</Text>
              <Text>ID: {image.id}</Text>
            </ListItem>
          ))
        ) : (
          <Text>No images available.</Text>
        )}
      </List>
    </Box>
  );
};

export default ImagesPanel;
