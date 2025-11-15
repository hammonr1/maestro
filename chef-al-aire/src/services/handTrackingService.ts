import { Hands, type Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

// Types
interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

interface ClickState {
  clicked: boolean;
  method?: 'gesture' | 'dwell';
  dwellProgress: number;
  twoFingerActive: boolean;
}

// Gesture state
type GestureState = 'pinch' | 'scroll' | 'none';

// Service state
let handsInstance: Hands | null = null;
let cameraInstance: Camera | null = null;
let videoElement: HTMLVideoElement | null = null;

// Scroll mode state
let isScrollMode = false;

// Callbacks
let onHandMoveCallback: ((x: number, y: number) => void) | null = null;
let onClickCallback: ((state: ClickState) => void) | null = null;
let onGestureCallback: ((state: GestureState) => void) | null = null;

// Smoothing
let smoothedX = 0;
let smoothedY = 0;
const SMOOTHING = 0.3;

// Gesture state
const gestureDebounce = { twoFinger: false, pinch: false };

// Dwell state
const dwellState = {
  currentTarget: null as HTMLElement | null,
  startTime: null as number | null,
  DWELL_DURATION: 1500,
  progressPercentage: 0
};

// Initialize MediaPipe Hands
export async function initHandTracking(video: HTMLVideoElement): Promise<boolean> {
  console.log('🎬 Initializing hand tracking...');
  videoElement = video;
  
  try {
    handsInstance = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });
    
    handsInstance.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    
    handsInstance.onResults(onHandResults);
    
    cameraInstance = new Camera(videoElement, {
      onFrame: async () => {
        if (handsInstance && videoElement) {
          await handsInstance.send({ image: videoElement });
        }
      },
      width: 640,
      height: 480
    });
    
    await cameraInstance.start();
    console.log('✅ Hand tracking initialized');
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
}

function onHandResults(results: Results) {
  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
    // No hand detected, notify gesture callback if exists
    if (onGestureCallback) {
      onGestureCallback('none');
    }
    return; // No hand detected
  }
  
  const landmarks = results.multiHandLandmarks[0];
  const indexTip = landmarks[8]; // Index finger tip
  
  // Map to screen coordinates (flipped for natural feel)
  const targetX = (1 - indexTip.x) * window.innerWidth;
  const targetY = indexTip.y * window.innerHeight;
  
  // Apply smoothing
  smoothedX += (targetX - smoothedX) * SMOOTHING;
  smoothedY += (targetY - smoothedY) * SMOOTHING;
  
  // Notify cursor position callback
  if (onHandMoveCallback) {
    onHandMoveCallback(smoothedX, smoothedY);
  }
  
  // Detect gestures
  const gestureState = detectGesture(landmarks);
  if (onGestureCallback) {
    onGestureCallback(gestureState);
  }
  
  // Detect clicks
  const clickState = detectClick(landmarks, smoothedX, smoothedY);
  if (onClickCallback) {
    onClickCallback(clickState);
  }
}

// Implement pinch detection using landmarks 4 (thumb tip) and 8 (index finger tip)
function detectPinch(landmarks: HandLandmark[]): boolean {
  // Check if we have the required landmarks
  if (!landmarks || landmarks.length <= 8 || !landmarks[4] || !landmarks[8]) {
    return false;
  }
  
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  
  // Convert normalized coordinates to screen pixels
  const thumbX = thumbTip.x * window.innerWidth;
  const thumbY = thumbTip.y * window.innerHeight;
  const indexX = indexTip.x * window.innerWidth;
  const indexY = indexTip.y * window.innerHeight;
  
  // Calculate Euclidean distance between thumb and index finger tips
  const dx = thumbX - indexX;
  const dy = thumbY - indexY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Debug logging
  console.log(`Pinch detection - Distance: ${distance.toFixed(2)}px, Threshold: 50px`);
  
  // Use 50 pixels as threshold for pinch detection
  return distance < 50;
}

// Detect fist gesture (all fingers curled)
function detectFist(landmarks: HandLandmark[]): boolean {
  // Check if we have enough landmarks
  if (!landmarks || landmarks.length < 21) {
    return false;
  }
  
  // Check if all fingertips are below their respective middle joints
  const fingerTips = [8, 12, 16, 20]; // Index, Middle, Ring, Pinky tips
  const fingerMiddles = [6, 10, 14, 18]; // Corresponding middle joints
  
  let allCurled = true;
  for (let i = 0; i < fingerTips.length; i++) {
    const tip = landmarks[fingerTips[i]];
    const middle = landmarks[fingerMiddles[i]];
    // If tip is above middle (higher Y = lower on screen), finger is extended
    if (tip.y < middle.y) {
      allCurled = false;
      break;
    }
  }
  
  // Also check thumb is curled (thumb tip below thumb base)
  const thumbTip = landmarks[4];
  const thumbBase = landmarks[2];
  const thumbCurled = thumbTip.x < thumbBase.x + 0.05; // Thumb curled inward
  
  return allCurled && thumbCurled;
}

function detectGesture(landmarks: HandLandmark[]): GestureState {
  const isFist = detectFist(landmarks);
  const isPinch = detectPinch(landmarks);
  
  // Prioritize gestures: fist → pinch → none
  if (isFist) {
    console.log('🔄 Fist gesture detected - Scroll mode!');
    isScrollMode = true;
    return 'scroll';
  } else if (isPinch && !gestureDebounce.pinch) {
    console.log('🎉 Pinch gesture detected!');
    gestureDebounce.pinch = true;
    isScrollMode = false;
    setTimeout(() => { gestureDebounce.pinch = false; }, 300); // Debounce for 300ms
    return 'pinch';
  } else if (!isFist && !isPinch) {
    isScrollMode = false;
    return 'none';
  }
  
  // Maintain current state if no definitive gesture
  return isScrollMode ? 'scroll' : 'none';
}

function detectTwoFingerTouch(landmarks: any[]): boolean {
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  
  const dx = indexTip.x - middleTip.x;
  const dy = indexTip.y - middleTip.y;
  const dz = indexTip.z - middleTip.z;
  const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
  
  return distance < 0.04;
}

function checkDwellClick(cursorX: number, cursorY: number) {
  const elements = document.querySelectorAll('[data-clickable="true"]');
  let hoveredElement: HTMLElement | null = null;
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i] as HTMLElement;
    const rect = el.getBoundingClientRect();
    if (cursorX >= rect.left && cursorX <= rect.right && 
        cursorY >= rect.top && cursorY <= rect.bottom) {
      hoveredElement = el;
      break;
    }
  }
  
  if (hoveredElement) {
    if (hoveredElement === dwellState.currentTarget) {
      const elapsed = Date.now() - dwellState.startTime!;
      dwellState.progressPercentage = (elapsed / dwellState.DWELL_DURATION) * 100;
      
      if (elapsed >= dwellState.DWELL_DURATION) {
        dwellState.currentTarget = null;
        dwellState.progressPercentage = 0;
        return { clicked: true };
      }
    } else {
      dwellState.currentTarget = hoveredElement;
      dwellState.startTime = Date.now();
      dwellState.progressPercentage = 0;
    }
  } else {
    dwellState.currentTarget = null;
    dwellState.progressPercentage = 0;
  }
  
  return { clicked: false };
}

function detectClick(landmarks: HandLandmark[], cursorX: number, cursorY: number): ClickState {
  const isTwoFingerTouch = detectTwoFingerTouch(landmarks);
  
  let clickState: ClickState = {
    clicked: false,
    dwellProgress: dwellState.progressPercentage,
    twoFingerActive: isTwoFingerTouch
  };
  
  // Two-finger check (from previous step)
  if (isTwoFingerTouch && !gestureDebounce.twoFinger) {
    const elements = document.querySelectorAll('[data-clickable="true"]');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      const rect = el.getBoundingClientRect();
      
      if (cursorX >= rect.left && cursorX <= rect.right && 
          cursorY >= rect.top && cursorY <= rect.bottom) {
        clickState.clicked = true;
        clickState.method = 'gesture';
        
        // Dispatch custom event for click detection
        const clickEvent = new CustomEvent('handClick', {
          detail: { method: 'gesture', element: el }
        });
        window.dispatchEvent(clickEvent);
        
        // Trigger actual click on the element
        el.click();
        
        gestureDebounce.twoFinger = true;
        setTimeout(() => { gestureDebounce.twoFinger = false; }, 500);
        break;
      }
    }
  }
  
  // Dwell check (NEW)
  if (!clickState.clicked) {
    const dwellResult = checkDwellClick(cursorX, cursorY);
    if (dwellResult.clicked) {
      clickState.clicked = true;
      clickState.method = 'dwell';
      
      // Dispatch custom event for dwell click
      if (dwellState.currentTarget) {
        const clickEvent = new CustomEvent('handClick', {
          detail: { method: 'dwell', element: dwellState.currentTarget }
        });
        window.dispatchEvent(clickEvent);
        
        // Trigger actual click on the element
        dwellState.currentTarget.click();
      }
    } else {
      clickState.dwellProgress = dwellState.progressPercentage;
    }
  }
  
  return clickState;
}

export function onHandMove(callback: (x: number, y: number) => void) {
  onHandMoveCallback = callback;
}

export function onClickDetected(callback: (state: ClickState) => void) {
  onClickCallback = callback;
}

export function onGesture(callback: (state: GestureState) => void) {
  onGestureCallback = callback;
}

export function stopHandTracking() {
  if (cameraInstance) cameraInstance.stop();
  if (handsInstance) handsInstance.close();
}

// Export scroll mode state
export function isInScrollMode(): boolean {
  return isScrollMode;
}

// Create a service object that can be attached to window for external access
export const handTrackingService = {
  initHandTracking,
  stopHandTracking,
  onHandMove,
  onClickDetected,
  onGesture
};

export type { ClickState, HandLandmark, GestureState };
