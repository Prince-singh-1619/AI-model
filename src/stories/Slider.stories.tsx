import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../components/Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  args: { max: 100, step: 1 },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const CustomRange: Story = {
  args: { max: 200, step: 10 },
};