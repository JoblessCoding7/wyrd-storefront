# WYRD Storefront

The frontend foundation for the WYRD headless Shopify storefront. This repository currently contains a minimal Next.js application; product data and commerce features will be added in later work.

## Requirements

- Node.js 20.9 or newer
- npm

## Installation

```bash
npm install
cp .env.example .env.local
```

The example environment file contains placeholders only. No Shopify connection is required for the starter application.

## Local development

Start the development server and open [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project structure

- `src/app` — App Router layouts, pages, and global styles
- `src/lib` — framework-independent utilities
- `src/**/*.test.ts` — Vitest tests colocated with the code they cover

Shopify integration, storefront features, and the Figma-based interface are intentionally outside the initial foundation.
