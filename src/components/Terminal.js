import React, { useState } from 'react';
import { Box, Heading, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCommand(value);
  };

  const executeCommand = async () => {
    if (!command.trim()) {
      setOutput('Please enter a command.');
      return;
    }
    console.log(`Sending command to server: ${command}`); // Log the command being sent to the server
    try {
      const response = await axios.post('http://localhost:3001/exec', {
        command: command
      });
      console.log(`Response from server: ${response.data}`); // Log the response from the server
      setOutput(response.data);
    } catch (error) {
      console.error('Failed to execute command:', error);
      setOutput(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" textAlign="center" mb={5}>
        Terminal
      </Heading>
      <Textarea
        placeholder="Enter Docker command"
        size="lg"
        resize="vertical"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={command}
      />
      <Button mt={2} colorScheme="blue" onClick={executeCommand}>
        Execute
      </Button>
      <Box mt={4}>
        {output && (
          <Textarea
            placeholder="Output"
            size="lg"
            resize="vertical"
            value={output}
            isReadOnly
          />
        )}
      </Box>
    </Box>
  );
};

export default Terminal;
