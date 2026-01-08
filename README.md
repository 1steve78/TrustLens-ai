# TrustLens 🔐

TrustLens is a digital safety platform built to help users detect scams, verify content authenticity, and protect themselves online using modern security techniques and AI-assisted analysis.

---

## 🚀 Features

- **Suspicious Link Scanning**  
  Analyze URLs in real time to identify phishing attempts, malware delivery, and scam infrastructure before interaction.

- **Deepfake Detection**  
  Detect AI-generated images, videos, and impersonation attempts using forensic and behavioral analysis.

- **Learn From Active Scams**  
  Stay informed about real-world scam patterns, attack vectors, and emerging digital threats.

- **Real Scam Simulation**  
  Experience controlled scam scenarios to understand attacker behavior and safe response strategies.

- **Community Experience Hub**  
  Share incidents, report scams, and learn from others in a trusted, moderated environment.

---

## 🛡️ Why TrustLens

- Privacy-first by design  
- Calm, security-focused user experience  
- No invasive tracking or profiling  
- Built for education, prevention, and protection  
- Designed to scale with evolving threat intelligence

---

## 🧱 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Serverless API routes, secure middleware  
- **Authentication:** Cookie-based authentication  
- **UI:** Dark, security-first theme with glassmorphism  
- **Deployment:** Vercel  

---

## 🔒 Privacy & Security

- Uploaded content is processed strictly for analysis purposes  
- Media is never shared publicly  
- Data handling follows industry-standard security practices  
- No selling or monetization of user data  

Read more in the [Privacy Policy](/privacy).

---

## 📁 Project Structure Overview

TrustLens is built using **Next.js (App Router)** with TypeScript, Tailwind CSS, Prisma, and a modular architecture focused on scalability and security.

---

### 🔧 Generated / Dependency Folders

- **.next/**  
  Next.js build and development output (auto-generated, not committed).

- **node_modules/**  
  Installed npm dependencies (auto-generated).

---

### 🗄️ Core Directories

- **prisma/**  
  Prisma ORM files including:
  - Schema definitions  
  - Database migrations  
  - Database configuration  

- **public/**  
  Static assets such as images, icons, and favicons.

- **src/**  
  Main application source code (frontend and backend logic).

---

### ⚙️ Top-Level Configuration Files

- **.env**  
  Environment variables (API keys, secrets). Never commit this file.

- **.gitignore**  
  Git ignore rules.

- **components.json**  
  UI system configuration (e.g. shadcn/ui).

- **eslint.config.mjs**  
  ESLint configuration.

- **next-env.d.ts**  
  Auto-generated Next.js TypeScript definitions.

- **next.config.ts**  
  Next.js configuration.

- **package.json / package-lock.json**  
  Project dependencies and npm scripts.

- **postcss.config.mjs**  
  PostCSS configuration.

- **prisma.config.ts**  
  Prisma configuration.

- **tailwind.config.ts**  
  Tailwind CSS theme and configuration.

- **tsconfig.json**  
  TypeScript compiler configuration.

- **README.md**  
  Project documentation.

---

### 🌐 App Router Structure (`src/app/`)

TrustLens uses the **Next.js App Router**.

- **layout.tsx**  
  Root layout for the application.

- **page.tsx**  
  Landing page (`/`).

- **globals.css**  
  Global styles and theme variables.

- **favicon.ico**  
  Application favicon.

#### Routes & Pages

- **app/home/**  
  Main authenticated user experience.  
  Includes nested routes and learning-related pages.  
  Example utility:  
  `home/learning/lib/getScamBriefs.ts`

- **app/learn-more/**  
  Informational and marketing pages.

- **app/privacy/**  
  Privacy policy and related content.

- **app/auth/**  
  Authentication pages (login, signup).

- **app/api/auth/**  
  Authentication API routes  
  (e.g. `app/api/auth/login/route.ts`).

- **app/api/**  
  Additional serverless API endpoints.

---

### 🧩 Components (`src/components/`)

Reusable React components.

- **Feature components**  
  Domain-specific UI (e.g. `AddSignalModal.tsx`).

- **components/learn-more/**  
  Components for informational pages.

- **components/ui/**  
  Shared UI primitives (buttons, inputs, modals).

---

### 🧠 Shared Logic & Utilities (`src/lib/`)

Centralized shared logic.

- **ai.ts** — AI integrations and helpers  
- **auth.ts** — Authentication utilities  
- **cloudinary.ts** — Media upload helpers  
- **ethics.ts** — Policy and safety checks  
- **hashtag.ts** — Hashtag utilities  
- **metadata.ts** — SEO helpers  
- **prisma.ts** — Prisma client instance  
- **rateLimit.ts** — Rate limiting logic  
- **rules.ts** — Business rules and validation  
- **utils.ts** — General utilities  

---

### 🧱 Middleware

- **src/middleware.ts**  
  Edge middleware for authentication, access control, and request handling.

---

### ✅ Architecture Goals

- Modular and scalable  
- Security-first design  
- Clear separation of concerns  
- App Router–native patterns  
- Easy extensibility for new features and APIs  

---

## 🧪 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
