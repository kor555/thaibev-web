# ThaiBev Quiz

A Vue 3 quiz frontend built with TypeScript and Vite. It loads quiz questions from an API and lets a student select answers and submit the quiz.

## Requirements

- Node.js `22.18` or later in the 22.x line, or `24.12` or later
- npm
- The quiz API running locally at `http://localhost:8080` (unless configured otherwise)

## Setup

1. Clone or download this repository and open a terminal in the project directory.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the quiz API at `http://localhost:8080`.
4. Start the frontend development server:

   ```sh
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## API configuration

The frontend requests quiz questions from `/api/question`. During development, Vite proxies `/api` requests to `http://localhost:8080`, avoiding browser CORS restrictions. The API must be running for questions to load.

If the API runs on another host or port, update the proxy `target` in `vite.config.ts`. Alternatively, create a `.env.local` file in the project root to set the API base URL directly:

```dotenv
VITE_API_ENDPOINT=http://localhost:8080
```

The configured endpoint is used as the API base URL, with `/api` appended by the frontend. When setting a different endpoint, the API server must allow requests from the frontend origin (for example, `http://localhost:5173`) if the browser connects to it directly.

## Available commands

```sh
npm run dev        # Start the development server
npm run type-check # Run Vue/TypeScript type checking
npm run build      # Type-check and create a production build in dist/
npm run preview    # Preview the production build locally
```
