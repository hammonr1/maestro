import { Box, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import { ClickTest } from '../components/ClickTest';

export default function HomePage() {
  const toast = useToast();

  const handleFeatureClick = (feature: string) => {
    toast({
      title: "Feature Selected",
      description: `You selected: ${feature}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Voice Command Activated",
      description: "Listening for your voice command...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box bg="blue.50" p={6} borderRadius="lg" textAlign="center">
        <Heading size="lg" color="blue.700" mb={3}>Welcome to Chef Al Aire!</Heading>
        <Text color="blue.600">
          Your hands-free cooking assistant powered by gesture recognition and voice control.
        </Text>
      </Box>

      <Box bg="white" p={5} borderRadius="lg" shadow="md">
        <Heading size="md" mb={4} color="gray.700">Quick Start</Heading>
        <VStack spacing={4}>
          <ClickTest 
            label="🎯 Find a Recipe" 
            colorScheme="blue"
            onClick={() => handleFeatureClick("Find Recipes")}
            data-clickable="true"
            width="100%"
          />
          <ClickTest 
            label="🎤 Voice Search" 
            colorScheme="purple"
            onClick={handleVoiceCommand}
            data-clickable="true"
            width="100%"
          />
          <ClickTest 
            label="🔧 Settings" 
            colorScheme="gray"
            onClick={() => handleFeatureClick("Settings")}
            data-clickable="true"
            width="100%"
          />
        </VStack>
      </Box>

      <Box bg="green.50" p={5} borderRadius="lg" border="1px" borderColor="green.200">
        <Heading size="sm" color="green.700" mb={3}>How to Use Hand Gestures</Heading>
        <VStack align="start" spacing={2}>
          <Text fontSize="sm">👆 Point at any element with <strong>data-clickable="true"</strong></Text>
          <Text fontSize="sm">✌️ Make a two-finger touch to click</Text>
          <Text fontSize="sm">⏳ Or hover over an element for 1.5 seconds (dwell click)</Text>
        </VStack>
      </Box>

      <Box bg="orange.50" p={5} borderRadius="lg" border="1px" borderColor="orange.200">
        <Heading size="sm" color="orange.700" mb={3}>Voice Commands</Heading>
        <VStack align="start" spacing={2}>
          <Text fontSize="sm">"Find pasta recipes"</Text>
          <Text fontSize="sm">"How do I make carbonara?"</Text>
          <Text fontSize="sm">"Next step" or "Previous step"</Text>
          <Text fontSize="sm">"Timer for 10 minutes"</Text>
        </VStack>
      </Box>
    </VStack>
  );
}
