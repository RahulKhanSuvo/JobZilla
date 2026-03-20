import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface JobzillaLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function JobzillaLogo({
  className,
  iconOnly = false,
}: JobzillaLogoProps) {
  return (
    <motion.div
      className={cn("flex items-center gap-2", className)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Godzilla/Zilla Icon */}
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "size-10 text-primary fill-current",
          iconOnly ? "size-12" : "size-10",
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Dinosaur Head / Profile */}
          <path d="M75 35 C85 35 90 45 90 55 C90 75 70 85 50 85 C30 85 10 75 10 55 C10 40 25 30 40 30 C45 30 50 25 55 20 C60 15 70 15 75 20 L75 35 Z" />

          {/* Back Spikes */}
          <path d="M35 30 L25 15 L45 25 Z" />
          <path d="M50 22 L45 5 L60 18 Z" />
          <path d="M65 20 L65 2 L75 15 Z" />

          {/* Eye */}
          <circle cx="70" cy="45" r="4" fill="white" />
          <motion.circle
            cx="71"
            cy="45"
            r="2"
            fill="black"
            animate={{ scaleY: [1, 0, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
          />

          {/* Smile/Mouth */}
          <path
            d="M65 65 Q75 65 85 55"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Briefcase (Job part) */}
          <motion.g
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect
              x="25"
              y="55"
              width="30"
              height="20"
              rx="2"
              fill="#10b981"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M35 55 L35 50 Q35 45 40 45 T45 50 L45 55"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </motion.g>
        </motion.g>
      </svg>

      {!iconOnly && (
        <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors">
          Job<span className="text-primary">Zilla</span>
        </span>
      )}
    </motion.div>
  );
}
