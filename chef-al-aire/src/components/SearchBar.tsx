import { Box, Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onVoiceSearch?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onVoiceSearch,
  placeholder = 'Search recipes...',
}: SearchBarProps) {
  return (
    <Box width="100%" maxWidth="800px" mx="auto">
      <InputGroup size="lg">
        {/* Search emoji icon */}
        <InputLeftElement 
          pointerEvents="none"
          height="60px"
          fontSize="24px"
        >
          🔍
        </InputLeftElement>
        
        {/* Search input */}
        <Input
          data-button-id="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          height="60px"
          fontSize="20px"
          bg="white"
          border="2px solid"
          borderColor="gray.300"
          _hover={{ borderColor: 'blue.400' }}
          _focus={{ 
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
          }}
          paddingLeft="50px"
          paddingRight={value || onVoiceSearch ? '100px' : '50px'}
        />
        
        {/* Right side buttons */}
        <InputRightElement 
          height="60px" 
          width="auto"
          paddingRight="10px"
          display="flex"
          gap={2}
        >
          {/* Voice search button (if provided) */}
          {onVoiceSearch && (
            <IconButton
              data-button-id="voice-search-btn"
              aria-label="Voice search"
              icon={<Box fontSize="24px">🎤</Box>}
              onClick={onVoiceSearch}
              size="md"
              colorScheme="blue"
              variant="ghost"
              _hover={{ bg: 'blue.50' }}
            />
          )}
          
          {/* Clear button (if has value) */}
          {value && (
            <IconButton
              data-button-id="search-clear"
              aria-label="Clear search"
              icon={<Box fontSize="20px">❌</Box>}
              onClick={() => onChange('')}
              size="md"
              colorScheme="gray"
              variant="ghost"
              _hover={{ bg: 'gray.100' }}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
