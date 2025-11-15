import { Box, Text, Badge, HStack, Spacer, Image } from '@chakra-ui/react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipeId: string) => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  // Difficulty color mapping
  const difficultyColor = {
    easy: 'green.500',
    medium: 'yellow.500',
    hard: 'red.500'
  }[recipe.difficulty] || 'gray.500';

  return (
    <Box
      data-recipe-id={recipe.id}
      width="300px"
      height="400px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      cursor="pointer"
      onClick={() => onClick(recipe.id)}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg'
      }}
      bg="white"
    >
      {/* Recipe Image */}
      <Box height="200px" position="relative">
        <Image
          src={recipe.imageUrl}
          alt={recipe.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      
      {/* Content */}
      <Box p={4}>
        {/* Cuisine Badge */}
        <HStack spacing={2} mb={2}>
          <Badge colorScheme="orange" fontSize="sm">
            {recipe.cuisine}
          </Badge>
          <Spacer />
          {recipe.rating && (
            <Text fontSize="sm" color="yellow.500">
              ⭐ {recipe.rating}
            </Text>
          )}
        </HStack>
        
        {/* Recipe Name */}
        <Text fontSize="xl" fontWeight="bold" mb={2} noOfLines={2}>
          {recipe.name}
        </Text>
        
        {/* Description */}
        <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
          {recipe.description}
        </Text>
        
        {/* Info Badges */}
        <HStack spacing={2} wrap="wrap">
          {/* Difficulty */}
          <Badge colorScheme={difficultyColor.includes('green') ? 'green' : difficultyColor.includes('yellow') ? 'yellow' : 'red'}>
            {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
          </Badge>
          
          {/* Time */}
          <Badge colorScheme="blue">
            ⏱️ {recipe.totalTime} min
          </Badge>
          
          {/* Servings */}
          <Badge colorScheme="purple">
            👥 {recipe.servings}
          </Badge>
          
          {/* Diet Badges */}
          {recipe.diet.slice(0, 2).map((diet: string, index: number) => (
            <Badge key={index} colorScheme="teal" textTransform="capitalize">
              {diet}
            </Badge>
          ))}
          {recipe.diet.length > 2 && (
            <Badge colorScheme="teal">
              +{recipe.diet.length - 2}
            </Badge>
          )}
        </HStack>
      </Box>
    </Box>
  );
}
