# 💼 JobZilla - Modern Job Recruitment Platform

JobZilla is a premium, high-performance job portal designed to bridge the gap between talented candidates and top-tier recruiters. Built with a cutting-edge tech stack, it offers a seamless, interactive, and visually stunning experience for all users.

---

## 🚀 Key Features

### 👤 For Candidates
- **Enhanced Profile Management**: Showcase your professional journey with detailed education, skills, and work experience.
- **Smart Job Search**: Filter and find the perfect role matching your expertise.
- **Application Tracking**: Keep tabs on your job applications with real-time status updates (Pending, Shortlisted, Hired).

### 🏢 For Recruiters
- **Company Branding**: Build a professional company profile to attract top talent.
- **Seamless Job Posting**: Post, manage, and track job openings with ease.
- **Applicant Management**: Streamlined workflow to review, shortlist, and hire candidates.

---

## 🛠 Tech Stack

The client is built using a modern toolchain for maximum performance and a premium developer experience:

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Rich Text Editing**: [Jodit React](https://github.com/xdanilov/jodit-react)

---

## 🛠 Installation & Setup

Ensure you have [Bun](https://bun.sh/) installed for the best experience.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JobZilla/Client
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `Client` directory and add necessary variables (e.g., API URL).

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Build for production**
   ```bash
   bun run build
   ```

---

## 📁 Project Structure

```text
src/
├── assets/         # Images, fonts, and static assets
├── components/     # Reusable UI components (shadcn/ui, etc.)
├── hooks/          # Custom React hooks
├── layouts/        # Page layout wrappers
├── lib/            # External library configurations
├── pages/          # Full page components
├── providers/      # Context providers (Redux, Themes)
├── redux/          # Global state management slices
├── routes/         # Application routing configuration
└── utils/          # Helper functions and constants
```

---

## 🎨 UI & UX Philosophy

JobZilla prioritizes **Visual Excellence** and **Interactive Design**:
- **Glassmorphism & Gradients**: Modern, high-end aesthetics.
- **Micro-animations**: Subtle interactions using Framer Motion to enhance user engagement.
- **Responsive Layouts**: Optimized for seamless viewing across all device types.

---

Made with ❤️ by the JobZilla Team.
