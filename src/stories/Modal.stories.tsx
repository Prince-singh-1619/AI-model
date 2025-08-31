import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"; // adjust import if using shadcn

const DemoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Hello from Modal</DialogTitle>
        <p>This is a simple modal content.</p>
      </DialogContent>
    </Dialog>
  );
};

const meta: Meta<typeof DemoModal> = {
  title: "Components/Modal",
  component: DemoModal,
};
export default meta;
type Story = StoryObj<typeof DemoModal>;

export const Default: Story = {};