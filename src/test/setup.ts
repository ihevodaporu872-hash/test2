import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't implement ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom doesn't implement PointerEvent
global.PointerEvent = class PointerEvent extends MouseEvent {
  constructor(type: string, props?: PointerEventInit) {
    super(type, props);
  }
} as any;

// jsdom doesn't implement scrollIntoView
HTMLElement.prototype.scrollIntoView = vi.fn();

// jsdom doesn't implement pointer capture methods
HTMLElement.prototype.hasPointerCapture = vi.fn();
HTMLElement.prototype.releasePointerCapture = vi.fn();
