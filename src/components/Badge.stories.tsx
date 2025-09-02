import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

type Status = "Active" | "Inactive";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    status: "Active",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Active: Story = {
  args: {
    status: "Active",
  },
};

export const Inactive: Story = {
  args: {
    status: "Inactive",
  },
};
