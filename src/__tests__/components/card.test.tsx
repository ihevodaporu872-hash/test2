import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

describe("Card", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Card data-testid="card">Content</Card>);
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("sets data-slot attribute to 'card'", () => {
      render(<Card data-testid="card">Content</Card>);
      expect(screen.getByTestId("card")).toHaveAttribute("data-slot", "card");
    });

    it("renders as a div element", () => {
      render(<Card data-testid="card">Content</Card>);
      expect(screen.getByTestId("card").tagName).toBe("DIV");
    });
  });

  describe("className merging", () => {
    it("merges custom className with default classes", () => {
      render(<Card data-testid="card" className="custom-class">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card.className).toContain("custom-class");
      expect(card.className).toContain("rounded-xl");
    });

    it("allows overriding default classes", () => {
      render(<Card data-testid="card" className="rounded-none">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card.className).toContain("rounded-none");
    });
  });

  describe("props", () => {
    it("passes additional HTML attributes", () => {
      render(
        <Card data-testid="card" id="my-card" role="region" aria-label="My Card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("id", "my-card");
      expect(card).toHaveAttribute("role", "region");
      expect(card).toHaveAttribute("aria-label", "My Card");
    });
  });
});

describe("CardHeader", () => {
  it("renders without crashing", () => {
    render(<CardHeader data-testid="card-header">Header</CardHeader>);
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
  });

  it("sets data-slot to 'card-header'", () => {
    render(<CardHeader data-testid="card-header">Header</CardHeader>);
    expect(screen.getByTestId("card-header")).toHaveAttribute("data-slot", "card-header");
  });

  it("merges custom className", () => {
    render(<CardHeader data-testid="card-header" className="extra">Header</CardHeader>);
    const el = screen.getByTestId("card-header");
    expect(el.className).toContain("extra");
    expect(el.className).toContain("px-6");
  });

  it("renders children", () => {
    render(<CardHeader>My Header</CardHeader>);
    expect(screen.getByText("My Header")).toBeInTheDocument();
  });
});

describe("CardTitle", () => {
  it("renders without crashing", () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
  });

  it("sets data-slot to 'card-title'", () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    expect(screen.getByTestId("card-title")).toHaveAttribute("data-slot", "card-title");
  });

  it("merges custom className", () => {
    render(<CardTitle data-testid="card-title" className="text-xl">Title</CardTitle>);
    const el = screen.getByTestId("card-title");
    expect(el.className).toContain("text-xl");
    expect(el.className).toContain("font-semibold");
  });

  it("renders children text", () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });
});

describe("CardDescription", () => {
  it("renders without crashing", () => {
    render(<CardDescription data-testid="card-desc">Description</CardDescription>);
    expect(screen.getByTestId("card-desc")).toBeInTheDocument();
  });

  it("sets data-slot to 'card-description'", () => {
    render(<CardDescription data-testid="card-desc">Description</CardDescription>);
    expect(screen.getByTestId("card-desc")).toHaveAttribute("data-slot", "card-description");
  });

  it("merges custom className", () => {
    render(
      <CardDescription data-testid="card-desc" className="italic">
        Description
      </CardDescription>
    );
    const el = screen.getByTestId("card-desc");
    expect(el.className).toContain("italic");
    expect(el.className).toContain("text-sm");
  });
});

describe("CardAction", () => {
  it("renders without crashing", () => {
    render(<CardAction data-testid="card-action">Action</CardAction>);
    expect(screen.getByTestId("card-action")).toBeInTheDocument();
  });

  it("sets data-slot to 'card-action'", () => {
    render(<CardAction data-testid="card-action">Action</CardAction>);
    expect(screen.getByTestId("card-action")).toHaveAttribute("data-slot", "card-action");
  });

  it("merges custom className", () => {
    render(
      <CardAction data-testid="card-action" className="gap-4">
        Action
      </CardAction>
    );
    const el = screen.getByTestId("card-action");
    expect(el.className).toContain("gap-4");
  });
});

describe("CardContent", () => {
  it("renders without crashing", () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  it("sets data-slot to 'card-content'", () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    expect(screen.getByTestId("card-content")).toHaveAttribute("data-slot", "card-content");
  });

  it("merges custom className", () => {
    render(
      <CardContent data-testid="card-content" className="p-8">
        Content
      </CardContent>
    );
    const el = screen.getByTestId("card-content");
    expect(el.className).toContain("p-8");
  });

  it("renders children", () => {
    render(<CardContent>Inner Content</CardContent>);
    expect(screen.getByText("Inner Content")).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renders without crashing", () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    expect(screen.getByTestId("card-footer")).toBeInTheDocument();
  });

  it("sets data-slot to 'card-footer'", () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    expect(screen.getByTestId("card-footer")).toHaveAttribute("data-slot", "card-footer");
  });

  it("merges custom className", () => {
    render(
      <CardFooter data-testid="card-footer" className="justify-between">
        Footer
      </CardFooter>
    );
    const el = screen.getByTestId("card-footer");
    expect(el.className).toContain("justify-between");
    expect(el.className).toContain("flex");
  });

  it("renders children", () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});

describe("Card composition", () => {
  it("renders a fully composed card", () => {
    render(
      <Card data-testid="full-card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
          <CardAction>
            <button>Edit</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Main content here</p>
        </CardContent>
        <CardFooter>
          <button>Save</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId("full-card")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Main content here")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
