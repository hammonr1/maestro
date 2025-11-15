import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

interface ClickTestProps {
  onButtonClick: (buttonId: string) => void;
}

const ClickTest: React.FC<ClickTestProps> = ({ onButtonClick }) => {
  return (
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
      <HStack spacing="40px">
        <Button
          width="200px"
          height="100px"
          fontSize="24px"
          data-button-id="1"
          onClick={() => onButtonClick("1")}
          colorScheme="red"
          _hover={{ 
            transform: 'scale(1.05)',
            boxShadow: 'lg'
          }}
          transition="all 0.2s ease-in-out"
        >
          Button 1
        </Button>
        
        <Button
          width="200px"
          height="100px"
          fontSize="24px"
          data-button-id="2"
          onClick={() => onButtonClick("2")}
          colorScheme="green"
          _hover={{ 
            transform: 'scale(1.05)',
            boxShadow: 'lg'
          }}
          transition="all 0.2s ease-in-out"
        >
          Button 2
        </Button>
        
        <Button
          width="200px"
          height="100px"
          fontSize="24px"
          data-button-id="3"
          onClick={() => onButtonClick("3")}
          colorScheme="blue"
          _hover={{ 
            transform: 'scale(1.05)',
            boxShadow: 'lg'
          }}
          transition="all 0.2s ease-in-out"
        >
          Button 3
        </Button>
      </HStack>
    </Box>
  );
};

export default ClickTest;
