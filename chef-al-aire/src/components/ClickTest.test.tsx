import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ClickTest } from './ClickTest';

// Mock Chakra UI's useColorModeValue hook
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorModeValue: jest.fn((light, dark) => light),
}));

describe('ClickTest', () => {
  const renderWithChakra = (component: React.ReactElement) => {
    return render(<ChakraProvider>{component}</ChakraProvider>);
  };

  test('renders with default label', () => {
    renderWithChakra(<ClickTest />);
    expect(screen.getByRole('button', { name: 'Click Test' })).toBeInTheDocument();
  });

  test('renders with custom label', () => {
    renderWithChakra(<ClickTest label="Custom Label" />);
    expect(screen.getByRole('button', { name: 'Custom Label' })).toBeInTheDocument();
  });

  test('has correct minimum dimensions', () => {
    renderWithChakra(<ClickTest />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('min-width: 150px');
    expect(button).toHaveStyle('min-height: 60px');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    renderWithChakra(<ClickTest onClick={handleClick} />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
