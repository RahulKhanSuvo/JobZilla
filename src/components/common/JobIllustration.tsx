import { motion } from "framer-motion";

export type IllustrationType =
  | "design"
  | "tech"
  | "management"
  | "marketing"
  | "default";

interface JobIllustrationProps {
  type: IllustrationType;
  className?: string;
}

export default function JobIllustration({
  type,
  className = "size-full",
}: JobIllustrationProps) {
  const renderIllustration = () => {
    switch (type) {
      case "design":
        return (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <motion.rect
              x="20"
              y="20"
              width="60"
              height="60"
              rx="12"
              className="fill-emerald-100 dark:fill-emerald-900/30 stroke-emerald-500"
              strokeWidth="2"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <motion.circle
              cx="40"
              cy="40"
              r="10"
              className="fill-emerald-500"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M50 60 L70 40"
              className="stroke-emerald-600"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ pathLength: [0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </svg>
        );
      case "tech":
        return (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <motion.path
              d="M30 40 L45 50 L30 60"
              className="stroke-blue-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.rect
              x="55"
              y="65"
              width="20"
              height="4"
              className="fill-blue-500"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <rect
              x="15"
              y="15"
              width="70"
              height="70"
              rx="8"
              className="stroke-blue-200 dark:stroke-blue-800"
              strokeWidth="2"
            />
          </svg>
        );
      case "management":
        return (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <motion.rect
              x="25"
              y="40"
              width="15"
              height="40"
              rx="4"
              className="fill-indigo-500"
              animate={{ height: [20, 40, 20] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.rect
              x="45"
              y="25"
              width="15"
              height="55"
              rx="4"
              className="fill-indigo-400"
              animate={{ height: [30, 55, 30] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <motion.rect
              x="65"
              y="45"
              width="15"
              height="35"
              rx="4"
              className="fill-indigo-300"
              animate={{ height: [15, 35, 15] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          </svg>
        );
      case "marketing":
        return (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <motion.path
              d="M20 80 Q50 20 80 80"
              className="stroke-rose-500"
              strokeWidth="4"
              fill="none"
              animate={{
                d: [
                  "M20 80 Q50 20 80 80",
                  "M20 80 Q50 40 80 80",
                  "M20 80 Q50 20 80 80",
                ],
              }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
            <motion.circle
              cx="80"
              cy="80"
              r="5"
              className="fill-rose-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </svg>
        );
      default:
        return (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              className="fill-slate-100 dark:fill-slate-800 stroke-slate-400"
              strokeWidth="2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <path
              d="M50 35 V65 M35 50 H65"
              className="stroke-slate-500"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className="size-full flex items-center justify-center p-2">
      {renderIllustration()}
    </div>
  );
}
