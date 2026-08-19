# WYRD Storefront agent instructions

## Project

WYRD Storefront is a custom headless Shopify storefront. The current foundation uses Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint, and Vitest, with application code under `src/`.

Figma is the visual source of truth. Preserve the custom WYRD art direction; do not replace it with generic storefront styling. The architecture must support both reusable standard product pages and bespoke, immersive product experiences.

Shopify will eventually own products, variants, pricing, inventory, cart, checkout, and orders. Do not create custom commerce infrastructure unless an issue specifically requires it.

## Workflow and permissions

Follow: Issue → branch → design → implementation → validation → commit → push → PR → review → merge → close Issue.

- Never work directly on `main`; use an issue-specific branch.
- Never commit, push, create a PR, merge, or close an issue unless explicitly instructed.
- Keep work scoped to the issue. Avoid unrelated changes and unnecessary dependencies.

## Development conventions

- Keep TypeScript strict. Prefer Server Components and add Client Components only when browser interactivity requires them.
- Use clear domain types and avoid `any` or unsafe casts.
- Use Tailwind utilities for responsive, accessible styling; extract shared components or tokens when repetition warrants it.
- Never commit secrets. Keep local values in ignored environment files and document placeholders in `.env.example`.
- Before completing implementation work, run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`; fix every failure.
