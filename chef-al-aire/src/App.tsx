import { ChakraProvider, Box, useToast } from '@chakra-ui/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import HandCursor from './components/HandCursor';
import CameraFeed from './components/CameraFeed';
import VoiceIndicator from './components/VoiceIndicator';
import ScrollIndicator from './components/ScrollIndicator';
import RecipeSearchPage from './pages/RecipeSearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import Header from './components/Header';

function App() {
  // Hand tracking state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isGesturing, setIsGesturing] = useState(false);
  
  // Click interaction state
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [clickCooldown, setClickCooldown] = useState(false);

  // Dwell states
  const [dwellProgress, setDwellProgress] = useState(0);
  // Removed unused isDwelling state
  
  // Voice command state
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState<string | null>(null);
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'recipes' | 'recipeDetail' | 'saved'>('recipes');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Bookmark state (simulating saved recipes)
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<string[]>(['1', '3']); // Sample bookmarks
  
  // Scroll state
  const [isScrollMode, setIsScrollMode] = useState(false);
  const [scrollStartY, setScrollStartY] = useState<number | null>(null);
  
  // Scroll container ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const toast = useToast();

  // ============================================
  // DEFINE toggleVoice FIRST (before handleButtonClick uses it)
  // ============================================
  const toggleVoice = useCallback(() => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    
    console.log('🎤 Voice toggled:', newState ? 'ENABLED' : 'DISABLED');
    
    toast({
      title: newState ? 'Voice Enabled' : 'Voice Disabled',
      description: newState ? 'Say "next", "back", or "save"' : 'Click to re-enable',
      status: newState ? 'success' : 'warning',
      duration: 3000,
      position: 'top',
    });
  }, [isVoiceEnabled, toast]);

  // ============================================
  // NOW define handleButtonClick (can use toggleVoice)
  // ============================================
  const handleButtonClick = useCallback((buttonId: string) => {
    console.log('🎯 Button clicked:', buttonId);
    
    // Handle voice toggle specially
    if (buttonId === 'voice-toggle') {
      console.log('🎤 Toggling voice via gesture');
      toggleVoice();
      return;
    }
    
    // Handle recipe card clicks
    if (buttonId.startsWith('recipe-')) {
      const recipeId = buttonId.replace('recipe-', '');
      console.log('📖 Opening recipe:', recipeId);
      setSelectedRecipeId(recipeId);
      setCurrentView('recipeDetail');
      toast({
        title: 'Opening Recipe',
        status: 'info',
        duration: 2000,
      });
      return;
    }
    
    // Handle navigation button clicks for dwell-click functionality
    if (buttonId === "nav-recipes") {
      setCurrentView("recipes");
      setSearchQuery("");
      toast({ title: "Opening All Recipes", status: "info", duration: 1500 });
      return;
    }

    if (buttonId === "nav-saved") {
      setCurrentView("saved");
      toast({ title: "Opening Saved Recipes", status: "info", duration: 1500 });
      return;
    }
    
    // Handle back-to-recipes button
    if (buttonId === 'back-to-recipes') {
      console.log('🔙 Back to recipes');
      setCurrentView('recipes');
      setSelectedRecipeId(null);
      toast({
        title: 'Back to Recipe List',
        status: 'info',
        duration: 2000,
      });
      return;
    }
    
    // Handle step navigation buttons - trigger actual button click
    if (buttonId === 'next-step' || buttonId === 'prev-step') {
      console.log('📖 Step navigation button clicked:', buttonId);
      
      // Find and click the actual button element
      const button = document.querySelector(`[data-button-id="${buttonId}"]`) as HTMLButtonElement;
      if (button && !button.disabled) {
        button.click();
        console.log('✅ Triggered button click programmatically');
      }
      
      // Cooldown prevents double-clicks
      setClickCooldown(true);
      setTimeout(() => setClickCooldown(false), 500);
      return;
    }
    
    // Button 2 goes to recipes
    if (buttonId === '2') {
      setCurrentView('recipes');
      toast({
        title: 'Opening Recipe List',
        status: 'info',
        duration: 2000,
      });
      return;
    }
    
    // Button 1 goes to recipes (removed test view)
    if (buttonId === '1') {
      setCurrentView('recipes');
      toast({
        title: 'Opening Recipe List',
        status: 'info',
        duration: 2000,
      });
      return;
    }
    
    // Regular button clicks (Button 3, search buttons, etc.)
    toast({
      title: `Button ${buttonId} clicked!`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    
    // Cooldown prevents double-clicks
    setClickCooldown(true);
    setTimeout(() => setClickCooldown(false), 500);
  }, [toast, toggleVoice, setCurrentView, setSelectedRecipeId]);

  // Handle voice commands
  const handleVoiceCommand = useCallback((command: string) => {
    console.log('🎤 Executing voice command:', command);
    
    // Prevent voice commands during cooldown
    if (clickCooldown) {
      console.log('⚠️ Click cooldown active, ignoring voice command');
      return;
    }
    
    // Handle search commands
    if (command.startsWith('search:')) {
      const query = command.replace('search:', '').trim();
      setSearchQuery(query);
      setCurrentView('recipes');
      toast({
        title: `Searching for "${query}"`,
        status: 'info',
        duration: 2000,
      });
      return;
    }
    
    switch (command) {
      case 'list':
      case 'recipes':
        setCurrentView('recipes');
        setSearchQuery(''); // Clear search
        toast({
          title: 'Voice: All Recipes',
          status: 'info',
          duration: 2000,
        });
        break;
        
      case 'saved':
        setCurrentView('saved');
        toast({
          title: 'Voice: Saved Recipes',
          status: 'info',
          duration: 2000,
        });
        break;
        
      case 'back':
        if (currentView === 'recipeDetail') {
          // Trigger previous step OR back to recipes (if on step 1)
          const prevBtn = document.querySelector('[data-button-id="prev-step"]') as HTMLButtonElement;
          if (prevBtn && !prevBtn.disabled) {
            prevBtn.click();
            toast({
              title: 'Voice: Previous Step',
              status: 'info',
              duration: 1500,
            });
          } else {
            setCurrentView('recipes');
            setSelectedRecipeId(null);
          }
        } else if (currentView === 'recipes' || currentView === 'saved') {
          setCurrentView('recipes');
          setSearchQuery('');
        }
        break;
        
      case 'next':
        if (currentView === 'recipeDetail') {
          // Trigger next step
          const nextBtn = document.querySelector('[data-button-id="next-step"]') as HTMLButtonElement;
          if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
            toast({
              title: 'Voice: Next Step',
              status: 'info',
              duration: 1500,
            });
          }
        }
        break;
        
      case 'save':
        toast({
          title: 'Voice Command: Save',
          status: 'info',
          duration: 2000,
        });
        break;
        
      case 'settings':
        toast({
          title: 'Voice Command: Settings',
          status: 'info',
          duration: 2000,
        });
        break;
        
      case 'stop':
        setIsVoiceEnabled(false);
        toast({
          title: 'Voice commands disabled',
          status: 'warning',
          duration: 2000,
        });
        console.log('🎤 Voice commands stopped');
        break;
        
      case 'start over':
      case 'restart':
        if (currentView === 'recipeDetail') {
          // Go to step 1 by clicking previous until disabled
          const prevBtn = document.querySelector('[data-button-id="prev-step"]') as HTMLButtonElement;
          if (prevBtn) {
            // This is a simple approach - in a real app we'd have a better way to reset
            window.location.reload();
          }
        }
        break;
        
      case 'scroll':
      case 'scroll down':
        scrollContainerRef.current?.scrollBy({
          top: 300,
          behavior: 'smooth'
        });
        toast({
          title: 'Voice: Scroll Down',
          status: 'info',
          duration: 1000,
        });
        break;

      case 'scroll up':
      case 'up':
        scrollContainerRef.current?.scrollBy({
          top: -300,
          behavior: 'smooth'
        });
        toast({
          title: 'Voice: Scroll Up',
          status: 'info',
          duration: 1000,
        });
        break;

      case 'top':
        scrollContainerRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        toast({
          title: 'Voice: Scroll to Top',
          status: 'info',
          duration: 1000,
        });
        break;

      case 'bottom':
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
        toast({
          title: 'Voice: Scroll to Bottom',
          status: 'info',
          duration: 1000,
        });
        break;
        
      default:
        console.log('❌ Unknown command:', command);
        return;
    }
  }, [toast, clickCooldown, currentView, selectedRecipeId]);

  const handleRecipeClick = useCallback((recipeId: string) => {
    console.log('📖 Opening recipe:', recipeId);
    setSelectedRecipeId(recipeId);
    setCurrentView('recipeDetail');
  }, []);

  const handleBackToRecipes = useCallback(() => {
    setCurrentView('recipes');
    setSelectedRecipeId(null);
  }, []);
  
  const handleBookmarkToggle = useCallback((recipeId: string) => {
    setBookmarkedRecipes(prev => {
      if (prev.includes(recipeId)) {
        // Remove bookmark
        const filtered = prev.filter(id => id !== recipeId);
        console.log('❌ Removed bookmark:', recipeId);
        toast({
          title: 'Bookmark Removed',
          status: 'info',
          duration: 2000,
        });
        return filtered;
      } else {
        // Add bookmark
        console.log('⭐ Added bookmark:', recipeId);
        toast({
          title: 'Recipe Saved!',
          status: 'success',
          duration: 2000,
        });
        return [...prev, recipeId];
      }
    });
  }, [toast]);

  // Initialize hand tracking
  useEffect(() => {
    import('./services/handTrackingService').then(({ handTrackingService, onHandMove, onGesture }) => {
      onHandMove((x, y) => {
        setCursorPos({ x, y });
        console.log('Hand position:', x, y);
      });

      onGesture((state) => {
        if (state === 'scroll') {
          setIsGesturing(false);
          setIsScrollMode(true);
          console.log('Gesture state: SCROLL MODE');
        } else if (state === 'pinch') {
          setIsGesturing(true);
          setIsScrollMode(false);
          setScrollStartY(null);
          console.log('Gesture state: PINCHING');
        } else {
          setIsGesturing(false);
          setIsScrollMode(false);
          setScrollStartY(null);
          console.log('Gesture state: IDLE');
        }
      });

      (window as any).handTrackingService = handTrackingService;
    });

    return () => {
      import('./services/handTrackingService').then(({ stopHandTracking }) => {
        stopHandTracking();
      });
    };
  }, []);

  // Hover detection - enhanced for recipe cards
  useEffect(() => {
    const element = document.elementFromPoint(cursorPos.x, cursorPos.y);
    if (element) {
      // First check for data-button-id
      let buttonId = element.getAttribute('data-button-id');
      let targetElement = element;
      
      // If not found, check parent elements (up to 5 levels)
      if (!buttonId) {
        let parent = element.parentElement;
        let levels = 0;
        while (parent && levels < 5) {
          buttonId = parent.getAttribute('data-button-id');
          if (buttonId) {
            targetElement = parent;
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
          console.log('🎯 Found recipe card:', recipeId);
        } else {
          // Check parent for recipe-id
          let parent = element.parentElement;
          let levels = 0;
          while (parent && levels < 5) {
            const parentRecipeId = parent.getAttribute('data-recipe-id');
            if (parentRecipeId) {
              buttonId = `recipe-${parentRecipeId}`;
              targetElement = parent;
              console.log('🎯 Found recipe card in parent:', parentRecipeId);
              break;
            }
            parent = parent.parentElement;
            levels++;
          }
        }
      }
      
      if (buttonId) {
        setIsHovering(true);
        setHoveredButtonId(buttonId);
        console.log('🎯 Hovering over:', buttonId);
      } else {
        setIsHovering(false);
        setHoveredButtonId(null);
      }
    }
  }, [cursorPos]);

  // Dwell-to-click logic
  useEffect(() => {
    let dwellTimer: NodeJS.Timeout | null = null;
    let progressInterval: NodeJS.Timeout | null = null;
    
    const DWELL_DURATION = 1500;
    const PROGRESS_UPDATE_INTERVAL = 50;
    
    if (isHovering && hoveredButtonId && !clickCooldown && !isGesturing) {
      setDwellProgress(0);
      
      const startTime = Date.now();
      
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / DWELL_DURATION) * 100, 100);
        setDwellProgress(progress);
      }, PROGRESS_UPDATE_INTERVAL);
      
      dwellTimer = setTimeout(() => {
        console.log('⏱️ DWELL COMPLETE - Triggering click for button:', hoveredButtonId);
        handleButtonClick(hoveredButtonId);
        setDwellProgress(0);
      }, DWELL_DURATION);
      
      console.log('⏱️ Dwell timer started for button:', hoveredButtonId);
    } else {
      setDwellProgress(0);
    }
    
    return () => {
      if (dwellTimer) {
        clearTimeout(dwellTimer);
        console.log('⏱️ Dwell timer cleared');
      }
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isHovering, hoveredButtonId, clickCooldown, isGesturing, handleButtonClick]);

  // Pinch-to-click logic
  useEffect(() => {
    console.log('Click check:', { isGesturing, isHovering, hoveredButtonId, clickCooldown });
    
    if (isGesturing && isHovering && hoveredButtonId && !clickCooldown) {
      console.log('🚀 TRIGGERING CLICK for button:', hoveredButtonId);
      setDwellProgress(0);
      handleButtonClick(hoveredButtonId);
    }
  }, [isGesturing, isHovering, hoveredButtonId, clickCooldown, handleButtonClick]);

  // Scroll mode handling
  useEffect(() => {
    if (isScrollMode) {
      console.log('📜 Scroll mode active, cursor Y:', cursorPos.y, 'start Y:', scrollStartY);
      
      // Initialize scroll start position
      if (scrollStartY === null) {
        setScrollStartY(cursorPos.y);
        console.log('📜 Scroll mode activated at Y:', cursorPos.y);
        return;
      }
      
      // Calculate scroll delta
      const deltaY = scrollStartY - cursorPos.y;
      const scrollSensitivity = 3; // Adjust for faster/slower scrolling
      
      // Only scroll if delta is significant (reduces jitter)
      if (Math.abs(deltaY) > 3) {
        const scrollAmount = -deltaY * scrollSensitivity;
        
        console.log('📜 Scrolling by:', scrollAmount, 'pixels (delta:', deltaY, ')');
        
        // Use the scroll container ref instead of window
        scrollContainerRef.current?.scrollBy({
          top: scrollAmount,
          behavior: 'auto' // Instant, not smooth
        });
        
        // Update scroll start for next frame
        setScrollStartY(cursorPos.y);
      }
    } else {
      // Reset scroll state when not in scroll mode
      if (scrollStartY !== null) {
        console.log('📜 Exiting scroll mode');
        setScrollStartY(null);
      }
    }
  }, [isScrollMode, cursorPos.y, scrollStartY]);

  // Initialize voice commands
  useEffect(() => {
    if (!isVoiceEnabled) return;
    
    import('./services/voiceService').then(({ 
      startListening, 
      onCommand 
    }) => {
      onCommand((command) => {
        console.log('🎤 Voice command received:', command);
        setLastVoiceCommand(command);
        handleVoiceCommand(command);
        
        setTimeout(() => setLastVoiceCommand(null), 3000);
      });
      
      startListening();
      setIsListening(true);
      console.log('🎤 Voice recognition started');
    });
    
    return () => {
      if (isVoiceEnabled) {
        import('./services/voiceService').then(({ stopListening }) => {
          stopListening();
          setIsListening(false);
        });
      }
    };
  }, [isVoiceEnabled, handleVoiceCommand]);

  return (
    <ChakraProvider>
      <Box width="100vw" height="100vh" position="relative" overflow="hidden">
        {/* Main content */}
        <Box 
          ref={scrollContainerRef}
          width="100%" 
          height="100%" 
          bg="gray.50"
          overflowY="auto"
        >
          {/* Header - Always visible */}
          {currentView !== 'recipeDetail' && (
            <Header
              currentView={currentView}
              onNavigate={(view) => {
                setCurrentView(view);
                if (view === 'recipes') setSearchQuery('');
              }}
              savedCount={bookmarkedRecipes.length}
            />
          )}
          
          {/* Page Content */}
          {currentView === 'recipes' ? (
            <RecipeSearchPage 
              onRecipeClick={handleRecipeClick}
              bookmarkedRecipes={bookmarkedRecipes}
              onBookmarkToggle={handleBookmarkToggle}
              initialSearchQuery={searchQuery}
            />
          ) : currentView === 'saved' ? (
            <SavedRecipesPage 
              onRecipeClick={handleRecipeClick}
              onBack={() => setCurrentView('recipes')}
            />
          ) : (
            <RecipeDetailPage 
              recipeId={selectedRecipeId!} 
              onBack={() => setCurrentView('recipes')}
              isBookmarked={bookmarkedRecipes.includes(selectedRecipeId!)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          )}
        </Box>

        {/* Overlays - same as before */}
        <HandCursor
          x={cursorPos.x}
          y={cursorPos.y}
          isGesturing={isGesturing}
          isHovering={isHovering}
          dwellProgress={dwellProgress}
          isScrollMode={isScrollMode}
        />
        
        <ScrollIndicator isScrollMode={isScrollMode} />

        {/* Camera feed */}
        <CameraFeed />
        
        {/* Voice indicator */}
        <VoiceIndicator
          isListening={isListening}
          lastCommand={lastVoiceCommand}
          isEnabled={isVoiceEnabled}
          onToggle={toggleVoice}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
