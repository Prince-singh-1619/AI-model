import type { Meta, StoryObj } from "@storybook/react-vite";
import {ChatBubble} from "../components/ChatBubble";
import type { AIParameters } from "../components/ParameterControls";

const demoParams: AIParameters = {
  temperature: 0.7,
  maxTokens: 500,
  topP: 1,
};

const meta: Meta<typeof ChatBubble> = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  args: {
    message: "Hello! I'm the AI assistant.",
    isUser: false,
    params: demoParams,
  },
};
export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const AssistantMessage: Story = {};

export const UserMessage: Story = {
  args: { isUser: true, message: "Hi! This is the user." },
};

export const AssistantWithParams: Story = {
  args: {
    isUser: false,
    message: "Here are my generation parameters 👇",
    params: demoParams,
  },
};