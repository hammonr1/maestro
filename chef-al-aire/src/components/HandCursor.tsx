import { Box } from '@chakra-ui/react';

interface HandCursorProps {
  x: number;
  y: number;
  isGesturing: boolean;
  isHovering: boolean;
  dwellProgress?: number;
  isScrollMode?: boolean; // NEW
}

export default function HandCursor({ 
  x, 
  y, 
  isGesturing, 
  isHovering,
  dwellProgress = 0,
  isScrollMode = false
}: HandCursorProps) {
  // Color priority: scroll > pinch > hover > default
  const color = isScrollMode
    ? 'purple.500'  // Scroll mode (fist)
    : isGesturing 
      ? 'green.500' // Pinching
      : isHovering 
        ? 'blue.500'  // Over button
        : 'red.500';  // Default
  
  const showProgress = dwellProgress > 0 && dwellProgress < 100 && !isScrollMode;

  return (
    <Box
      position="fixed"
      left={`${x}px`}
      top={`${y}px`}
      transform="translate(-50%, -50%)"
      pointerEvents="none"
      zIndex={9999}
    >
      {/* Progress ring */}
      {showProgress && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="40px"
          height="40px"
          borderRadius="50%"
          border="3px solid"
          borderColor="blue.300"
          background={`conic-gradient(
            var(--chakra-colors-blue-500) ${dwellProgress}%,
            transparent ${dwellProgress}%
          )`}
          opacity={0.6}
          transition="none"
        />
      )}
      
      {/* Scroll mode indicator (arrows) */}
      {isScrollMode && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="24px"
          opacity={0.8}
        >
          ⬍
        </Box>
      )}
      
      {/* Main cursor dot */}
      <Box
        width="20px"
        height="20px"
        borderRadius="50%"
        bg={color}
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        transition="background-color 0.1s ease"
      />
    </Box>
  );
}
