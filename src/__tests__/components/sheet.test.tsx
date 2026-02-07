import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

describe("Sheet", () => {
  describe("rendering", () => {
    it("renders trigger without crashing", () => {
      render(
        <Sheet>
          <SheetTrigger>Open Sheet</SheetTrigger>
        </Sheet>
      );
      expect(screen.getByText("Open Sheet")).toBeInTheDocument();
    });

    it("does not render content when closed", () => {
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Sheet body</p>
          </SheetContent>
        </Sheet>
      );
      expect(screen.queryByText("Sheet body")).not.toBeInTheDocument();
    });

    it("renders content when open is true", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Sheet Title</SheetTitle>
            <p>Visible sheet content</p>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByText("Visible sheet content")).toBeInTheDocument();
    });
  });

  describe("open/close interactions", () => {
    it("opens sheet when trigger is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <p>Sheet content here</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.queryByText("Sheet content here")).not.toBeInTheDocument();
      await user.click(screen.getByText("Open Sheet"));
      await waitFor(() => {
        expect(screen.getByText("Sheet content here")).toBeInTheDocument();
      });
    });

    it("shows close button by default", async () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText("Close")).toBeInTheDocument();
    });

    it("hides close button when showCloseButton is false", () => {
      render(
        <Sheet open>
          <SheetContent showCloseButton={false}>
            <SheetTitle>Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      expect(screen.queryByText("Close")).not.toBeInTheDocument();
    });

    it("calls onOpenChange when state changes", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Sheet onOpenChange={onOpenChange}>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <p>Content</p>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("side variants", () => {
    it("renders with side='right' by default", () => {
      render(
        <Sheet open>
          <SheetContent data-testid="sheet-content">
            <SheetTitle>Title</SheetTitle>
            <p>Right side</p>
          </SheetContent>
        </Sheet>
      );
      const content = screen.getByTestId("sheet-content");
      expect(content.className).toContain("right-0");
    });

    it("renders with side='left'", () => {
      render(
        <Sheet open>
          <SheetContent side="left" data-testid="sheet-content">
            <SheetTitle>Title</SheetTitle>
            <p>Left side</p>
          </SheetContent>
        </Sheet>
      );
      const content = screen.getByTestId("sheet-content");
      expect(content.className).toContain("left-0");
    });

    it("renders with side='top'", () => {
      render(
        <Sheet open>
          <SheetContent side="top" data-testid="sheet-content">
            <SheetTitle>Title</SheetTitle>
            <p>Top side</p>
          </SheetContent>
        </Sheet>
      );
      const content = screen.getByTestId("sheet-content");
      expect(content.className).toContain("top-0");
    });

    it("renders with side='bottom'", () => {
      render(
        <Sheet open>
          <SheetContent side="bottom" data-testid="sheet-content">
            <SheetTitle>Title</SheetTitle>
            <p>Bottom side</p>
          </SheetContent>
        </Sheet>
      );
      const content = screen.getByTestId("sheet-content");
      expect(content.className).toContain("bottom-0");
    });
  });

  describe("SheetHeader", () => {
    it("renders without crashing", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetHeader data-testid="sheet-header">
              <SheetTitle>Title</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-header")).toBeInTheDocument();
    });

    it("sets data-slot to 'sheet-header'", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetHeader data-testid="sheet-header">
              <SheetTitle>Title</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-header")).toHaveAttribute("data-slot", "sheet-header");
    });

    it("merges custom className", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetHeader data-testid="sheet-header" className="bg-red-500">
              <SheetTitle>Title</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
      const el = screen.getByTestId("sheet-header");
      expect(el.className).toContain("bg-red-500");
      expect(el.className).toContain("flex");
    });
  });

  describe("SheetFooter", () => {
    it("renders without crashing", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetFooter data-testid="sheet-footer">
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-footer")).toBeInTheDocument();
    });

    it("sets data-slot to 'sheet-footer'", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetFooter data-testid="sheet-footer">
              <button>OK</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-footer")).toHaveAttribute("data-slot", "sheet-footer");
    });

    it("merges custom className", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetFooter data-testid="sheet-footer" className="justify-between">
              <button>Cancel</button>
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
      const el = screen.getByTestId("sheet-footer");
      expect(el.className).toContain("justify-between");
    });
  });

  describe("SheetTitle", () => {
    it("renders without crashing", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>My Sheet Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByText("My Sheet Title")).toBeInTheDocument();
    });

    it("sets data-slot to 'sheet-title'", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle data-testid="sheet-title">Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-title")).toHaveAttribute("data-slot", "sheet-title");
    });

    it("merges custom className", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle data-testid="sheet-title" className="text-2xl">Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      const el = screen.getByTestId("sheet-title");
      expect(el.className).toContain("text-2xl");
      expect(el.className).toContain("font-semibold");
    });
  });

  describe("SheetDescription", () => {
    it("renders without crashing", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>A description</SheetDescription>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByText("A description")).toBeInTheDocument();
    });

    it("sets data-slot to 'sheet-description'", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription data-testid="sheet-desc">Desc</SheetDescription>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-desc")).toHaveAttribute("data-slot", "sheet-description");
    });

    it("merges custom className", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription data-testid="sheet-desc" className="italic">Desc</SheetDescription>
          </SheetContent>
        </Sheet>
      );
      const el = screen.getByTestId("sheet-desc");
      expect(el.className).toContain("italic");
      expect(el.className).toContain("text-sm");
    });
  });

  describe("SheetContent className merging", () => {
    it("sets data-slot to 'sheet-content'", () => {
      render(
        <Sheet open>
          <SheetContent data-testid="sheet-content">
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByTestId("sheet-content")).toHaveAttribute("data-slot", "sheet-content");
    });

    it("merges custom className on SheetContent", () => {
      render(
        <Sheet open>
          <SheetContent data-testid="sheet-content" className="w-full">
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      const el = screen.getByTestId("sheet-content");
      expect(el.className).toContain("w-full");
    });
  });

  describe("accessibility", () => {
    it("renders with role='dialog'", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Accessible Sheet</SheetTitle>
            <SheetDescription>Description for screen readers</SheetDescription>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("close button has sr-only text", () => {
      render(
        <Sheet open>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      const closeText = screen.getByText("Close");
      expect(closeText).toHaveClass("sr-only");
    });
  });
});
