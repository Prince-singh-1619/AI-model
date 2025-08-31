# AI Chat Interface

This project is a custom-built AI chat interface inspired by leading AI UIs. It includes accessibility improvements (ARIA labels), dynamic loading/error states, theme toggling, parameter controls, and a smooth chat experience with "assistant is typing…" animations.

---

## 1. Research

I reviewed several existing AI UIs to identify their strengths:

- **OpenAI Playground**  
  Clean interface with advanced parameter tuning (temperature, max tokens, top-p). Strong focus on flexibility for developers.

- **Hugging Face Spaces**  
  Lightweight and community-driven, with interactive demos. The standout feature is quick deployment and sharing of AI models.

- **Anthropic Claude UI**  
  Minimalist design with clear conversational focus. Good balance between simplicity and functionality, plus contextual conversation memory.

- **Microsoft Copilot Lab**  
  Strong integration with productivity apps (Word, Excel). The standout feature is task-based suggestions directly linked to workflows.

### Features Chosen (6 combined into this design)
1. **Parameter Controls** (from OpenAI Playground).  
2. **Quick Prompt Templates** (inspired by Hugging Face Spaces).  
3. **Clean Minimalist Chat Focus** (from Anthropic Claude).  
4. **Assistant Typing Indicator** with animated dots.  
5. **Theme Toggle (Light/Dark mode)** for personalization.  
6. **Error & Loading States with ARIA support** for accessibility.

---

## 2. Design

### a. Mockup (Figma)  [View Design](https://www.figma.com/design/TjBF4c9cqx61hB2Zgl7cFG/UI-Mockup?node-id=0-1&p=f)
Figma Link: https://www.figma.com/design/TjBF4c9cqx61hB2Zgl7cFG/UI-Mockup?node-id=0-1&p=f

A mockup was created in **Figma** to outline:
- Left side: Chat interface (conversation flow).
- Right side: Sidebar with theme toggle, parameters, and templates.
- Bottom: Input box with send button.

### b. Tailwind Tokens
- **Spacing** → Used `p-2`, `p-4`, `gap-2`, `gap-4` for consistent padding & margins.  
- **Typography** → Used `text-sm`, `text-base`, `text-lg`, and `font-medium` for hierarchy.  
- **Colors** → 
  - Light mode: `bg-white`, `text-gray-900`  
  - Dark mode: `bg-black`, `text-gray-100`  
  - Accent: `text-blue-600` for loading/typing indicators.

### c. Translation of Mockup → Code
| Mockup Element | Tailwind / React Implementation |
|----------------|--------------------------------|
| **Chat Messages** | Flex column, scrollable div (`overflow-y-auto`). |
| **Typing Indicator** | Animated bouncing dots with custom `[animation-delay]`. |
| **Theme Toggle** | Button with `MdLightMode` / `MdDarkMode` icons, state stored in `localStorage`. |
| **Parameters Panel** | Controlled by React state; updates broadcast with `CustomEvent("paramsChanged")`. |
| **Loading & Error States** | `<div role="status" aria-live="assertive">` used for accessibility. |
| **Accessibility** | ARIA labels added to buttons and status messages. |

---

## 3. Accessibility

- All interactive elements (buttons, toggles) have **ARIA labels**.  
- Loading and error messages are wrapped in `role="status"` with `aria-live="assertive"`.  
- The typing indicator announces **"Assistant is typing…"** for screen readers.  

---

## 4. Features Implemented
- Dark/Light mode toggle with persistent theme.  
- Parameter controls (`temperature`, `maxTokens`, `topP`).  
- Prompt templates for quick start.  
- Typing animation with bouncing dots.  
- Loading & error states with screen-reader support.  
- Automatic scroll to latest message.  

---

## 6. Implementation Notes & Known Limitations

### a. Implementation Notes
- Built with React, TypeScript, TailwindCSS, and Vite for modular, fast development.
- State managed via `useState` and custom events for AI parameter updates and model selection.
- Chat interface includes animated messages, typing indicator, and auto-scroll.
- Components like `ChatBubble`, `Button`, `Slider`, and `Modal` are reusable and accessible (ARIA labels included).
- Prompt templates persist in LocalStorage; assistant responses can be copied or downloaded as JSON.
- Supports light/dark themes with dynamic toggling.

### b. Known Limitations
- Assistant responses are mocked; API integration needed for real AI.
- LocalStorage is device-specific; no cross-device sync.
- Minor performance issues may occur on low-end devices.
- Storybook covers core components; minor UI elements are not included.
- GitHub Pages deployment uses a fixed base path (`/AI-model/`).
- No authentication; single-user prototype only.

--- 

## 5. Screenshots

  <img src="./src/assets/SS 1.png" alt="1" width="100%" align="center" />
  <img src="./src/assets/SS 2.png" alt="2" width="100%" align="center" />
  <img src="./src/assets/SS 3.png" alt="2" width="100%" align="center" />
