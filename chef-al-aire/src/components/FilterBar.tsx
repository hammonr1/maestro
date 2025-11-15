import { Box, HStack, Button, Text } from '@chakra-ui/react';

interface FilterBarProps {
  selectedCuisines: string[];
  selectedDiets: string[];
  selectedDifficulty: string | null;
  onCuisineToggle: (cuisine: string) => void;
  onDietToggle: (diet: string) => void;
  onDifficultySelect: (difficulty: string | null) => void;
}

export default function FilterBar({
  selectedCuisines,
  selectedDiets,
  selectedDifficulty,
  onCuisineToggle,
  onDietToggle,
  onDifficultySelect
}: FilterBarProps) {
  const cuisines = ['All', 'Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'American', 'Mediterranean', 'Thai', 'French'];
  const diets = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <Box width="100%" overflowX="auto" py={2}>
      <HStack spacing={3} pb={2}>
        {/* Cuisines */}
        <Text fontWeight="bold" color="gray.700" whiteSpace="nowrap">
          Cuisine:
        </Text>
        {cuisines.map((cuisine) => (
          <Button
            key={cuisine}
            size="md"
            height="50px"
            minWidth="120px"
            borderRadius="full"
            data-button-id={`cuisine-${cuisine.toLowerCase()}`}
            colorScheme={selectedCuisines.includes(cuisine) && cuisine !== 'All' ? 'blue' : 'gray'}
            variant={selectedCuisines.includes(cuisine) && cuisine !== 'All' ? 'solid' : 'outline'}
            onClick={() => {
              if (cuisine === 'All') {
                // Clear all cuisines
                onCuisineToggle('All');
              } else {
                // Toggle specific cuisine
                onCuisineToggle(cuisine);
              }
            }}
          >
            {cuisine}
          </Button>
        ))}
      </HStack>
      
      <HStack spacing={3} py={2}>
        {/* Diets */}
        <Text fontWeight="bold" color="gray.700" whiteSpace="nowrap">
          Diet:
        </Text>
        {diets.map((diet) => (
          <Button
            key={diet}
            size="md"
            height="50px"
            minWidth="120px"
            borderRadius="full"
            data-button-id={`diet-${diet.toLowerCase().replace(' ', '-')}`}
            colorScheme={selectedDiets.includes(diet) && diet !== 'All' ? 'green' : 'gray'}
            variant={selectedDiets.includes(diet) && diet !== 'All' ? 'solid' : 'outline'}
            onClick={() => {
              if (diet === 'All') {
                // Clear all diets
                onDietToggle('All');
              } else {
                // Toggle specific diet
                onDietToggle(diet);
              }
            }}
          >
            {diet}
          </Button>
        ))}
      </HStack>
      
      <HStack spacing={3} py={2}>
        {/* Difficulty */}
        <Text fontWeight="bold" color="gray.700" whiteSpace="nowrap">
          Difficulty:
        </Text>
        {difficulties.map((difficulty) => (
          <Button
            key={difficulty}
            size="md"
            height="50px"
            minWidth="120px"
            borderRadius="full"
            data-button-id={`difficulty-${difficulty.toLowerCase()}`}
            colorScheme={selectedDifficulty === difficulty && difficulty !== 'All' ? 'orange' : 'gray'}
            variant={selectedDifficulty === difficulty && difficulty !== 'All' ? 'solid' : 'outline'}
            onClick={() => {
              if (difficulty === 'All') {
                onDifficultySelect(null);
              } else {
                onDifficultySelect(difficulty.toLowerCase());
              }
            }}
          >
            {difficulty}
          </Button>
        ))}
      </HStack>
    </Box>
  );
}
