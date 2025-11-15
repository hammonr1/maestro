# Diagnostic Script for Button Hover Detection

Use this script in the browser console to diagnose why the buttons aren't being detected properly.

## Step 1: Check if buttons exist and their positioning

```javascript
// Check if the buttons exist in the DOM
const nextBtn = document.querySelector('[data-button-id="next-step"]');
const prevBtn = document.querySelector('[data-button-id="prev-step"]');

console.log('Next button exists:', !!nextBtn);
console.log('Previous button exists:', !!prevBtn);

if (nextBtn) {
  console.log('Next button rect:', nextBtn.getBoundingClientRect());
  console.log('Next button styles:', {
    pointerEvents: window.getComputedStyle(nextBtn).pointerEvents,
    zIndex: window.getComputedStyle(nextBtn).zIndex,
    position: window.getComputedStyle(nextBtn).position
  });
}

if (prevBtn) {
  console.log('Previous button rect:', prevBtn.getBoundingClientRect());
  console.log('Previous button styles:', {
    pointerEvents: window.getComputedStyle(prevBtn).pointerEvents,
    zIndex: window.getComputedStyle(prevBtn).zIndex,
    position: window.getComputedStyle(prevBtn).position
  });
}
```

## Step 2: Check what element is at a specific cursor position

```javascript
// Replace these coordinates with actual cursor position from console logs
// Look for "Hand position: X Y" in the console and use those values
const cursorX = 640; // Replace with actual X coordinate
const cursorY = 300; // Replace with actual Y coordinate

const elementAtCursor = document.elementFromPoint(cursorX, cursorY);
console.log('Element at cursor:', elementAtCursor);
console.log('Element tag:', elementAtCursor?.tagName);
console.log('Element data-button-id:', elementAtCursor?.getAttribute('data-button-id'));
console.log('Element pointer-events:', elementAtCursor ? window.getComputedStyle(elementAtCursor).pointerEvents : 'N/A');

// Check parent chain for data-button-id
let parent = elementAtCursor;
for (let i = 0; i < 5; i++) {
  if (!parent) break;
  console.log(`Parent ${i}:`, parent.tagName, parent.getAttribute('data-button-id'));
  parent = parent.parentElement;
}
```

## Step 3: Check button content and structure

```javascript
// Check if button content is interfering
const nextBtn = document.querySelector('[data-button-id="next-step"]');
if (nextBtn) {
  console.log('Next button children:', nextBtn.children);
  console.log('Next button child count:', nextBtn.children.length);
  
  // Check each child
  for (let i = 0; i < nextBtn.children.length; i++) {
    const child = nextBtn.children[i];
    console.log(`Child ${i}:`, child.tagName, child.getAttribute('data-button-id'));
    console.log(`Child ${i} pointer-events:`, window.getComputedStyle(child).pointerEvents);
  }
}
```

## Step 4: Test hover detection manually

```javascript
// Test getting elements at different points within the button area
const nextBtn = document.querySelector('[data-button-id="next-step"]');
if (nextBtn) {
  const rect = nextBtn.getBoundingClientRect();
  const testPoints = [
    { x: rect.left + rect.width/2, y: rect.top + rect.height/2 }, // Center
    { x: rect.left + 10, y: rect.top + 10 }, // Top-left
    { x: rect.right - 10, y: rect.bottom - 10 }, // Bottom-right
    { x: rect.left + rect.width/2, y: rect.top + 5 }, // Top-center
    { x: rect.left + rect.width/2, y: rect.bottom - 5 } // Bottom-center
  ];
  
  testPoints.forEach((point, index) => {
    const el = document.elementFromPoint(point.x, point.y);
    console.log(`Point ${index} (${point.x}, ${point.y}):`, el?.tagName, el?.getAttribute('data-button-id'));
  });
}
```

## Step 5: Force hover detection

```javascript
// You can also manually trigger the hover detection by simulating cursor position
// This would require modifying the App.tsx to expose the detection function
// But you can test what the App.tsx hover detection should find:

function testHoverDetection(x, y) {
  const element = document.elementFromPoint(x, y);
  if (element) {
    // First check for data-button-id
    let buttonId = element.getAttribute('data-button-id');
    
    // If not found, check parent elements (up to 5 levels)
    if (!buttonId) {
      let parent = element.parentElement;
      let levels = 0;
      while (parent && levels < 5) {
        buttonId = parent.getAttribute('data-button-id');
        if (buttonId) {
          break;
        }
        parent = parent.parentElement;
        levels++;
      }
    }
    
    // Also check for recipe-id (recipe cards)
    if (!buttonId) {
      const recipeId = element.getAttribute('data-recipe-id');
      if (recipeId) {
        buttonId = `recipe-${recipeId}`;
      } else {
        // Check parent for recipe-id
        let parent = element.parentElement;
        let levels = 0;
        while (parent && levels < 5) {
          const parentRecipeId = parent.getAttribute('data-recipe-id');
          if (parentRecipeId) {
            buttonId = `recipe-${parentRecipeId}`;
            break;
          }
          parent = parent.parentElement;
          levels++;
        }
      }
    }
    
    console.log('Hover detection result for', x, y, ':', buttonId || 'None');
    return buttonId;
  }
  return null;
}

// Use actual cursor coordinates from console logs
testHoverDetection(640, 300); // Replace with actual coordinates
```

## Common Issues to Look For:

1. **Button not in DOM**: Make sure buttons exist and are rendered
2. **Pointer events**: Check that buttons have `pointerEvents: "auto"`
3. **Z-index issues**: Make sure buttons are not behind other elements
4. **Parent container issues**: Check if parent has `pointerEvents: "none"`
5. **Content interference**: Make sure button content doesn't block detection
6. **Positioning**: Verify buttons are positioned where you think they are

Run these diagnostic commands in the browser console to identify the specific issue with button detection.
