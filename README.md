<div align="center">

![JobZilla Banner](./banner.png)

# JobZilla — Frontend

**React 19 · Vite 7 · TypeScript 5.9 · TailwindCSS 4**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📦 Tech Stack

| Library | Version | Role |
|---|---|---|
| **React** | 19 | UI framework (with React Compiler) |
| **Vite** | 7 | Build tool & dev server |
| **TypeScript** | 5.9 | Type safety |
| **TailwindCSS** | 4 | Utility-first styling |
| **Shadcn/UI** | 3 | Headless accessible components |
| **TanStack Form** | 0.41 | Form state management |
| **TanStack Zod Adapter** | 0.41 | Zod ↔ TanStack Form bridge |
| **Redux Toolkit** | 2 | Global state management |
| **React Redux** | 9 | React bindings for Redux |
| **React Router** | 7 | Client-side routing |
| **Zod** | 4 | Schema validation |
| **Framer Motion** | 12 | Animations & transitions |
| **GSAP** | 3 | Advanced scroll animations |
| **Swiper** | 12 | Carousels & sliders |
| **Jodit React** | 5 | Rich text / WYSIWYG editor |
| **Lucide React** | 0.575 | Icon library |
| **React Icons** | 5 | Extended icon library |
| **next-themes** | 0.4 | Dark / light mode management |
| **Sonner** | 2 | Toast notifications |
| **clsx + tailwind-merge** | – | Conditional class composition |

---

## 📁 Folder Structure

```
Client/
└── src/
    ├── assets/              # Static assets (images, fonts, etc.)
    ├── components/          # Shared, reusable UI components
    ├── hooks/               # Custom React hooks
    ├── layouts/             # Page layout wrappers
    ├── lib/                 # Utility helpers & API client
    ├── pages/
    │   ├── Home/            # Landing page
    │   ├── FindJob/         # Job search & filter
    │   ├── JobDetails/      # Single job view
    │   ├── About/
    │   ├── Contact/
    │   ├── Pricing/
    │   ├── PrivacyPolicy/
    │   ├── auth/            # Login & Register
    │   ├── errors/          # 404 / error pages
    │   ├── Candidate/       # Candidate portal
    │   │   ├── Dashbaord/
    │   │   ├── Profile/
    │   │   │   └── CandidateProfileEdit/
    │   │   ├── MyCv/
    │   │   ├── appliedJob/
    │   │   ├── SaveJobsPage/
    │   │   ├── FollowCompany/
    │   │   ├── JobVisitHistory.tsx
    │   │   ├── Notification/
    │   │   ├── message/
    │   │   └── settings/
    │   └── Recruiter/       # Recruiter portal
    │       ├── Dashboard/
    │       ├── Profile/
    │       ├── postjob/
    │       ├── myjob/
    │       ├── Applicants/
    │       └── applicantDetailPage/
    ├── providers/           # React context providers
    ├── redux/               # Redux store, slices & selectors
    ├── routes/              # Route definitions (React Router v7)
    ├── types/               # Global TypeScript types & interfaces
    ├── utils/               # Pure utility functions
    ├── index.css            # Global styles & Tailwind base
    └── main.tsx             # App entry point
```

---

## 🎨 Features

### 👤 Candidate Portal
- **Profile Editor** — Personal info, profile image, social links, career preference
- **Work Experience** — Add / edit / remove multiple experience entries
- **Education** — Add / edit / remove multiple education records
- **Skills** — Tag-based skill manager
- **CV Manager** — Upload resumes, set primary, manage drafts
- **Job Discovery** — Search, filter & browse live job listings
- **Job Apply** — Apply to a job with an attached resume
- **Saved Jobs** — Bookmark & revisit favorite listings
- **Application Tracker** — Real-time status (Pending / Shortlisted / Rejected / Hired)
- **Messaging** — In-app real-time-style chat UI
- **Notifications** — In-app activity alerts
- **Settings** — Account settings & preferences

### 🏢 Recruiter Portal
- **Company Profile** — Logo, cover, description, social links
- **Post a Job** — Rich-text job description with salary, type, skills & deadline
- **My Jobs** — View, edit & close job listings
- **Applicants** — Browse all applicants per posting
- **Applicant Detail** — Full candidate view with resume download & status update
- **Dashboard** — Stats overview panel

### 🌐 Public Pages
- Home (hero, featured jobs, categories)
- Find Jobs (search & filter)
- Job Details
- About, Contact, Pricing, Privacy Policy

---

## ⚙️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.1 **or** Node.js >= 20 (with npm/pnpm)

### Install dependencies

```bash
bun install
```

### Environment Variables

Create a `.env` file in the `Client/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

### Run the dev server

```bash
bun run dev
```

App runs at **http://localhost:5173**

### Build for production

```bash
bun run build
```

### Lint & format

```bash
bun run lint
```

---

## 📐 Code Quality

- **ESLint** — with `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `eslint-plugin-react-compiler`
- **Prettier** — auto-formatting on staged files
- **Husky + lint-staged** — pre-commit hooks enforce lint + format
- **CommitLint** — enforces [Conventional Commits](https://www.conventionalcommits.org/) on every commit

---

<div align="center">

Made with ❤️ using **React 19** + **Vite 7**

</div>
