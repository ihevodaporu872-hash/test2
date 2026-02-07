import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge, badgeVariants } from "@/components/ui/badge";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Badge>Status Active</Badge>);
      expect(screen.getByText("Status Active")).toBeInTheDocument();
    });

    it("renders as a span element by default", () => {
      render(<Badge data-testid="badge">Test</Badge>);
      expect(screen.getByTestId("badge").tagName).toBe("SPAN");
    });

    it("sets data-slot attribute to 'badge'", () => {
      render(<Badge data-testid="badge">Test</Badge>);
      expect(screen.getByTestId("badge")).toHaveAttribute("data-slot", "badge");
    });
  });

  describe("variants", () => {
    it("renders default variant", () => {
      render(<Badge variant="default" data-testid="badge">Default</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("data-variant", "default");
      expect(badge.className).toContain("bg-primary");
    });

    it("renders secondary variant", () => {
      render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("data-variant", "secondary");
      expect(badge.className).toContain("bg-secondary");
    });

    it("renders destructive variant", () => {
      render(<Badge variant="destructive" data-testid="badge">Destructive</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("data-variant", "destructive");
      expect(badge.className).toContain("bg-destructive");
    });

    it("renders outline variant", () => {
      render(<Badge variant="outline" data-testid="badge">Outline</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("data-variant", "outline");
    });

    it("renders ghost variant", () => {
      render(<Badge variant="ghost" data-testid="badge">Ghost</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("data-variant", "ghost");
    });

    it("renders link variant", () => {
      render(<Badge variant="link" data-testid="badge">Link</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("data-variant", "link");
      expect(badge.className).toContain("underline-offset-4");
    });

    it("uses default variant when not specified", () => {
      render(<Badge data-testid="badge">Default</Badge>);
      expect(screen.getByTestId("badge")).toHaveAttribute("data-variant", "default");
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(<Badge data-testid="badge" className="custom-class">Test</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge.className).toContain("custom-class");
      expect(badge.className).toContain("inline-flex");
    });

    it("allows overriding default classes", () => {
      render(<Badge data-testid="badge" className="rounded-none">Test</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge.className).toContain("rounded-none");
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Badge asChild>
          <a href="/test">Link Badge</a>
        </Badge>
      );
      const link = screen.getByRole("link", { name: "Link Badge" });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("props", () => {
    it("passes additional HTML attributes", () => {
      render(
        <Badge data-testid="badge" id="my-badge" aria-label="status badge">
          Active
        </Badge>
      );
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("id", "my-badge");
      expect(badge).toHaveAttribute("aria-label", "status badge");
    });
  });

  describe("badgeVariants", () => {
    it("returns correct class string for default variant", () => {
      const classes = badgeVariants({ variant: "default" });
      expect(classes).toContain("bg-primary");
    });

    it("returns correct class string for secondary variant", () => {
      const classes = badgeVariants({ variant: "secondary" });
      expect(classes).toContain("bg-secondary");
    });

    it("returns correct class string for destructive variant", () => {
      const classes = badgeVariants({ variant: "destructive" });
      expect(classes).toContain("bg-destructive");
    });

    it("returns correct class string for outline variant", () => {
      const classes = badgeVariants({ variant: "outline" });
      expect(classes).toContain("border-border");
    });

    it("returns correct class string for ghost variant", () => {
      const classes = badgeVariants({ variant: "ghost" });
      expect(classes).toBeTruthy();
    });

    it("returns correct class string for link variant", () => {
      const classes = badgeVariants({ variant: "link" });
      expect(classes).toContain("underline-offset-4");
    });
  });

  describe("accessibility", () => {
    it("supports aria-label", () => {
      render(<Badge aria-label="notification count">3</Badge>);
      expect(screen.getByLabelText("notification count")).toBeInTheDocument();
    });

    it("supports role attribute", () => {
      render(<Badge role="status">Active</Badge>);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
