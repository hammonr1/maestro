# Phase 7A Enhancement: Ingredients Per Step - Testing Protocol

## Overview
This document outlines the testing protocol to verify that the enhancement to show relevant ingredients at the bottom of each step is working correctly.

## Enhancement Applied

### Enhanced Recipe Data Structure
Each recipe step now includes an `ingredients` array that contains only the ingredients needed for that specific step.

### Visual Improvements
1. "All Ingredients" section at the top for reference
2. "Ingredients for this step" section at the bottom of each step
3. Clear visual separation with border line
4. Different styling with 🥘 icon and bold header

### User Experience Improvements
- No need to scroll back up to ingredients list
- See exactly what you need for current step
- Empty array if no new ingredients needed

## Testing Steps

### Test 1: Chicken Tikka Masala - Step 1
- [ ] Open Chicken Tikka Masala recipe
- [ ] Verify Step 1 shows: "Marinate chicken in yogurt and half the spices for 30 minutes."
- [ ] Check bottom section shows 3 ingredients:
  - 800g chicken breast, cubed
  - 1 cup plain yogurt
  - 1 tbsp tikka masala spice blend (half)
- [ ] Verify ingredients are clearly visible with proper styling

### Test 2: Navigation Through Steps
- [ ] Click "Next" to step 2
- [ ] Verify Step 2 shows "Heat oil in large pan over medium-high heat."
- [ ] Check ingredients section shows: 2 tbsp vegetable oil
- [ ] Click "Next" to step 3
- [ ] Verify Step 3 shows "Cook chicken until browned, about 5 minutes. Remove and set aside."
- [ ] Check that no ingredients are shown (uses chicken from step 1)
- [ ] Continue through all steps
- [ ] Verify each step shows correct ingredients

### Test 3: Chocolate Chip Cookies
- [ ] Back to recipe list
- [ ] Open Chocolate Chip Cookies recipe
- [ ] Verify Step 1 shows: "Preheat oven to 375°F (190°C)."
- [ ] Check that no ingredients are shown (no ingredients needed for preheating)
- [ ] Click "Next" to step 2
- [ ] Verify Step 2 shows "Mix butter, sugars, eggs, and vanilla until creamy."
- [ ] Check ingredients section shows 5 ingredients:
  - 1 cup butter, softened
  - 0.75 cup sugar
  - 0.75 cup brown sugar
  - 2 large eggs
  - 2 tsp vanilla extract

### Test 4: Spaghetti Carbonara
- [ ] Back to recipe list
- [ ] Open Spaghetti Carbonara recipe
- [ ] Verify Step 1 shows: "Bring large pot of salted water to boil."
- [ ] Check ingredients section shows: Salt for pasta water
- [ ] Click "Next" through steps
- [ ] Verify each step shows correct ingredients

### Test 5: Visual Design and Styling
- [ ] Verify "All Ingredients" section is clearly visible at top
- [ ] Check that "Ingredients for this step" has:
  - 🥘 icon in header
  - Bold header text
  - Blue color scheme matching step box
  - Top border separator
  - Proper spacing and padding
- [ ] Verify no ingredients section shows when array is empty

### Test 6: Navigation Controls
- [ ] Verify Previous/Next buttons still work correctly
- [ ] Check that step counter updates properly
- [ ] Verify completion message shows on last step
- [ ] Confirm Back to Recipes button works

## Expected Visual Result

Each step now displays in this format:
```
┌─────────────────────────────────────────┐
│ Step 1 of 8                  ⏱️ ~30 min │
├─────────────────────────────────────────┤
│                                         │
│ Marinate chicken in yogurt and half    │
│ the spices for 30 minutes.             │
│                                         │
├─────────────────────────────────────────┤
│ 🥘 Ingredients for this step:          │
│ • 800g chicken breast, cubed           │
│ • 1 cup plain yogurt                   │
│ • 1 tbsp tikka masala spice blend      │
└─────────────────────────────────────────┘
```

## Success Criteria

✅ Recipe data structure enhanced with ingredients per step
✅ Ingredients for current step display at bottom of step box
✅ Visual styling matches overall design
✅ No ingredients section when array is empty
✅ All recipes work correctly with new data structure
✅ Navigation between steps works properly
✅ All existing functionality preserved

## Troubleshooting

If issues occur, check:

1. **Data Structure**: Ensure each step has an `ingredients` array
2. **Rendering**: Verify ingredients section only shows when array has items
3. **Styling**: Confirm visual design matches specification
4. **Navigation**: Ensure all steps render correctly

## Diagnostic Commands

In browser console:

```javascript
// Check if recipe data has ingredients arrays
const recipes = /* recipe data */;
recipes.forEach(recipe => {
  console.log(`Recipe: ${recipe.name}`);
  recipe.steps.forEach((step, index) => {
    console.log(`  Step ${index + 1}: ${step.ingredients.length} ingredients`);
  });
});
```
