import { Box, HStack, Text, Button, Badge } from '@chakra-ui/react';

interface HeaderProps {
  currentView: 'recipes' | 'recipeDetail' | 'saved';
  onNavigate: (view: 'recipes' | 'saved') => void;
  savedCount: number;
}

export default function Header({ 
  currentView, 
  onNavigate, 
  savedCount 
}: HeaderProps) {
  return (
    <Box
      bg="white"
      borderBottom="2px solid"
      borderColor="gray.200"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="sm"
      pointerEvents="none"
    >
      <HStack justifyContent="space-between" alignItems="center">
        {/* Logo / Brand */}
        <HStack spacing={3}>
          <Text fontSize="3xl">👨‍🍳</Text>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              Chef Al Aire
            </Text>
            <Text fontSize="sm" color="gray.500">
              Hands-free cooking with AI
            </Text>
          </Box>
        </HStack>
        
        {/* Navigation */}
        <HStack spacing={4} pointerEvents="auto">
          <Button
            data-button-id="nav-recipes"
            onClick={() => onNavigate('recipes')}
            colorScheme={currentView === 'recipes' ? 'blue' : 'gray'}
            variant={currentView === 'recipes' ? 'solid' : 'ghost'}
            size="lg"
            leftIcon={<span style={{ pointerEvents: 'none' }}>🍽️</span>}
          >
            <span style={{ pointerEvents: 'none' }}>All Recipes</span>
          </Button>
          
          <Button
            data-button-id="nav-saved"
            onClick={() => onNavigate('saved')}
            colorScheme={currentView === 'saved' ? 'orange' : 'gray'}
            variant={currentView === 'saved' ? 'solid' : 'ghost'}
            size="lg"
            leftIcon={<span style={{ pointerEvents: 'none' }}>⭐</span>}
            position="relative"
          >
            <span style={{ pointerEvents: 'none' }}>Saved</span>
            {savedCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                colorScheme="orange"
                borderRadius="full"
                px={2}
                fontSize="xs"
                pointerEvents="none"
              >
                {savedCount}
              </Badge>
            )}
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
