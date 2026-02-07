import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Label } from "@/components/ui/label";
import { createRef } from "react";

describe("Label", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Label>Username</Label>);
      expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Label>Email Address</Label>);
      expect(screen.getByText("Email Address")).toBeInTheDocument();
    });

    it("sets data-slot attribute to 'label'", () => {
      render(<Label data-testid="label">Test</Label>);
      expect(screen.getByTestId("label")).toHaveAttribute("data-slot", "label");
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(<Label data-testid="label" className="text-red-500">Test</Label>);
      const label = screen.getByTestId("label");
      expect(label.className).toContain("text-red-500");
      expect(label.className).toContain("text-sm");
    });

    it("allows overriding default classes", () => {
      render(<Label data-testid="label" className="text-lg">Test</Label>);
      const label = screen.getByTestId("label");
      expect(label.className).toContain("text-lg");
    });
  });

  describe("props", () => {
    it("passes htmlFor attribute", () => {
      render(<Label htmlFor="my-input">Input Label</Label>);
      const label = screen.getByText("Input Label");
      expect(label).toHaveAttribute("for", "my-input");
    });

    it("passes additional HTML attributes", () => {
      render(
        <Label data-testid="label" id="my-label" aria-hidden="true">
          Hidden Label
        </Label>
      );
      const label = screen.getByTestId("label");
      expect(label).toHaveAttribute("id", "my-label");
      expect(label).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("association with input", () => {
    it("associates with input element via htmlFor", () => {
      render(
        <>
          <Label htmlFor="test-input">Test Label</Label>
          <input id="test-input" />
        </>
      );
      const input = screen.getByLabelText("Test Label");
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
    });
  });

  describe("accessibility", () => {
    it("renders as a label element (via Radix)", () => {
      render(<Label data-testid="label">Test</Label>);
      const el = screen.getByTestId("label");
      expect(el.tagName).toBe("LABEL");
    });

    it("supports aria attributes", () => {
      render(<Label data-testid="label" aria-describedby="desc">Test</Label>);
      expect(screen.getByTestId("label")).toHaveAttribute("aria-describedby", "desc");
    });
  });
});
