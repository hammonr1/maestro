import { useState } from 'react';
import { Box, Heading, Text, VStack, HStack, Button, Divider, useToast } from '@chakra-ui/react';
import { ClickTest } from '../components/ClickTest';

export default function RecipeView() {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const toast = useToast();

  // Mock recipe data
  const recipes = [
    {
      id: 1,
      title: "Vegetable Stir Fry",
      cookTime: "15 mins",
      difficulty: "Easy",
      ingredients: ["Bell peppers", "Broccoli", "Carrots", "Soy sauce", "Garlic"],
      steps: [
        "Heat oil in wok over medium-high heat",
        "Add garlic and stir for 30 seconds",
        "Add vegetables and stir fry for 5-7 minutes",
        "Add soy sauce and cook for another 2 minutes"
      ]
    },
    {
      id: 2,
      title: "Pasta Carbonara",
      cookTime: "20 mins",
      difficulty: "Medium",
      ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Bacon", "Black pepper"],
      steps: [
        "Cook pasta according to package directions",
        "Cook bacon until crispy, then crumble",
        "Whisk eggs and cheese in a bowl",
        "Combine hot pasta with egg mixture and bacon"
      ]
    },
    {
      id: 3,
      title: "Avocado Toast",
      cookTime: "5 mins",
      difficulty: "Easy",
      ingredients: ["Bread", "Avocado", "Lemon juice", "Salt", "Red pepper flakes"],
      steps: [
        "Toast bread until golden brown",
        "Mash avocado with lemon juice and salt",
        "Spread avocado on toast",
        "Sprinkle with red pepper flakes"
      ]
    }
  ];

  const handleStartCooking = (recipeId: number) => {
    setSelectedRecipe(recipeId);
    const recipe = recipes.find(r => r.id === recipeId);
    toast({
      title: "Cooking Started",
      description: `Now preparing: ${recipe?.title}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Voice Command Activated",
      description: "Listening for voice commands...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const selectedRecipeData = selectedRecipe ? recipes.find(r => r.id === selectedRecipe) : null;

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">_recipe Book</Heading>
      
      {selectedRecipeData ? (
        // Detailed recipe view
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <HStack justify="space-between" mb={4}>
            <Heading size="md">{selectedRecipeData.title}</Heading>
            <Button 
              onClick={() => setSelectedRecipe(null)}
              colorScheme="gray"
              data-clickable="true"
            >
              ← Back to Recipes
            </Button>
          </HStack>
          
          <HStack spacing={4} mb={6}>
            <Text><strong>⏱️ Cook Time:</strong> {selectedRecipeData.cookTime}</Text>
            <Text><strong>📊 Difficulty:</strong> {selectedRecipeData.difficulty}</Text>
          </HStack>
          
          <Divider my={4} />
          
          <Heading size="sm" mb={3}>Ingredients:</Heading>
          <VStack align="start" spacing={2} mb={6}>
            {selectedRecipeData.ingredients.map((ingredient, index) => (
              <Text key={index} data-clickable="true">• {ingredient}</Text>
            ))}
          </VStack>
          
          <Divider my={4} />
          
          <Heading size="sm" mb={3}>Steps:</Heading>
          <VStack align="start" spacing={3} mb={6}>
            {selectedRecipeData.steps.map((step, index) => (
              <HStack key={index} align="start" data-clickable="true">
                <Text fontWeight="bold">{index + 1}.</Text>
                <Text>{step}</Text>
              </HStack>
            ))}
          </VStack>
          
          <Divider my={4} />
          
          <HStack spacing={4}>
            <ClickTest 
              label="🎤 Voice Control" 
              colorScheme="purple"
              onClick={handleVoiceCommand}
              data-clickable="true"
            />
            <ClickTest 
              label="⏭️ Next Step" 
              colorScheme="blue"
              onClick={() => toast({
                title: "Next Step",
                description: "Moving to next cooking step",
                status: "info",
                duration: 2000,
                isClosable: true,
              })}
              data-clickable="true"
            />
          </HStack>
        </Box>
      ) : (
        // Recipe selection view
        <VStack spacing={4} align="stretch">
          <Text>Select a recipe to begin cooking:</Text>
          
          {recipes.map(recipe => (
            <Box 
              key={recipe.id}
              bg="white"
              p={4}
              borderRadius="lg"
              shadow="md"
              borderWidth="1px"
              borderColor="gray.200"
              data-clickable="true"
              onClick={() => handleStartCooking(recipe.id)}
            >
              <HStack justify="space-between">
                <Heading size="md">{recipe.title}</Heading>
                <HStack spacing={3}>
                  <Text fontSize="sm" color="gray.600">⏱️ {recipe.cookTime}</Text>
                  <Text fontSize="sm" color="gray.600">📊 {recipe.difficulty}</Text>
                </HStack>
              </HStack>
              <Text mt={2} color="gray.600">
                Ingredients: {recipe.ingredients.slice(0, 3).join(", ")}...
              </Text>
            </Box>
          ))}
        </VStack>
      )}
      
      {/* Demo controls for testing */}
      <Box bg="yellow.50" p={4} borderRadius="md" border="1px" borderColor="yellow.200">
        <Heading size="sm" color="yellow.700" mb={2}>Testing Controls</Heading>
        <HStack spacing={3} wrap="wrap">
          <ClickTest 
            label="Voice Search" 
            colorScheme="yellow"
            onClick={handleVoiceCommand}
            data-clickable="true"
          />
          <ClickTest 
            label="Go Back" 
            colorScheme="red"
            onClick={() => setSelectedRecipe(null)}
            data-clickable="true"
          />
        </HStack>
      </Box>
    </VStack>
  );
}
