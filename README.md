# Cognitive Edge Website

Official website for Cognitive Edge LTD ("Intelligence Beyond Reality").

## Prerequisites
* Node.js (v18 or higher recommended)
* npm

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Deploying to Vercel

When importing your project into Vercel, use the following configuration settings:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | **Vite** |
| **Root Directory** | `./` (default) |
| **Build Command** | `vite build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

A `vercel.json` file is already included in the root directory to handle SPA rewrites and routing automatically.

