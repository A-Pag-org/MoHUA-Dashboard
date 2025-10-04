import '@testing-library/jest-dom';

// Mock matchMedia for MUI and other UI libs that use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Polyfill ResizeObserver for libraries like recharts' ResponsiveContainer
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-expect-error - jsdom doesn't have ResizeObserver
globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock;
