import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { createRef } from "react";

describe("Button", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Button>Hello World</Button>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("renders as a button element by default", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("sets data-slot attribute to 'button'", () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
    });
  });

  describe("variants", () => {
    it("renders default variant", () => {
      render(<Button variant="default">Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "default");
      expect(button.className).toContain("bg-primary");
    });

    it("renders destructive variant", () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "destructive");
      expect(button.className).toContain("bg-destructive");
    });

    it("renders outline variant", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "outline");
      expect(button.className).toContain("border");
    });

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "secondary");
      expect(button.className).toContain("bg-secondary");
    });

    it("renders ghost variant", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "ghost");
    });

    it("renders link variant", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "link");
      expect(button.className).toContain("underline-offset-4");
    });
  });

  describe("sizes", () => {
    it("renders default size", () => {
      render(<Button size="default">Default Size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "default");
      expect(button.className).toContain("h-9");
    });

    it("renders xs size", () => {
      render(<Button size="xs">XS</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "xs");
      expect(button.className).toContain("h-6");
    });

    it("renders sm size", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "sm");
      expect(button.className).toContain("h-8");
    });

    it("renders lg size", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "lg");
      expect(button.className).toContain("h-10");
    });

    it("renders icon size", () => {
      render(<Button size="icon">I</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "icon");
      expect(button.className).toContain("size-9");
    });

    it("renders icon-xs size", () => {
      render(<Button size="icon-xs">I</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "icon-xs");
      expect(button.className).toContain("size-6");
    });

    it("renders icon-sm size", () => {
      render(<Button size="icon-sm">I</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "icon-sm");
      expect(button.className).toContain("size-8");
    });

    it("renders icon-lg size", () => {
      render(<Button size="icon-lg">I</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-size", "icon-lg");
      expect(button.className).toContain("size-10");
    });
  });

  describe("props", () => {
    it("passes type attribute correctly", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("applies disabled attribute", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("passes additional HTML attributes", () => {
      render(<Button data-testid="my-button" aria-label="custom label">Test</Button>);
      expect(screen.getByTestId("my-button")).toBeInTheDocument();
      expect(screen.getByLabelText("custom label")).toBeInTheDocument();
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
      expect(button.className).toContain("inline-flex");
    });

    it("allows overriding default classes via className", () => {
      render(<Button className="rounded-none">Test</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("rounded-none");
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole("link", { name: "Link Button" });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("interactions", () => {
    it("calls onClick handler when clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click</Button>);
      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button disabled onClick={handleClick}>Click</Button>);
      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles keyboard events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Press</Button>);
      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("buttonVariants", () => {
    it("returns correct class string for default variant", () => {
      const classes = buttonVariants({ variant: "default", size: "default" });
      expect(classes).toContain("bg-primary");
      expect(classes).toContain("h-9");
    });

    it("returns correct class string for destructive + lg", () => {
      const classes = buttonVariants({ variant: "destructive", size: "lg" });
      expect(classes).toContain("bg-destructive");
      expect(classes).toContain("h-10");
    });

    it("supports custom className in buttonVariants", () => {
      const classes = buttonVariants({ variant: "default", className: "my-extra" });
      expect(classes).toContain("my-extra");
    });
  });

  describe("accessibility", () => {
    it("is focusable", async () => {
      const user = userEvent.setup();
      render(<Button>Focusable</Button>);
      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();
    });

    it("supports aria-disabled", () => {
      render(<Button aria-disabled="true">Test</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    });

    it("supports aria-label", () => {
      render(<Button aria-label="Close dialog">X</Button>);
      expect(screen.getByLabelText("Close dialog")).toBeInTheDocument();
    });
  });
});
