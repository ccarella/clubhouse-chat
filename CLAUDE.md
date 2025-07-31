# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "clubhouse-chat" that uses:
- TypeScript for type safety
- Tailwind CSS v4 for styling
- shadcn/ui components (New York style)
- Supabase for backend services (auth and database)
- OpenAI and Vercel AI SDK for AI features
- React 19.1.0

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build the application
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture and Key Patterns

### File Structure
- `/app` - Next.js App Router pages and layouts
- `/components/ui` - shadcn/ui components (button, card, input, avatar, etc.)
- `/lib` - Utility functions and shared code
- `/supabase` - Supabase configuration and migrations (currently empty)

### Key Technologies and Patterns
1. **Next.js App Router**: Uses the modern App Router pattern with `app/` directory
2. **Component Library**: Uses shadcn/ui with Radix UI primitives for accessible components
3. **Styling**: Tailwind CSS v4 with CSS variables for theming
4. **TypeScript**: Strict mode enabled with path aliases configured (@/* maps to root)
5. **AI Integration**: Set up with OpenAI SDK and Vercel AI SDK for chat/AI features

### Important Configuration
- Path aliases: Use `@/` to import from project root (e.g., `@/components/ui/button`)
- shadcn/ui configured with New York style, RSC support, and Lucide icons
- TypeScript target: ES2017 with strict mode
- Next.js with Turbopack enabled for faster development builds

### Testing
The project has Jest and React Testing Library configured but no test script in package.json yet. Test files should use:
- `@testing-library/react` for component testing
- `@testing-library/user-event` for user interaction simulation
- Jest with ts-jest for TypeScript support