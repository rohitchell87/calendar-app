# Interactive Wall Calendar

This project implements an interactive React calendar component inspired by a wall calendar design.

## Features

- Wall calendar aesthetic with hero imagery and clean layout
- Date range selector with start / end / in-range highlight states
- Notes area for month-level notes or range-specific notes
- Fully responsive design for desktop and mobile
- Local persistence with `localStorage`

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite.

## Implementation details

- `src/App.jsx`: main calendar component, range selection logic, note persistence, responsive UI
- Uses React + Vite + Tailwind CSS
- Designed as a frontend-only component with no backend

## Notes

- General notes are saved per month.
- If a date range is selected, notes are saved specifically for that range.
- The layout adapts from a stacked mobile layout to a split desktop view.
