import { useEffect, useRef, useState } from 'react';
import { Box, Text, Badge, VStack, Progress } from '@chakra-ui/react';
import { initHandTracking, stopHandTracking, onClickDetected, handTrackingService } from '../services/handTrackingService';

interface CameraFeedProps {
  onTrackingReady?: () => void;
}

export default function CameraFeed({ onTrackingReady }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'initializing' | 'active' | 'error'>('initializing');
  const [errorMessage, setErrorMessage] = useState('');
  const [dwellProgress, setDwellProgress] = useState(0);

  useEffect(() => {
    async function setupCamera() {
      if (!videoRef.current) return;

      console.log('📹 Setting up camera...');
      setStatus('initializing');

      try {
        // Initialize hand tracking
        const success = await initHandTracking(videoRef.current);
        
        if (success) {
          setStatus('active');
          console.log('✅ Camera active and tracking');
          onTrackingReady?.();
        } else {
          throw new Error('Hand tracking initialization failed');
        }
      } catch (error) {
        console.error('❌ Camera setup error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      }
    }

    // Register click detection callback to update dwell progress
    onClickDetected((state) => {
      setDwellProgress(state.dwellProgress);
    });

    // Attach handTrackingService to window for external access
    (window as any).handTrackingService = handTrackingService;

    setupCamera();

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up camera...');
      stopHandTracking();
    };
  }, [onTrackingReady]);

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      zIndex={1000}
      bg="white"
      borderRadius="lg"
      boxShadow="xl"
      p={2}
      border="2px solid"
      borderColor={status === 'active' ? 'green.500' : status === 'error' ? 'red.500' : 'gray.400'}
      maxWidth="220px"
    >
      <VStack spacing={2} align="stretch">
        {/* Status Badge */}
        <Badge
          colorScheme={status === 'active' ? 'green' : status === 'error' ? 'red' : 'gray'}
          fontSize="xs"
          textAlign="center"
        >
          {status === 'initializing' && '⏳ Initializing...'}
          {status === 'active' && '✅ Tracking Active'}
          {status === 'error' && '❌ Error'}
        </Badge>

        {/* Video Feed */}
        <Box
          position="relative"
          width="200px"
          height="150px"
          bg="black"
          borderRadius="md"
          overflow="hidden"
        >
          <video
            ref={videoRef}
            width="200"
            height="150"
            autoPlay
            playsInline
            style={{
              transform: 'scaleX(-1)', // Mirror the video
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Overlay text for errors */}
          {status === 'error' && (
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="blackAlpha.700"
              p={2}
            >
              <Text color="white" fontSize="xs" textAlign="center">
                {errorMessage}
              </Text>
            </Box>
          )}
        </Box>

        {/* Dwell Progress Bar */}
        {status === 'active' && (
          <Box>
            <Text fontSize="xs" color="gray.600" textAlign="center" mb={1}>
              Dwell Progress
            </Text>
            <Progress 
              value={dwellProgress} 
              size="sm" 
              colorScheme="blue" 
              borderRadius="full"
              isAnimated
            />
          </Box>
        )}

        {/* Instructions */}
        <Text fontSize="xs" color="gray.600" textAlign="center">
          👋 Hand Gestures
        </Text>
      </VStack>
    </Box>
  );
}
