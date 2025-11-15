import React, { useState } from 'react';
import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import ClickTest from './ClickTest';

/**
 * ClickTestExample Component - Demonstrates usage of the ClickTest button
 * 
 * This component shows how to use the ClickTest button with different configurations
 */
export const ClickTestExample: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleReset = () => {
    setClickCount(0);
  };

  return (
    <Box 
      bg={bgColor} 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      p={4}
    >
      <VStack spacing={8} align="center">
        <Text 
          fontSize="24px" 
          fontWeight="bold" 
          color={textColor}
          textAlign="center"
        >
          Click Test Demo
        </Text>
        
        <Text 
          fontSize="20px" 
          color={textColor}
          textAlign="center"
        >
          Button pressed: {clickCount} time{clickCount !== 1 ? 's' : ''}
        </Text>
        
        <VStack spacing={6}>
          <ClickTest 
            label="Click Me!" 
            onClick={handleButtonClick}
          />
          
          <ClickTest 
            label="Reset Counter" 
            onClick={handleReset}
            colorScheme="red"
          />
          
          <ClickTest 
            label="Disabled Button" 
            isDisabled={true}
          />
        </VStack>
      </VStack>
    </Box>
  );
};

export default ClickTestExample;
