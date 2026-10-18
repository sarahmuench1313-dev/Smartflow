# Smartflow — starter prototype

A mobile-first business-finance onboarding prototype using Next.js, TypeScript, Tailwind CSS, Lucide icons, and Recharts-ready dependencies.

## Run locally

1. Install Node.js LTS from https://nodejs.org if it is not installed.
2. Unzip this folder.
3. Open a terminal in this folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open http://localhost:3000

## Included in this first prototype

- Cream background and black action panel inspired by the supplied mobile reference.
- Home screen with Interview, Import, and Questions.
- Six phases: Business basics, Revenue, Expenses, Assets & debts, Import documents, Review & questions.
- Manual entry for basic business financial information.
- Client-side file selection that shows filenames only.
- Simple illustrative monthly cash flow calculation.
- Mobile-first responsive layout.

## Important limitations

This is a UI prototype, not a production financial application. It does not securely store information, upload or parse document contents, authenticate users, connect to Plaid, or call OpenAI. Do not enter sensitive or real financial data. The summary is a simple arithmetic snapshot and is not professional financial advice.

## Suggested next milestones

1. Persist user-entered information securely.
2. Add authentication and business workspaces.
3. Add server-side file upload, type validation, malware scanning, and document parsing.
4. Add a server-side OpenAI integration to generate follow-up questions and explain financial metrics, with human review.
5. Add validated financial-health metrics and Recharts visualizations.
6. Add Plaid only after consent, access controls, and secure token handling are designed.

Keep API keys on the server in environment variables; never put secrets in browser code.
