import { Box, VStack, Text, SimpleGrid, Button, HStack } from '@chakra-ui/react';

interface SavedRecipesPageProps {
  onRecipeClick: (recipeId: string) => void;
  onBack: () => void;
}

// Same recipe data as RecipeSearchPage
const recipes = [
  {
    id: '1',
    name: 'Chocolate Chip Cookies',
    description: 'Soft, chewy cookies with melty chocolate chips',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    cuisine: 'American',
    difficulty: 'easy',
    totalTime: 27,
    servings: 24,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy egg sauce',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    cuisine: 'Italian',
    difficulty: 'medium',
    totalTime: 30,
    servings: 4,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with tender chicken',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    cuisine: 'Indian',
    difficulty: 'medium',
    totalTime: 45,
    servings: 6,
    rating: 4.9,
  },
];

export default function SavedRecipesPage({ onRecipeClick, onBack }: SavedRecipesPageProps) {
  // For now, just show all recipes (we'll filter by bookmarks later)
  const savedRecipes = recipes;
  
  return (
    <VStack spacing={6} p={6} width="100%" align="stretch" minHeight="100%">
      {/* Header */}
      <Box bg="white" p={4} boxShadow="sm">
        <HStack justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            ⭐ Saved Recipes
          </Text>
          <Button
            data-button-id="back-to-recipes"
            onClick={onBack}
            colorScheme="gray"
            size="lg"
          >
            ← Back
          </Button>
        </HStack>
      </Box>
      
      {/* Saved Recipes Grid */}
      {savedRecipes.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="4xl" mb={4}>⭐</Text>
          <Text fontSize="xl" color="gray.500" mb={2}>
            No saved recipes yet
          </Text>
          <Button
            data-button-id="browse-recipes"
            onClick={onBack}
            colorScheme="blue"
            size="lg"
            mt={6}
          >
            Browse Recipes
          </Button>
        </Box>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={8} 
          width="100%"
          justifyItems="center"
          pb={10}
        >
          {savedRecipes.map((recipe) => (
            <Box
              key={recipe.id}
              data-recipe-id={recipe.id}
              data-button-id={`recipe-${recipe.id}`}
              width="300px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              cursor="pointer"
              onClick={() => onRecipeClick(recipe.id)}
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl',
                borderColor: 'blue.500',
                borderWidth: '3px'
              }}
              bg="white"
              border="3px solid"
              borderColor="orange.300"
            >
              {/* Saved badge */}
              <Box
                position="absolute"
                top="10px"
                right="10px"
                bg="orange.400"
                color="white"
                p={2}
                borderRadius="full"
                fontSize="24px"
                zIndex={1}
                pointerEvents="none"
              >
                ⭐
              </Box>
              
              {/* Recipe Image */}
              <Box 
                height="200px" 
                bgImage={`url(${recipe.imageUrl})`}
                bgSize="cover"
                bgPosition="center"
                pointerEvents="none"
              />
              
              {/* Content */}
              <Box p={4} pointerEvents="none">
                <HStack spacing={2} mb={2} justifyContent="space-between">
                  <Text fontSize="sm" color="orange.500" fontWeight="bold">
                    🍕 {recipe.cuisine}
                  </Text>
                  <Text fontSize="sm" color="yellow.500">
                    ⭐ {recipe.rating}
                  </Text>
                </HStack>
                
                <Text fontSize="xl" fontWeight="bold" mb={2} noOfLines={2}>
                  {recipe.name}
                </Text>
                
                <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                  {recipe.description}
                </Text>
                
                <HStack spacing={3} fontSize="sm" color="gray.600">
                  <Text>
                    {recipe.difficulty === 'easy' ? '🟢' : recipe.difficulty === 'medium' ? '🟡' : '🔴'} {recipe.difficulty}
                  </Text>
                  <Text>⏱️ {recipe.totalTime} min</Text>
                  <Text>👥 {recipe.servings}</Text>
                </HStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
