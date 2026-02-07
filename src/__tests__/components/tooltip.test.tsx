import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

// Helper to render tooltip with provider
function renderTooltip({
  triggerText = "Hover me",
  tooltipText = "Tooltip text",
  open,
  defaultOpen,
  onOpenChange,
  contentProps = {},
}: {
  triggerText?: string;
  tooltipText?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentProps?: Record<string, unknown>;
} = {}) {
  return render(
    <TooltipProvider>
      <Tooltip open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipTrigger>{triggerText}</TooltipTrigger>
        <TooltipContent {...contentProps}>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("TooltipProvider", () => {
  it("renders without crashing", () => {
    render(
      <TooltipProvider>
        <div>Child</div>
      </TooltipProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("accepts delayDuration prop", () => {
    // Should not throw
    render(
      <TooltipProvider delayDuration={500}>
        <div>Child</div>
      </TooltipProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("defaults delayDuration to 0", () => {
    // The component sets delayDuration = 0 by default
    // This test just verifies it renders correctly
    render(
      <TooltipProvider>
        <div>Child</div>
      </TooltipProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});

describe("Tooltip", () => {
  describe("rendering", () => {
    it("renders trigger without crashing", () => {
      renderTooltip();
      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("does not show tooltip content initially", () => {
      renderTooltip();
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("shows tooltip content when open is true", () => {
      renderTooltip({ open: true });
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("shows tooltip on hover", async () => {
      const user = userEvent.setup();
      renderTooltip({ tooltipText: "Hover tooltip" });

      await user.hover(screen.getByText("Hover me"));
      await waitFor(() => {
        expect(screen.getByText("Hover tooltip")).toBeInTheDocument();
      });
    });

    it("hides tooltip on unhover", async () => {
      const user = userEvent.setup();
      renderTooltip({ tooltipText: "Disappearing tooltip" });

      await user.hover(screen.getByText("Hover me"));
      await waitFor(() => {
        expect(screen.getByText("Disappearing tooltip")).toBeInTheDocument();
      });

      await user.unhover(screen.getByText("Hover me"));
      await waitFor(() => {
        expect(screen.queryByText("Disappearing tooltip")).not.toBeInTheDocument();
      });
    });

    it("shows tooltip on focus", async () => {
      const user = userEvent.setup();
      renderTooltip({ tooltipText: "Focus tooltip" });

      await user.tab();
      await waitFor(() => {
        expect(screen.getByText("Focus tooltip")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when tooltip opens", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      renderTooltip({ onOpenChange, tooltipText: "Change tooltip" });

      await user.hover(screen.getByText("Hover me"));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it("calls onOpenChange when tooltip closes", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      renderTooltip({ onOpenChange, tooltipText: "Closing tooltip" });

      await user.hover(screen.getByText("Hover me"));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });

      await user.unhover(screen.getByText("Hover me"));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("TooltipContent", () => {
    it("sets data-slot to 'tooltip-content'", () => {
      renderTooltip({
        open: true,
        contentProps: { "data-testid": "tooltip-content" },
      });
      expect(screen.getByTestId("tooltip-content")).toHaveAttribute(
        "data-slot",
        "tooltip-content"
      );
    });

    it("merges custom className", () => {
      renderTooltip({
        open: true,
        contentProps: { "data-testid": "tooltip-content", className: "max-w-xs" },
      });
      const content = screen.getByTestId("tooltip-content");
      expect(content.className).toContain("max-w-xs");
    });

    it("renders children text", () => {
      renderTooltip({ open: true, tooltipText: "Custom tooltip content" });
      expect(screen.getByText("Custom tooltip content")).toBeInTheDocument();
    });
  });

  describe("TooltipTrigger", () => {
    it("sets data-slot to 'tooltip-trigger'", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
            <TooltipContent>Tip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "tooltip-trigger");
    });
  });

  describe("controlled mode", () => {
    it("stays open when open prop is true", () => {
      renderTooltip({ open: true, tooltipText: "Controlled tooltip" });
      expect(screen.getByText("Controlled tooltip")).toBeInTheDocument();
    });

    it("stays closed when open prop is false", async () => {
      const user = userEvent.setup();
      renderTooltip({ open: false, tooltipText: "Hidden tooltip" });

      await user.hover(screen.getByText("Hover me"));
      // Even after hovering, should not appear since open=false
      expect(screen.queryByText("Hidden tooltip")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("tooltip has role='tooltip' when visible", async () => {
      renderTooltip({ open: true, tooltipText: "Accessible tooltip" });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("tooltip content is not in DOM when closed", () => {
      renderTooltip({ tooltipText: "Hidden tooltip" });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("trigger is focusable", async () => {
      const user = userEvent.setup();
      renderTooltip();
      await user.tab();
      expect(screen.getByText("Hover me")).toHaveFocus();
    });
  });
});
