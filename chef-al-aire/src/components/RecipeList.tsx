import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeClick: (recipeId: string) => void;
  isLoading?: boolean;
}

export default function RecipeList({ recipes, onRecipeClick, isLoading }: RecipeListProps) {
  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Loading recipes...</Text>
      </Box>
    );
  }

  if (recipes.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="gray.500">
          No recipes found
        </Text>
        <Text color="gray.400" mt={2}>
          Try adjusting your search or filters
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} width="100%">
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={8} 
        width="100%"
        justifyItems="center"
      >
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={onRecipeClick} 
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
