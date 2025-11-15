import { Box, Text, VStack } from '@chakra-ui/react';

interface ScrollIndicatorProps {
  isScrollMode: boolean;
}

export default function ScrollIndicator({ isScrollMode }: ScrollIndicatorProps) {
  if (!isScrollMode) return null;
  
  return (
    <Box
      position="fixed"
      top="100px"  // Below back button, in reachable area
      right="20px"
      bg="purple.500"
      color="white"
      p={4}
      borderRadius="lg"
      boxShadow="xl"
      zIndex={9998}
      animation="pulse 2s infinite"
      sx={{
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      }}
    >
      <VStack spacing={2}>
        <Text fontSize="2xl">⬍</Text>
        <Text fontSize="sm" fontWeight="bold">
          Scroll Mode
        </Text>
        <Text fontSize="xs" opacity={0.9}>
          Move hand up/down
        </Text>
      </VStack>
    </Box>
  );
}
