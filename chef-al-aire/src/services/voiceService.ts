// State variables
let isListeningState = false;
let commandCallback: ((command: string) => void) | null = null;
let lastCommand: { command: string; timestamp: number } | null = null;

// Search mode variables
let isSearchMode = false;
let searchCallback: ((query: string) => void) | null = null;

// Initialize Speech Recognition API with cross-browser support
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

let recognition: any = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  // Handle recognition results
  recognition.onresult = (event: any) => {
    const last = event.results.length - 1;
    const transcript = event.results[last][0].transcript;
    const confidence = event.results[last][0].confidence;
    
    console.log('🎤 RAW TRANSCRIPT:', transcript);
    console.log('🎤 CONFIDENCE:', confidence);
    
    if (confidence >= 0.7) {
      // If in search mode, send transcript directly to search
      if (isSearchMode && searchCallback) {
        const cleanedQuery = transcript.trim();
        console.log('🔍 Search query:', cleanedQuery);
        searchCallback(cleanedQuery);
        return; // Don't process as command
      }
      
      // Otherwise, process as command
      const command = matchCommand(transcript);
      console.log('🎤 MATCHED COMMAND:', command);
      
      if (command) {
        console.log('✅ Command recognized:', command);
        if (commandCallback) {
          commandCallback(command);
        }
        lastCommand = { command, timestamp: Date.now() };
      } else {
        console.log('❌ No command matched for:', transcript);
      }
    } else {
      console.log('⚠️ Low confidence, ignoring');
    }
  };
  
  // Handle recognition errors
  recognition.onerror = (event: any) => {
    console.error('🎤 Speech recognition error:', event.error);
    
    // Auto-restart on specific errors
    if (event.error === 'no-speech' || event.error === 'audio-capture') {
      console.log('🎤 Auto-restarting recognition...');
      setTimeout(() => {
        if (isListeningState) {
          try {
            recognition.start();
          } catch (e) {
            console.error('🎤 Failed to restart recognition:', e);
          }
        }
      }, 1000);
    }
  };
  
  // Auto-restart when recognition ends
  recognition.onend = () => {
    console.log('🎤 Recognition ended');
    if (isListeningState) {
      console.log('🎤 Auto-restarting...');
      setTimeout(() => {
        if (isListeningState) {
          try {
            recognition.start();
          } catch (e) {
            console.error('🎤 Failed to restart recognition:', e);
          }
        }
      }, 100);
    }
  };
}

// Command matching function
function matchCommand(transcript: string): string | null {
  const lower = transcript.toLowerCase().trim();
  
  console.log('🎤 Matching transcript:', lower);
  
  // Search commands - check for trigger phrases first
  const searchTriggers = ['search for ', 'search ', 'find ', 'look up '];
  for (const trigger of searchTriggers) {
    if (lower.startsWith(trigger)) {
      const query = lower.substring(trigger.length).trim();
      if (query) {
        return `search:${query}`;
      }
    }
  }
  
  // Exact matches first
  if (lower === 'next' || lower === 'next step') return 'next';
  if (lower === 'back' || lower === 'previous' || lower === 'go back') return 'back';
  if (lower === 'list' || lower === 'recipes' || lower === 'show recipes') return 'list';
  if (lower === 'save' || lower === 'bookmark' || lower === 'favorite') return 'save';
  if (lower === 'saved' || lower === 'favorites' || lower === 'my recipes') return 'saved';
  if (lower === 'settings') return 'settings';
  if (lower === 'stop' || lower === 'disable voice') return 'stop';
  
  // Scroll commands
  if (lower.includes('scroll down') || lower === 'scroll') return 'scroll';
  if (lower.includes('scroll up') || lower === 'up') return 'scroll up';
  if (lower === 'top') return 'top';
  if (lower === 'bottom') return 'bottom';
  
  // Recipe search - if not a command, treat as search query
  // Check if it contains recipe-related words
  if (lower.includes('cookie') || 
      lower.includes('pasta') || 
      lower.includes('carbonara') ||
      lower.includes('chicken') || 
      lower.includes('tikka') || 
      lower.includes('masala') ||
      lower.includes('chocolate') ||
      lower.includes('spaghetti') ||
      lower.includes('italian') ||
      lower.includes('indian') ||
      lower.includes('american') ||
      lower.includes('taco') ||
      lower.includes('ramen') ||
      lower.includes('lemon') ||
      lower.includes('bar') ||
      lower.includes('spicy')) {
    return `search:${lower}`;
  }
  
  return null;
}

// Export functions
export function startListening(): void {
  if (!recognition) {
    console.error('🎤 Speech recognition not supported in this browser');
    return;
  }
  
  if (!isListeningState) {
    try {
      recognition.start();
      isListeningState = true;
      console.log('🎤 Voice recognition started');
    } catch (error) {
      console.error('🎤 Failed to start voice recognition:', error);
    }
  }
}

export function stopListening(): void {
  if (!recognition) return;
  
  if (isListeningState) {
    try {
      recognition.stop();
      isListeningState = false;
      console.log('🎤 Voice recognition stopped');
    } catch (error) {
      console.error('🎤 Failed to stop voice recognition:', error);
    }
  }
}

export function onCommand(callback: (command: string) => void): void {
  commandCallback = callback;
}

export function getLastCommand(): { command: string; timestamp: number } | null {
  return lastCommand;
}

export function isListening(): boolean {
  return isListeningState;
}

// Enable/disable search mode
export function enableSearchMode(enabled: boolean): void {
  isSearchMode = enabled;
  console.log('🎤 Search mode:', enabled ? 'ENABLED' : 'DISABLED');
}

// Register search callback
export function onSearchQuery(callback: (query: string) => void): void {
  searchCallback = callback;
}
