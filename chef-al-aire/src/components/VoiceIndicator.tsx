import { Box, VStack, Text } from '@chakra-ui/react';

interface VoiceIndicatorProps {
  isListening: boolean;
  lastCommand: string | null;
  isEnabled: boolean;
  onToggle: () => void;
}

export default function VoiceIndicator({
  isListening,
  lastCommand,
  isEnabled,
  onToggle,
}: VoiceIndicatorProps) {
  return (
    <Box
      data-button-id="voice-toggle"
      position="fixed"
      bottom="20px"
      left="20px"
      bg={isListening ? 'green.500' : 'gray.600'}
      color="white"
      p={6}  // Increased from 4
      borderRadius="xl"
      cursor="pointer"
      onClick={onToggle}
      transition="all 0.3s"
      _hover={{ 
        transform: 'scale(1.05)',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)'
      }}
      boxShadow="xl"
      minWidth="140px"  // Increased from 100px
      minHeight="140px"  // Added for square shape
      textAlign="center"
      zIndex={9998}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={2}>
        {/* Microphone icon - LARGER */}
        <Box
          fontSize="48px"  // Increased from 32px
          animation={isListening ? 'pulse 2s infinite' : 'none'}
          sx={{
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.6, transform: 'scale(1.1)' },
            },
          }}
        >
          🎤
        </Box>
        
        {/* Status text */}
        <Text fontSize="md" fontWeight="bold">
          {isListening ? 'Listening' : 'Voice Off'}
        </Text>
        
        {/* Last command */}
        {lastCommand && isListening && (
          <Text fontSize="xs" opacity={0.8} noOfLines={1}>
            "{lastCommand}"
          </Text>
        )}
        
        {/* Hint text when off */}
        {!isEnabled && (
          <Text fontSize="xs" opacity={0.7}>
            Click to enable
          </Text>
        )}
      </VStack>
    </Box>
  );
}
