import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Input } from "@/components/ui/input";
import { createRef } from "react";

describe("Input", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId("input")).toBeInTheDocument();
    });

    it("renders as an input element", () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId("input").tagName).toBe("INPUT");
    });

    it("sets data-slot attribute to 'input'", () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("data-slot", "input");
    });
  });

  describe("types", () => {
    it("renders text type by default", () => {
      render(<Input data-testid="input" />);
      // Input without type attr defaults to text
      expect(screen.getByTestId("input")).not.toHaveAttribute("type");
    });

    it("renders with type='text'", () => {
      render(<Input type="text" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "text");
    });

    it("renders with type='email'", () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
    });

    it("renders with type='password'", () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "password");
    });

    it("renders with type='number'", () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "number");
    });

    it("renders with type='file'", () => {
      render(<Input type="file" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "file");
    });

    it("renders with type='search'", () => {
      render(<Input type="search" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "search");
    });
  });

  describe("props", () => {
    it("applies placeholder", () => {
      render(<Input placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    });

    it("applies disabled attribute", () => {
      render(<Input disabled data-testid="input" />);
      expect(screen.getByTestId("input")).toBeDisabled();
    });

    it("applies readOnly attribute", () => {
      render(<Input readOnly data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("readonly");
    });

    it("applies required attribute", () => {
      render(<Input required data-testid="input" />);
      expect(screen.getByTestId("input")).toBeRequired();
    });

    it("applies name attribute", () => {
      render(<Input name="username" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("name", "username");
    });

    it("applies value attribute", () => {
      render(<Input defaultValue="hello" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveValue("hello");
    });

    it("passes additional HTML attributes", () => {
      render(
        <Input
          data-testid="input"
          id="my-input"
          aria-label="Custom Input"
          autoComplete="off"
          maxLength={100}
        />
      );
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("id", "my-input");
      expect(input).toHaveAttribute("aria-label", "Custom Input");
      expect(input).toHaveAttribute("autocomplete", "off");
      expect(input).toHaveAttribute("maxlength", "100");
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(<Input className="custom-input" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input.className).toContain("custom-input");
      expect(input.className).toContain("rounded-md");
    });

    it("allows overriding default classes", () => {
      render(<Input className="h-12" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input.className).toContain("h-12");
    });
  });

  describe("interactions", () => {
    it("allows typing text", async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input");
      await user.type(input, "Hello World");
      expect(input).toHaveValue("Hello World");
    });

    it("calls onChange handler", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} data-testid="input" />);
      await user.type(screen.getByTestId("input"), "a");
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus handler", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} data-testid="input" />);
      await user.click(screen.getByTestId("input"));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur handler", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(
        <>
          <Input onBlur={handleBlur} data-testid="input" />
          <button>Other</button>
        </>
      );
      await user.click(screen.getByTestId("input"));
      await user.click(screen.getByRole("button"));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("does not allow typing when disabled", async () => {
      const user = userEvent.setup();
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId("input");
      await user.type(input, "test");
      expect(input).toHaveValue("");
    });
  });

  describe("forward ref", () => {
    it("forwards ref to the input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe("INPUT");
    });

    it("allows programmatic focus via ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} data-testid="input" />);
      ref.current?.focus();
      expect(screen.getByTestId("input")).toHaveFocus();
    });
  });

  describe("accessibility", () => {
    it("is focusable via tab", async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);
      await user.tab();
      expect(screen.getByTestId("input")).toHaveFocus();
    });

    it("supports aria-invalid", () => {
      render(<Input aria-invalid="true" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("aria-invalid", "true");
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Input aria-describedby="error-msg" data-testid="input" />
          <span id="error-msg">Error message</span>
        </>
      );
      expect(screen.getByTestId("input")).toHaveAttribute("aria-describedby", "error-msg");
    });

    it("can be labelled via aria-label", () => {
      render(<Input aria-label="Email address" />);
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    });
  });
});
