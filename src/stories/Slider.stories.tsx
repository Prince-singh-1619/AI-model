import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/slider"; // adjust import

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  args: { defaultValue: [50], max: 100, step: 1 },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const CustomRange: Story = {
  args: { defaultValue: [20], max: 200, step: 10 },
};