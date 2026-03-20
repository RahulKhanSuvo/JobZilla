import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Error() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 relative overflow-hidden px-4 font-sans leading-none transition-colors duration-500">
      {/* Dynamic Background Elements - Adaptive for both themes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="text-center relative z-10 space-y-2 max-w-3xl mx-auto">
        {/* Animated 404 Mascot Scene */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* 404 Background Text - Adaptive contrast */}
            <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-slate-100 dark:text-slate-900/40 select-none transition-colors">
              404
            </h1>

            {/* Confused Jobzilla Mascot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                y: [0, -20, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-48 h-48 md:w-64 md:h-64 fill-emerald-500 drop-shadow-[0_20px_40px_rgba(16,185,129,0.2)] dark:drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mascot Body */}
                <path d="M75 35 C85 35 90 45 90 55 C90 75 70 85 50 85 C30 85 10 75 10 55 C10 40 25 30 40 30 C45 30 50 25 55 20 C60 15 70 15 75 20 L75 35 Z" />

                {/* Confused Eyebrows */}
                <motion.path
                  d="M62 38 L70 34"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: [-20, 20, -20] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.path
                  d="M75 34 L83 38"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: [20, -20, 20] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Eye (Looking around) */}
                <motion.circle cx="70" cy="45" r="4" fill="white" />
                <motion.circle
                  cx="71"
                  cy="45"
                  r="2"
                  fill="black"
                  animate={{
                    x: [-2, 2, -2],
                    y: [-1, 1, -1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Confused Mouth */}
                <motion.path
                  d="M65 65 Q75 60 85 65"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Briefcase laying on ground */}
                <motion.g
                  transform="translate(15, 75) rotate(-15)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <rect
                    width="25"
                    height="18"
                    rx="2"
                    fill="#059669"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 0 L7 -4 Q7 -8 12 -8 T18 -4 L18 0"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic transition-colors">
              ZILLA IS <span className="text-emerald-500">LOST!</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed font-semibold transition-colors">
              Even monsters lose their way sometimes. This page decided to stomp
              away into the shadows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Link to="/">
              <Button
                size="lg"
                className="px-10 py-7 text-lg font-bold bg-primary hover:bg-primary/80 text-white rounded shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 border-none"
              >
                Return to Safety
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-7 text-lg font-bold border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-600 dark:hover:text-slate-300 rounded transition-all"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Footer Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          className="text-slate-400 dark:text-slate-600 text-sm font-bold uppercase tracking-[0.3em] pt-12"
        >
          Error 404 - Page Smashed
        </motion.p>
      </div>
    </div>
  );
}
