// TypeScript type definitions
export interface HandPosition {
  x: number;
  y: number;
}

export interface GestureState {
  twoFingerTouch: boolean;
  dwellProgress: number;
}

export type { VoiceCommand } from './voice';
