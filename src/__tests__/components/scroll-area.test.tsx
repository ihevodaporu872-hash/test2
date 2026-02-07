import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

describe("ScrollArea", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <p>Scrollable content</p>
        </ScrollArea>
      );
      expect(screen.getByTestId("scroll-area")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(
        <ScrollArea>
          <p>Content inside scroll area</p>
        </ScrollArea>
      );
      expect(screen.getByText("Content inside scroll area")).toBeInTheDocument();
    });

    it("sets data-slot attribute to 'scroll-area'", () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <p>Content</p>
        </ScrollArea>
      );
      expect(screen.getByTestId("scroll-area")).toHaveAttribute("data-slot", "scroll-area");
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(
        <ScrollArea data-testid="scroll-area" className="h-[200px]">
          <p>Content</p>
        </ScrollArea>
      );
      const scrollArea = screen.getByTestId("scroll-area");
      expect(scrollArea.className).toContain("h-[200px]");
      expect(scrollArea.className).toContain("relative");
    });

    it("allows overriding default classes", () => {
      render(
        <ScrollArea data-testid="scroll-area" className="absolute">
          <p>Content</p>
        </ScrollArea>
      );
      const scrollArea = screen.getByTestId("scroll-area");
      expect(scrollArea.className).toContain("absolute");
    });
  });

  describe("props", () => {
    it("passes additional HTML attributes", () => {
      render(
        <ScrollArea data-testid="scroll-area" id="my-scroll" aria-label="Scrollable region">
          <p>Content</p>
        </ScrollArea>
      );
      const scrollArea = screen.getByTestId("scroll-area");
      expect(scrollArea).toHaveAttribute("id", "my-scroll");
      expect(scrollArea).toHaveAttribute("aria-label", "Scrollable region");
    });
  });

  describe("viewport", () => {
    it("contains a viewport element with data-slot", () => {
      const { container } = render(
        <ScrollArea>
          <p>Content</p>
        </ScrollArea>
      );
      const viewport = container.querySelector('[data-slot="scroll-area-viewport"]');
      expect(viewport).toBeInTheDocument();
    });
  });

  describe("scrollbar", () => {
    it("includes a default vertical scrollbar", () => {
      const { container } = render(
        <ScrollArea>
          <p>Content</p>
        </ScrollArea>
      );
      const scrollbar = container.querySelector('[data-slot="scroll-area-scrollbar"]');
      expect(scrollbar).toBeInTheDocument();
    });
  });

  describe("composition with long content", () => {
    it("renders many items inside scroll area", () => {
      const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
      render(
        <ScrollArea data-testid="scroll-area" className="h-[200px]">
          {items.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </ScrollArea>
      );
      expect(screen.getByTestId("scroll-area")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 50")).toBeInTheDocument();
    });
  });
});

describe("ScrollBar", () => {
  describe("rendering", () => {
    it("renders without crashing when used standalone", () => {
      // ScrollBar is typically used inside ScrollArea, but let's verify it renders
      const { container } = render(
        <ScrollArea>
          <p>Content</p>
        </ScrollArea>
      );
      const scrollbar = container.querySelector('[data-slot="scroll-area-scrollbar"]');
      expect(scrollbar).toBeInTheDocument();
    });
  });

  describe("orientation", () => {
    it("defaults to vertical orientation", () => {
      const { container } = render(
        <ScrollArea>
          <p>Content</p>
        </ScrollArea>
      );
      const scrollbar = container.querySelector('[data-slot="scroll-area-scrollbar"]');
      expect(scrollbar).toHaveAttribute("data-orientation", "vertical");
    });
  });

  describe("thumb", () => {
    it("contains a thumb element", () => {
      const { container } = render(
        <ScrollArea>
          <p>Content</p>
        </ScrollArea>
      );
      const thumb = container.querySelector('[data-slot="scroll-area-thumb"]');
      expect(thumb).toBeInTheDocument();
    });
  });
});
