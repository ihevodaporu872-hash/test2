import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

describe("DropdownMenu", () => {
  describe("rendering", () => {
    it("renders trigger without crashing", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        </DropdownMenu>
      );
      expect(screen.getByText("Open Menu")).toBeInTheDocument();
    });

    it("does not render content when closed", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    });

    it("renders content when open", async () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      // Radix renders through portal; content should be visible
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });

  describe("open/close interactions", () => {
    it("opens menu when trigger is clicked", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Action")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange callback", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("DropdownMenuItem", () => {
    it("renders menu items", async () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("supports variant='destructive'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem variant="destructive" data-testid="destructive-item">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("destructive-item")).toHaveAttribute("data-variant", "destructive");
    });

    it("supports inset prop", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem inset data-testid="inset-item">
              Inset Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("inset-item")).toHaveAttribute("data-inset", "true");
    });

    it("sets data-slot to 'dropdown-menu-item'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem data-testid="item">Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("item")).toHaveAttribute("data-slot", "dropdown-menu-item");
    });

    it("merges custom className", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem data-testid="item" className="text-red-500">
              Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("item").className).toContain("text-red-500");
    });
  });

  describe("DropdownMenuLabel", () => {
    it("renders label", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("My Account")).toBeInTheDocument();
    });

    it("sets data-slot to 'dropdown-menu-label'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel data-testid="label">Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("label")).toHaveAttribute("data-slot", "dropdown-menu-label");
    });

    it("supports inset prop", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel inset data-testid="label">Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("label")).toHaveAttribute("data-inset", "true");
    });

    it("merges custom className", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel data-testid="label" className="font-bold">Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("label").className).toContain("font-bold");
    });
  });

  describe("DropdownMenuSeparator", () => {
    it("renders separator", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuSeparator data-testid="separator" />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("separator")).toBeInTheDocument();
    });

    it("sets data-slot to 'dropdown-menu-separator'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator data-testid="separator" />
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("separator")).toHaveAttribute(
        "data-slot",
        "dropdown-menu-separator"
      );
    });
  });

  describe("DropdownMenuShortcut", () => {
    it("renders shortcut text", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              New Tab
              <DropdownMenuShortcut>Ctrl+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("Ctrl+T")).toBeInTheDocument();
    });

    it("sets data-slot to 'dropdown-menu-shortcut'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Item
              <DropdownMenuShortcut data-testid="shortcut">Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("shortcut")).toHaveAttribute(
        "data-slot",
        "dropdown-menu-shortcut"
      );
    });

    it("merges custom className", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Item
              <DropdownMenuShortcut data-testid="shortcut" className="opacity-50">
                K
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("shortcut").className).toContain("opacity-50");
    });
  });

  describe("DropdownMenuGroup", () => {
    it("renders group with items", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Item A</DropdownMenuItem>
              <DropdownMenuItem>Item B</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("Item A")).toBeInTheDocument();
      expect(screen.getByText("Item B")).toBeInTheDocument();
    });

    it("sets data-slot to 'dropdown-menu-group'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup data-testid="group">
              <DropdownMenuItem>Item</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("group")).toHaveAttribute("data-slot", "dropdown-menu-group");
    });
  });

  describe("DropdownMenuCheckboxItem", () => {
    it("renders checkbox item", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Show Toolbar</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("Show Toolbar")).toBeInTheDocument();
    });

    it("sets data-slot to 'dropdown-menu-checkbox-item'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem data-testid="checkbox-item" checked={false}>
              Option
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("checkbox-item")).toHaveAttribute(
        "data-slot",
        "dropdown-menu-checkbox-item"
      );
    });

    it("merges custom className", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem data-testid="checkbox-item" className="bg-blue-100" checked>
              Option
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("checkbox-item").className).toContain("bg-blue-100");
    });
  });

  describe("DropdownMenuRadioGroup and DropdownMenuRadioItem", () => {
    it("renders radio items", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="light">
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("Light")).toBeInTheDocument();
      expect(screen.getByText("Dark")).toBeInTheDocument();
    });

    it("sets data-slot to 'dropdown-menu-radio-item'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="a">
              <DropdownMenuRadioItem data-testid="radio-item" value="a">
                A
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("radio-item")).toHaveAttribute(
        "data-slot",
        "dropdown-menu-radio-item"
      );
    });
  });

  describe("DropdownMenuContent", () => {
    it("sets data-slot to 'dropdown-menu-content'", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent data-testid="content">
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("content")).toHaveAttribute(
        "data-slot",
        "dropdown-menu-content"
      );
    });

    it("merges custom className", () => {
      render(
        <DropdownMenu open>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent data-testid="content" className="w-64">
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByTestId("content").className).toContain("w-64");
    });
  });

  describe("accessibility", () => {
    it("trigger has data-slot attribute", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="trigger">Open</DropdownMenuTrigger>
        </DropdownMenu>
      );

      expect(screen.getByTestId("trigger")).toHaveAttribute(
        "data-slot",
        "dropdown-menu-trigger"
      );
    });

    it("renders with role='menu' when open", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open"));
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("menu items have role='menuitem'", async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Action Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open"));
      await waitFor(() => {
        expect(screen.getByRole("menuitem")).toBeInTheDocument();
      });
    });
  });
});
