# Kenome Frontend Task

This project is a frontend application built using the [T3 Stack](https://create.t3.gg/), which includes modern technologies like Next.js, Tailwind CSS, and TypeScript. It is bootstrapped with `create-t3-app`.

## Features

- **Next.js**: A React framework for building server-rendered and static web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Radix UI**: Accessible, unstyled UI components for building custom designs.
- **React Query**: Powerful data-fetching and state management for React.
- **Zustand**: A small, fast, and scalable state-management library.
- **Prettier**: Code formatting with Tailwind CSS plugin.
- **ESLint**: Linting for consistent and error-free code.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 18.0.0)
- pnpm (>= 9.11.0)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd kenome-fe-task
   ```
2. Install dependencies:

   ```
   pnpm install
   ```
3. Create a `.env` file by copying `.env.example`:

   ```
   cp .env.example .env
   ```

   Populate the [.env](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) file with the required environment variables.

### Development

To start the development server:

```
pnpm dev
```

The application will be available at [http://localhost:3000](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).

### Build

To build the application for production:

```
pnpm build
```

### Linting and Formatting

* Run ESLint:

  ```
  pnpm lint
  ```
* Fix linting issues:

  ```
  pnpm lint:fix
  ```
* Check code formatting:

  ```
  pnpm format:check
  ```
* Format code:

  ```
  pnpm format:write
  ```

### Type Checking

To check for TypeScript errors:

```
pnpm typecheck
```

## Deployment

Follow the deployment guides for:

* [Vercel](https://create.t3.gg/en/deployment/vercel)
* [Netlify](https://create.t3.gg/en/deployment/netlify)
* [Docker](https://create.t3.gg/en/deployment/docker)

## Learn More

To learn more about the technologies used in this project:

* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [React Query Documentation](https://tanstack.com/query/latest/docs/react)
* [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
