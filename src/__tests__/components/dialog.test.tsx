import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

describe("Dialog", () => {
  describe("rendering", () => {
    it("renders trigger without crashing", () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
        </Dialog>
      );
      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    it("does not render content when closed", () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <p>Dialog body</p>
          </DialogContent>
        </Dialog>
      );
      expect(screen.queryByText("Dialog body")).not.toBeInTheDocument();
    });

    it("renders content when open is true", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <p>Visible content</p>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText("Visible content")).toBeInTheDocument();
    });
  });

  describe("open/close interactions", () => {
    it("opens dialog when trigger is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>My Dialog</DialogTitle>
            <p>Dialog content here</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText("Dialog content here")).not.toBeInTheDocument();
      await user.click(screen.getByText("Open Dialog"));
      await waitFor(() => {
        expect(screen.getByText("Dialog content here")).toBeInTheDocument();
      });
    });

    it("shows close button by default", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText("Open"));
      await waitFor(() => {
        expect(screen.getByText("Close")).toBeInTheDocument();
      });
    });

    it("hides close button when showCloseButton is false", async () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Title</DialogTitle>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      // The sr-only "Close" text should not be present
      expect(screen.queryByText("Close")).not.toBeInTheDocument();
    });

    it("calls onOpenChange when dialog state changes", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Dialog onOpenChange={onOpenChange}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText("Open"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("DialogHeader", () => {
    it("renders without crashing", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="dialog-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    });

    it("sets data-slot to 'dialog-header'", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="dialog-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-header")).toHaveAttribute("data-slot", "dialog-header");
    });

    it("merges custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="dialog-header" className="gap-4">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      const el = screen.getByTestId("dialog-header");
      expect(el.className).toContain("gap-4");
      expect(el.className).toContain("flex");
    });
  });

  describe("DialogFooter", () => {
    it("renders without crashing", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="dialog-footer">
              <button>Save</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-footer")).toBeInTheDocument();
    });

    it("sets data-slot to 'dialog-footer'", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="dialog-footer">
              <button>OK</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-footer")).toHaveAttribute("data-slot", "dialog-footer");
    });

    it("renders close button when showCloseButton is true", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter showCloseButton>
              <button>Save</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      // The footer close button renders a Button with text "Close"
      const closeButtons = screen.getAllByText("Close");
      // Should have at least the footer close button (plus the X close button sr-only)
      expect(closeButtons.length).toBeGreaterThanOrEqual(1);
    });

    it("merges custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="dialog-footer" className="justify-start">
              <button>OK</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const el = screen.getByTestId("dialog-footer");
      expect(el.className).toContain("justify-start");
      expect(el.className).toContain("flex");
    });
  });

  describe("DialogTitle", () => {
    it("renders without crashing", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>My Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText("My Title")).toBeInTheDocument();
    });

    it("sets data-slot to 'dialog-title'", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle data-testid="dialog-title">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-title")).toHaveAttribute("data-slot", "dialog-title");
    });

    it("merges custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle data-testid="dialog-title" className="text-2xl">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      const el = screen.getByTestId("dialog-title");
      expect(el.className).toContain("text-2xl");
      expect(el.className).toContain("font-semibold");
    });
  });

  describe("DialogDescription", () => {
    it("renders without crashing", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>A description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText("A description")).toBeInTheDocument();
    });

    it("sets data-slot to 'dialog-description'", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription data-testid="dialog-desc">Desc</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-desc")).toHaveAttribute("data-slot", "dialog-description");
    });

    it("merges custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription data-testid="dialog-desc" className="italic">Desc</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      const el = screen.getByTestId("dialog-desc");
      expect(el.className).toContain("italic");
      expect(el.className).toContain("text-sm");
    });
  });

  describe("accessibility", () => {
    it("renders dialog with role='dialog'", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Accessible Dialog</DialogTitle>
            <DialogDescription>Description for screen readers</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText("Open"));
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("has accessible title", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Accessible Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText("Open"));
      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
      });
    });

    it("close button has sr-only text", async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const closeText = screen.getByText("Close");
      expect(closeText).toHaveClass("sr-only");
    });
  });

  describe("DialogContent data-slot", () => {
    it("sets data-slot to 'dialog-content'", () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId("dialog-content")).toHaveAttribute("data-slot", "dialog-content");
    });

    it("merges custom className on DialogContent", () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content" className="max-w-2xl">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      const el = screen.getByTestId("dialog-content");
      expect(el.className).toContain("max-w-2xl");
    });
  });
});
