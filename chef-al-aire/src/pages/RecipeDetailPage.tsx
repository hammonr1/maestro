import { useState } from 'react';
import { Box, VStack, HStack, Text, Image, Button, Badge, Divider, UnorderedList, ListItem } from '@chakra-ui/react';

interface RecipeDetailPageProps {
  recipeId: string;
  onBack: () => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

// Enhanced recipe structure with ingredients per step
const recipes = [
  {
    id: '1',
    name: 'Chocolate Chip Cookies',
    description: 'Soft, chewy cookies with melty chocolate chips',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    cuisine: 'American',
    difficulty: 'easy',
    totalTime: 27,
    servings: 24,
    rating: 4.8,
    ingredients: [
      '2.25 cups all-purpose flour',
      '1 cup butter, softened',
      '0.75 cup sugar',
      '0.75 cup brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '1 tsp baking soda',
      '1 tsp salt',
      '2 cups chocolate chips',
    ],
    steps: [
      { 
        number: 1, 
        instruction: 'Preheat oven to 375°F (190°C).', 
        time: 2,
        ingredients: [] // No ingredients needed for preheating
      },
      { 
        number: 2, 
        instruction: 'Mix butter, sugars, eggs, and vanilla until creamy.', 
        time: 3,
        ingredients: ['1 cup butter, softened', '0.75 cup sugar', '0.75 cup brown sugar', '2 large eggs', '2 tsp vanilla extract']
      },
      { 
        number: 3, 
        instruction: 'In separate bowl, combine flour, baking soda, and salt.', 
        time: 2,
        ingredients: ['2.25 cups all-purpose flour', '1 tsp baking soda', '1 tsp salt']
      },
      { 
        number: 4, 
        instruction: 'Gradually blend dry ingredients into butter mixture.', 
        time: 2,
        ingredients: [] // Using ingredients from previous steps
      },
      { 
        number: 5, 
        instruction: 'Stir in chocolate chips.', 
        time: 1,
        ingredients: ['2 cups chocolate chips']
      },
      { 
        number: 6, 
        instruction: 'Drop rounded tablespoons of dough onto ungreased cookie sheets.', 
        time: 5,
        ingredients: [] // Using prepared dough
      },
      { 
        number: 7, 
        instruction: 'Bake for 9-11 minutes or until golden brown.', 
        time: 10,
        ingredients: []
      },
      { 
        number: 8, 
        instruction: 'Cool on baking sheet for 2 minutes, then transfer to wire rack.', 
        time: 2,
        ingredients: []
      },
    ],
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy egg sauce',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    cuisine: 'Italian',
    difficulty: 'medium',
    totalTime: 30,
    servings: 4,
    rating: 4.7,
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale, diced',
      '4 large eggs',
      '100g Pecorino Romano cheese, grated',
      '100g Parmesan cheese, grated',
      'Black pepper to taste',
      'Salt for pasta water',
    ],
    steps: [
      { 
        number: 1, 
        instruction: 'Bring large pot of salted water to boil.', 
        time: 5,
        ingredients: ['Salt for pasta water']
      },
      { 
        number: 2, 
        instruction: 'Cook spaghetti according to package directions until al dente.', 
        time: 10,
        ingredients: ['400g spaghetti']
      },
      { 
        number: 3, 
        instruction: 'While pasta cooks, fry pancetta in large pan until crispy.', 
        time: 5,
        ingredients: ['200g pancetta or guanciale, diced']
      },
      { 
        number: 4, 
        instruction: 'In bowl, whisk together eggs, both cheeses, and black pepper.', 
        time: 3,
        ingredients: ['4 large eggs', '100g Pecorino Romano cheese, grated', '100g Parmesan cheese, grated', 'Black pepper to taste']
      },
      { 
        number: 5, 
        instruction: 'Reserve 1 cup pasta water, then drain pasta.', 
        time: 1,
        ingredients: []
      },
      { 
        number: 6, 
        instruction: 'Add hot pasta to pan with pancetta. Remove from heat.', 
        time: 1,
        ingredients: []
      },
      { 
        number: 7, 
        instruction: 'Quickly stir in egg mixture, tossing constantly. Add pasta water if needed.', 
        time: 2,
        ingredients: []
      },
      { 
        number: 8, 
        instruction: 'Serve immediately with extra cheese and black pepper.', 
        time: 2,
        ingredients: []
      },
    ],
  },
  {
    id: '3',
    name: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with tender chicken',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    cuisine: 'Indian',
    difficulty: 'medium',
    totalTime: 45,
    servings: 6,
    rating: 4.9,
    ingredients: [
      '800g chicken breast, cubed',
      '1 cup plain yogurt',
      '2 tbsp tikka masala spice blend',
      '2 onions, diced',
      '4 cloves garlic, minced',
      '2 tbsp ginger, minced',
      '400g crushed tomatoes',
      '1 cup heavy cream',
      '2 tbsp vegetable oil',
      'Fresh cilantro for garnish',
    ],
    steps: [
      { 
        number: 1, 
        instruction: 'Marinate chicken in yogurt and half the spices for 30 minutes.', 
        time: 30,
        ingredients: ['800g chicken breast, cubed', '1 cup plain yogurt', '1 tbsp tikka masala spice blend (half)']
      },
      { 
        number: 2, 
        instruction: 'Heat oil in large pan over medium-high heat.', 
        time: 2,
        ingredients: ['2 tbsp vegetable oil']
      },
      { 
        number: 3, 
        instruction: 'Cook chicken until browned, about 5 minutes. Remove and set aside.', 
        time: 5,
        ingredients: []
      },
      { 
        number: 4, 
        instruction: 'In same pan, sauté onions until soft, about 5 minutes.', 
        time: 5,
        ingredients: ['2 onions, diced']
      },
      { 
        number: 5, 
        instruction: 'Add garlic, ginger, and remaining spices. Cook 1 minute.', 
        time: 1,
        ingredients: ['4 cloves garlic, minced', '2 tbsp ginger, minced', '1 tbsp tikka masala spice blend (remaining half)']
      },
      { 
        number: 6, 
        instruction: 'Add tomatoes and simmer for 10 minutes.', 
        time: 10,
        ingredients: ['400g crushed tomatoes']
      },
      { 
        number: 7, 
        instruction: 'Stir in cream and return chicken to pan. Simmer 5 minutes.', 
        time: 5,
        ingredients: ['1 cup heavy cream']
      },
      { 
        number: 8, 
        instruction: 'Garnish with cilantro and serve with rice or naan.', 
        time: 2,
        ingredients: ['Fresh cilantro for garnish']
      },
    ],
  },
];

export default function RecipeDetailPage({ recipeId, onBack, isBookmarked = false, onBookmarkToggle }: RecipeDetailPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    return (
      <Box p={6} textAlign="center">
        <Text fontSize="xl">Recipe not found</Text>
        <Button mt={4} onClick={onBack}>Back to Recipes</Button>
      </Box>
    );
  }
  
  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const currentStepData = recipe.steps[currentStep];
  
  return (
    <VStack spacing={6} width="100%" align="stretch" pb={10}>
      {/* Top Navigation */}
      <Box bg="white" p={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
        <Button
          data-button-id="back-to-recipes"
          leftIcon={<span>←</span>}
          onClick={onBack}
          colorScheme="gray"
          size="lg"
        >
          Back to Recipes
        </Button>
      </Box>
      
      {/* Recipe Header */}
      <Box width="100%" maxWidth="1000px" mx="auto" px={6}>
        <Image
          src={recipe.imageUrl}
          alt={recipe.name}
          width="100%"
          height="400px"
          objectFit="cover"
          borderRadius="lg"
          mb={4}
        />
        
        <HStack justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Text fontSize="3xl" fontWeight="bold">
            {recipe.name}
          </Text>
          {onBookmarkToggle && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle();
              }}
              colorScheme={isBookmarked ? "orange" : "gray"}
              leftIcon={isBookmarked ? <>⭐</> : <>☆</>}
              size="md"
            >
              {isBookmarked ? "Saved" : "Save Recipe"}
            </Button>
          )}
        </HStack>
        
        <HStack spacing={4} mb={4} flexWrap="wrap">
          <Badge colorScheme="orange" fontSize="md" p={2}>
            🍕 {recipe.cuisine}
          </Badge>
          <Badge colorScheme="yellow" fontSize="md" p={2}>
            ⭐ {recipe.rating}
          </Badge>
          <Badge colorScheme="blue" fontSize="md" p={2}>
            ⏱️ {recipe.totalTime} min
          </Badge>
          <Badge colorScheme="purple" fontSize="md" p={2}>
            👥 {recipe.servings} servings
          </Badge>
          <Badge 
            colorScheme={recipe.difficulty === 'easy' ? 'green' : recipe.difficulty === 'medium' ? 'yellow' : 'red'}
            fontSize="md" 
            p={2}
          >
            {recipe.difficulty === 'easy' ? '🟢' : recipe.difficulty === 'medium' ? '🟡' : '🔴'} {recipe.difficulty}
          </Badge>
        </HStack>
        
        <Text fontSize="lg" color="gray.600" mb={6}>
          {recipe.description}
        </Text>
      </Box>
      
      <Divider />
      
      {/* Full Ingredients Section */}
      <Box width="100%" maxWidth="1000px" mx="auto" px={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          📋 All Ingredients
        </Text>
        <UnorderedList spacing={2} fontSize="lg" pl={6}>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>{ingredient}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      
      <Divider />
      
      {/* Instructions Section */}
      <Box width="100%" maxWidth="1000px" mx="auto" px={6}>
        {/* Header with buttons */}
        <HStack justifyContent="space-between" mb={4} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" pointerEvents="none">
            👨‍🍳 Instructions
          </Text>
          
          {/* Navigation buttons - RIGHT SIDE */}
          <HStack spacing={3} position="relative" zIndex={1}>
            {/* Step counter badge */}
            <Badge 
              colorScheme="blue" 
              fontSize="md" 
              p={2}
              pointerEvents="none"
            >
              Step {currentStep + 1} / {recipe.steps.length}
            </Badge>
            
            {/* Previous button */}
            <button
              data-button-id="prev-step"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              style={{
                minWidth: '120px',
                height: '50px',
                fontSize: '18px',
                backgroundColor: currentStep === 0 ? '#e2e8f0' : '#718096',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 0 ? 0.5 : 1,
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 0) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              ← Previous
            </button>
            
            {/* Next button */}
            <button
              data-button-id="next-step"
              onClick={handleNextStep}
              disabled={currentStep === recipe.steps.length - 1}
              style={{
                minWidth: '120px',
                height: '50px',
                fontSize: '18px',
                backgroundColor: currentStep === recipe.steps.length - 1 ? '#e2e8f0' : '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentStep === recipe.steps.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentStep === recipe.steps.length - 1 ? 0.5 : 1,
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                if (currentStep !== recipe.steps.length - 1) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              Next →
            </button>
          </HStack>
        </HStack>
        
        {/* Current Step Display */}
        <Box
          bg="blue.50"
          p={8}
          borderRadius="lg"
          border="3px solid"
          borderColor="blue.500"
          mb={6}
        >
          {/* Time badge */}
          {currentStepData.time && (
            <Badge colorScheme="purple" fontSize="lg" p={2} mb={4}>
              ⏱️ ~{currentStepData.time} min
            </Badge>
          )}
          
          {/* Instruction text */}
          <Text fontSize="2xl" lineHeight="1.6" mb={6} pointerEvents="none">
            {currentStepData.instruction}
          </Text>
          
          {/* Ingredients for this step */}
          {currentStepData.ingredients && currentStepData.ingredients.length > 0 && (
            <Box 
              mt={6} 
              pt={4} 
              borderTop="2px solid" 
              borderColor="blue.300"
              pointerEvents="none"
            >
              <Text fontSize="lg" fontWeight="bold" mb={3} color="blue.700">
                🥘 Ingredients for this step:
              </Text>
              <UnorderedList spacing={2} fontSize="lg" pl={6} color="gray.700">
                {currentStepData.ingredients.map((ingredient, index) => (
                  <ListItem key={index} fontWeight="medium">
                    {ingredient}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </Box>
        
        {/* Step completion message */}
        {currentStep === recipe.steps.length - 1 && (
          <Box textAlign="center" mt={6}>
            <Text fontSize="xl" color="green.600" fontWeight="bold">
              🎉 You've completed all steps! Enjoy your {recipe.name}!
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}
