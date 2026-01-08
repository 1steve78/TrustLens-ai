Perfect. Here’s a **clean, copy-paste–ready `README.md`** that fits **TrustLens** as a serious security product.
No fluff, no cringe, startup-grade.

---

```md
# TrustLens 🔐

TrustLens is a digital safety platform designed to help users detect scams, verify content authenticity, and protect themselves online using modern security techniques and AI-assisted analysis.

---

## 🚀 Features

- **Scanning Suspicious Links**  
  Analyze URLs in real time to detect phishing, malware, and scam infrastructure before interacting with them.

- **Deepfake Detection**  
  Identify AI-generated images, videos, and impersonation attempts using forensic analysis.

- **Learn From Latest Scams**  
  Stay updated with real-world scam patterns, attack techniques, and emerging digital threats.

- **Real Scam Simulation**  
  Experience controlled scam scenarios to understand how attacks work and how to respond safely.

- **Community Experience Hub**  
  Share experiences, report incidents, and learn from others in a trusted, moderated community.

---

## 🛡️ Why TrustLens?

- Privacy-first design
- Calm, secure user experience
- No invasive tracking
- Built for education, prevention, and protection
- Designed to scale with new threat intelligence

---

## 🧱 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** API routes, secure middleware  
- **Auth:** Cookie-based authentication  
- **UI:** Glassmorphism, dark security-first theme  
- **Deployment:** Vercel 

---

## 🔒 Privacy & Security

- Uploaded content is processed only for analysis
- Media is not shared publicly
- Data is handled using secure, industry-standard practices
- No selling of user data

Read more in our [Privacy Policy](/privacy).

---

## 📁 Project Structure Overview

This project is built using **Next.js (App Router)** with TypeScript, Tailwind CSS, Prisma, and a modular architecture designed for scalability and security-focused features.

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
  - Migrations
  - Database-related configuration

- **public/**  
  Static assets such as images, icons, and favicons.

- **src/**  
  Main application source code (frontend + backend logic).

---

### ⚙️ Top-Level Configuration Files

- **.env**  
  Environment variables (API keys, secrets). Never commit to version control.

- **.gitignore**  
  Git ignore rules.

- **components.json**  
  UI system or component library configuration (e.g. shadcn/ui).

- **eslint.config.mjs**  
  ESLint rules and linting configuration.

- **next-env.d.ts**  
  Auto-generated Next.js TypeScript type definitions.

- **next.config.ts**  
  Next.js configuration.

- **package.json / package-lock.json**  
  Project dependencies and npm scripts.

- **postcss.config.mjs**  
  PostCSS configuration.

- **prisma.config.ts**  
  Prisma-specific configuration.

- **tailwind.config.ts**  
  Tailwind CSS configuration and theme setup.

- **tsconfig.json**  
  TypeScript compiler configuration.

- **README.md**  
  Project documentation.

---

### 🌐 App Router Structure (`src/app/`)

This project uses the **Next.js App Router**.

- **layout.tsx**  
  Root layout for the entire application.

- **page.tsx**  
  Root (`/`) landing page.

- **globals.css**  
  Global styles and theme definitions.

- **favicon.ico**  
  Application favicon.

#### Route Groups & Pages

- **app/home/**  
  Main authenticated application experience.
  - Includes nested routes and learning-related pages
  - Example utilities:  
    `home/learning/lib/getScamBriefs.ts`

- **app/learn-more/**  
  Marketing and informational pages.

- **app/privacy/**  
  Privacy policy and privacy-related content.

- **app/auth/**  
  Authentication pages (login, signup, etc.).

- **app/api/auth/**  
  Authentication API routes  
  (e.g. `app/api/auth/login/route.ts`).

- **app/api/**  
  Additional serverless API route handlers.

---

### 🧩 Components (`src/components/`)

Reusable React components.

- **Top-level components**
  - Feature-specific components (e.g. `AddSignalModal.tsx`)
  - Shared layout and presentation components

- **components/learn-more/**  
  Components specific to the “Learn More” section.

- **components/ui/**  
  Generic, reusable UI primitives (buttons, inputs, modals, etc.).

---

### 🧠 Shared Logic & Utilities (`src/lib/`)

Centralized backend and shared logic.

- **ai.ts**  
  AI-related helpers and integrations.

- **auth.ts**  
  Authentication utilities.

- **cloudinary.ts**  
  Media upload and Cloudinary helpers.

- **ethics.ts**  
  Policy or ethics-related checks.

- **hashtag.ts**  
  Hashtag parsing and formatting utilities.

- **metadata.ts**  
  SEO and metadata helpers.

- **prisma.ts**  
  Prisma client instance.

- **rateLimit.ts**  
  Rate limiting logic.

- **rules.ts**  
  Business rules and validation logic.

- **utils.ts**  
  General helper utilities.

---

### 🧱 Middleware

- **src/middleware.ts**  
  Next.js middleware for request handling at the edge  
  (authentication, logging, access control, etc.).

---

### ✅ Architecture Goals

- Modular and scalable
- Security-first design
- Clear separation of concerns
- App Router–native patterns
- Easy to extend with new features and API routes


---

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
````

---

## 📌 Roadmap

* Video deepfake scanning
* Browser extension
* Real-time alert system
* Public threat database
* Advanced community moderation tools

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.
Open an issue or submit a pull request to get involved.

---

## 📬 Contact

* **Email:** [support@trustlens.ai](mailto:support@trustlens.ai)
* **Website:** [https://trustlens.ai](https://trustlens.ai)

---

## 📄 License

This project is licensed under the MIT License.

