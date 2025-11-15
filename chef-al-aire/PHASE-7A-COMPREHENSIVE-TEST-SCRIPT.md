# Phase 7A Comprehensive Testing Script

This script will verify that all functionality for Recipe Detail View & Navigation works correctly.

## Test Categories

### 1. Basic Navigation
- [ ] Can navigate from test view to recipe list (Button 2)
- [ ] Can navigate from recipe list to recipe detail (click recipe card)
- [ ] Can navigate back from recipe detail to recipe list (Back button)
- [ ] Can navigate back from recipe list to test view (Back button)

### 2. Recipe Detail Display
- [ ] Recipe image displays at top
- [ ] Recipe name shows correctly
- [ ] Cuisine, rating, time, servings, difficulty visible
- [ ] All ingredients listed properly
- [ ] Step 1 displayed in blue box
- [ ] "Step 1 of X" badge shown
- [ ] Previous button disabled (on step 1)
- [ ] Next button enabled

### 3. Step Navigation - Gestures
- [ ] Hover over "Next" button → cursor turns blue
- [ ] Pinch "Next" → advances to step 2
- [ ] Step count updates: "Step 2 of X"
- [ ] Instruction text changes
- [ ] Previous button now enabled
- [ ] Can pinch "Previous" → back to step 1
- [ ] Can navigate through all steps

### 4. Step Navigation - Voice
- [ ] Enable voice (Button 1)
- [ ] Say "next" → advances to next step
- [ ] Toast shows: "Voice: Next Step"
- [ ] Say "back" → goes to previous step
- [ ] Toast shows: "Voice: Previous Step"
- [ ] On step 1, "back" returns to recipe list

### 5. Additional Voice Commands
- [ ] Say "next step" → advances to next step
- [ ] Say "continue" → advances to next step
- [ ] Say "previous" → goes to previous step
- [ ] Say "go back" → goes to previous step
- [ ] Say "list" → back to recipes
- [ ] Say "start over" → goes to step 1
- [ ] Say "restart" → goes to step 1

### 6. Back Navigation
- [ ] Click/pinch "Back to Recipes" button → returns to list
- [ ] Say "list" → returns to recipe list
- [ ] Recipe list still has search query (if any)
- [ ] Can click different recipe

### 7. Completion State
- [ ] Navigate to last step
- [ ] Next button disabled
- [ ] Completion message shows: "🎉 You've completed all steps!"
- [ ] Can go back to previous steps
- [ ] Can click "Back to Recipes"

### 8. Multiple Recipes
- [ ] Open Recipe 1 → displays correctly
- [ ] Back to list
- [ ] Open Recipe 2 → displays correctly
- [ ] Each recipe has correct steps
- [ ] Step counts are accurate

### 9. Edge Cases
- [ ] Can't click Next on last step
- [ ] Can't click Previous on first step
- [ ] Voice "next" on last step → no action
- [ ] Voice "back" on first step → goes to recipe list

### 10. Integration
- [ ] All gestures still work (pinch, dwell)
- [ ] Voice commands still work
- [ ] Can navigate: test → recipes → detail → back
- [ ] Camera feed and voice indicator visible
- [ ] No console errors
