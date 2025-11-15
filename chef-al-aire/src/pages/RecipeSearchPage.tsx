import { useState, useMemo, useEffect } from 'react';
import { Box, VStack, Text, SimpleGrid, Input, HStack, Button, IconButton } from '@chakra-ui/react';

// Inline recipe type (simplified)
interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  difficulty: string;
  totalTime: number;
  servings: number;
  rating: number;
}

// Inline sample recipes (simplified - just 3 for now)
const sampleRecipes: Recipe[] = [
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

interface RecipeSearchPageProps {
  onRecipeClick: (recipeId: string) => void;
  bookmarkedRecipes?: string[];
  onBookmarkToggle?: (recipeId: string) => void;
  initialSearchQuery?: string;
}

export default function RecipeSearchPage({ 
  onRecipeClick,
  bookmarkedRecipes = [],
  onBookmarkToggle,
  initialSearchQuery = ''
}: RecipeSearchPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  
  // Update search when voice command comes in or when initialSearchQuery changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);
  
  // Filter recipes based on search
  const filteredRecipes = useMemo(() => {
    if (!searchQuery) return sampleRecipes;
    
    return sampleRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  return (
    <VStack spacing={6} p={6} width="100%" align="stretch" minHeight="100%">
      {/* Search Bar */}
      <Box width="100%" maxWidth="800px" mx="auto">
        <Input
          data-button-id="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search recipes..."
          height="60px"
          fontSize="20px"
          bg="white"
          border="2px solid"
          borderColor="gray.300"
          _hover={{ borderColor: 'blue.400' }}
          _focus={{ 
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
          }}
        />
      </Box>
      
      {/* Results Count */}
      <Text fontSize="lg" color="gray.600" textAlign="center">
        Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
      </Text>
      
      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.500">
            No recipes found
          </Text>
          <Text color="gray.400" mt={2}>
            Try a different search term
          </Text>
        </Box>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={8} 
          width="100%"
          justifyItems="center"
          pb={10}
        >
          {filteredRecipes.map((recipe) => (
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
              border="3px solid transparent"
            >
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
                {/* Cuisine & Rating */}
                <HStack spacing={2} mb={2} justifyContent="space-between" pointerEvents="none">
                  <Text fontSize="sm" color="orange.500" fontWeight="bold" pointerEvents="none">
                    🍕 {recipe.cuisine}
                  </Text>
                  <Text fontSize="sm" color="yellow.500" pointerEvents="none">
                    ⭐ {recipe.rating}
                  </Text>
                </HStack>
                
                {/* Recipe Name and Bookmark */}
                <HStack justifyContent="space-between" mb={2}>
                  <Text fontSize="xl" fontWeight="bold" noOfLines={2} pointerEvents="none">
                    {recipe.name}
                  </Text>
                  {onBookmarkToggle && (
                    <IconButton
                      aria-label={bookmarkedRecipes.includes(recipe.id) ? "Remove from saved" : "Save recipe"}
                      icon={bookmarkedRecipes.includes(recipe.id) ? <>⭐</> : <>☆</>}
                      colorScheme={bookmarkedRecipes.includes(recipe.id) ? "orange" : "gray"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookmarkToggle(recipe.id);
                      }}
                      size="sm"
                      pointerEvents="auto"
                    />
                  )}
                </HStack>
                
                {/* Description */}
                <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2} pointerEvents="none">
                  {recipe.description}
                </Text>
                
                {/* Info */}
                <HStack spacing={3} fontSize="sm" color="gray.600" pointerEvents="none">
                  <Text pointerEvents="none">
                    {recipe.difficulty === 'easy' ? '🟢' : recipe.difficulty === 'medium' ? '🟡' : '🔴'} {recipe.difficulty}
                  </Text>
                  <Text pointerEvents="none">⏱️ {recipe.totalTime} min</Text>
                  <Text pointerEvents="none">👥 {recipe.servings}</Text>
                </HStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
