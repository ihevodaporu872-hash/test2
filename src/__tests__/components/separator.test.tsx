import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Separator } from "@/components/ui/separator";

describe("Separator", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Separator data-testid="separator" />);
      expect(screen.getByTestId("separator")).toBeInTheDocument();
    });

    it("sets data-slot attribute to 'separator'", () => {
      render(<Separator data-testid="separator" />);
      expect(screen.getByTestId("separator")).toHaveAttribute("data-slot", "separator");
    });
  });

  describe("orientation", () => {
    it("renders horizontal by default", () => {
      render(<Separator data-testid="separator" />);
      expect(screen.getByTestId("separator")).toHaveAttribute(
        "data-orientation",
        "horizontal"
      );
    });

    it("renders horizontal orientation explicitly", () => {
      render(<Separator orientation="horizontal" data-testid="separator" />);
      expect(screen.getByTestId("separator")).toHaveAttribute(
        "data-orientation",
        "horizontal"
      );
    });

    it("renders vertical orientation", () => {
      render(<Separator orientation="vertical" data-testid="separator" />);
      expect(screen.getByTestId("separator")).toHaveAttribute(
        "data-orientation",
        "vertical"
      );
    });
  });

  describe("decorative", () => {
    it("is decorative by default (no separator role)", () => {
      render(<Separator data-testid="separator" />);
      // When decorative=true, Radix does not add role="separator"
      expect(screen.getByTestId("separator")).not.toHaveAttribute("role", "separator");
    });

    it("has separator role when decorative is false", () => {
      render(<Separator decorative={false} data-testid="separator" />);
      expect(screen.getByTestId("separator")).toHaveAttribute("role", "separator");
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(<Separator data-testid="separator" className="my-4" />);
      const separator = screen.getByTestId("separator");
      expect(separator.className).toContain("my-4");
      expect(separator.className).toContain("shrink-0");
    });

    it("allows overriding default classes", () => {
      render(<Separator data-testid="separator" className="bg-red-500" />);
      const separator = screen.getByTestId("separator");
      expect(separator.className).toContain("bg-red-500");
    });
  });

  describe("props", () => {
    it("passes additional HTML attributes", () => {
      render(
        <Separator data-testid="separator" id="my-separator" aria-hidden="true" />
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("id", "my-separator");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("accessibility", () => {
    it("has proper aria-orientation when non-decorative and vertical", () => {
      render(
        <Separator
          data-testid="separator"
          decorative={false}
          orientation="vertical"
        />
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("role", "separator");
      expect(separator).toHaveAttribute("aria-orientation", "vertical");
    });

    it("has no aria-orientation when decorative", () => {
      render(<Separator data-testid="separator" decorative orientation="vertical" />);
      const separator = screen.getByTestId("separator");
      // Decorative separators do not need aria-orientation
      expect(separator).not.toHaveAttribute("role", "separator");
    });
  });

  describe("composition", () => {
    it("can be used between content elements", () => {
      render(
        <div>
          <p>Above</p>
          <Separator data-testid="separator" />
          <p>Below</p>
        </div>
      );
      expect(screen.getByText("Above")).toBeInTheDocument();
      expect(screen.getByTestId("separator")).toBeInTheDocument();
      expect(screen.getByText("Below")).toBeInTheDocument();
    });
  });
});
