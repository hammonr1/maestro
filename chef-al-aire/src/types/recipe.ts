export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  duration?: number; // in minutes
  temperature?: string;
  tips?: string[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  diet: string[]; // e.g., ["vegetarian", "gluten-free"]
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  totalTime: number; // in minutes
  servings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags: string[];
  rating?: number;
}
