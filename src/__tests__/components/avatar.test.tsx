import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

describe("Avatar", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId("avatar")).toBeInTheDocument();
    });

    it("renders fallback text", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("sets data-slot to 'avatar'", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-slot", "avatar");
    });
  });

  describe("sizes", () => {
    it("renders default size", () => {
      render(
        <Avatar data-testid="avatar" size="default">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "default");
      expect(screen.getByTestId("avatar").className).toContain("size-8");
    });

    it("renders sm size", () => {
      render(
        <Avatar data-testid="avatar" size="sm">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "sm");
    });

    it("renders lg size", () => {
      render(
        <Avatar data-testid="avatar" size="lg">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "lg");
    });

    it("defaults to 'default' size when not specified", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "default");
    });
  });

  describe("className merging", () => {
    it("merges custom className on Avatar", () => {
      render(
        <Avatar data-testid="avatar" className="border-2">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar.className).toContain("border-2");
      expect(avatar.className).toContain("rounded-full");
    });
  });
});

describe("AvatarImage", () => {
  it("renders with src attribute", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="User" data-testid="avatar-img" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    const img = screen.getByTestId("avatar-img");
    expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
  });

  it("sets data-slot to 'avatar-image'", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="User" data-testid="avatar-img" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar-img")).toHaveAttribute("data-slot", "avatar-image");
  });

  it("passes alt attribute", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="Profile Picture" data-testid="avatar-img" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar-img")).toHaveAttribute("alt", "Profile Picture");
  });

  it("merges custom className", () => {
    render(
      <Avatar>
        <AvatarImage
          src="https://example.com/avatar.png"
          alt="User"
          data-testid="avatar-img"
          className="object-cover"
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar-img").className).toContain("object-cover");
  });
});

describe("AvatarFallback", () => {
  it("renders without crashing", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="fallback">AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });

  it("sets data-slot to 'avatar-fallback'", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="fallback">AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toHaveAttribute("data-slot", "avatar-fallback");
  });

  it("renders children text", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="fallback" className="bg-blue-500">AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback").className).toContain("bg-blue-500");
  });
});

describe("AvatarBadge", () => {
  it("renders without crashing", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
        <AvatarBadge data-testid="badge" />
      </Avatar>
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("sets data-slot to 'avatar-badge'", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
        <AvatarBadge data-testid="badge" />
      </Avatar>
    );
    expect(screen.getByTestId("badge")).toHaveAttribute("data-slot", "avatar-badge");
  });

  it("renders as a span element", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
        <AvatarBadge data-testid="badge" />
      </Avatar>
    );
    expect(screen.getByTestId("badge").tagName).toBe("SPAN");
  });

  it("merges custom className", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
        <AvatarBadge data-testid="badge" className="bg-green-500" />
      </Avatar>
    );
    expect(screen.getByTestId("badge").className).toContain("bg-green-500");
  });
});

describe("AvatarGroup", () => {
  it("renders without crashing", () => {
    render(
      <AvatarGroup data-testid="avatar-group">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );
    expect(screen.getByTestId("avatar-group")).toBeInTheDocument();
  });

  it("sets data-slot to 'avatar-group'", () => {
    render(
      <AvatarGroup data-testid="avatar-group">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );
    expect(screen.getByTestId("avatar-group")).toHaveAttribute("data-slot", "avatar-group");
  });

  it("renders multiple avatars", () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <AvatarGroup data-testid="avatar-group" className="gap-2">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );
    expect(screen.getByTestId("avatar-group").className).toContain("gap-2");
  });
});

describe("AvatarGroupCount", () => {
  it("renders without crashing", () => {
    render(
      <AvatarGroup>
        <AvatarGroupCount data-testid="avatar-group-count">+5</AvatarGroupCount>
      </AvatarGroup>
    );
    expect(screen.getByTestId("avatar-group-count")).toBeInTheDocument();
  });

  it("sets data-slot to 'avatar-group-count'", () => {
    render(
      <AvatarGroup>
        <AvatarGroupCount data-testid="avatar-group-count">+5</AvatarGroupCount>
      </AvatarGroup>
    );
    expect(screen.getByTestId("avatar-group-count")).toHaveAttribute(
      "data-slot",
      "avatar-group-count"
    );
  });

  it("renders count text", () => {
    render(
      <AvatarGroup>
        <AvatarGroupCount>+12</AvatarGroupCount>
      </AvatarGroup>
    );
    expect(screen.getByText("+12")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <AvatarGroup>
        <AvatarGroupCount data-testid="avatar-group-count" className="text-lg">
          +3
        </AvatarGroupCount>
      </AvatarGroup>
    );
    expect(screen.getByTestId("avatar-group-count").className).toContain("text-lg");
  });
});
