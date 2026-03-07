import { motion } from "framer-motion";

export default function JobzillaLoading() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background ambient glow */}
      <motion.div
        className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Mascot Mascot Animation */}
        <motion.div
          className="relative w-32 h-32"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full fill-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mascot: The Jobzilla (Simplified for Loading) */}
            <motion.path
              d="M75 35 C85 35 90 45 90 55 C90 75 70 85 50 85 C30 85 10 75 10 55 C10 40 25 30 40 30 C45 30 50 25 55 20 C60 15 70 15 75 20 L75 35 Z"
              animate={{
                d: [
                  "M75 35 C85 35 90 45 90 55 C90 75 70 85 50 85 C30 85 10 75 10 55 C10 40 25 30 40 30 C45 30 50 25 55 20 C60 15 70 15 75 20 L75 35 Z",
                  "M75 38 C85 38 90 48 90 58 C90 78 70 88 50 88 C30 88 10 78 10 58 C10 43 25 33 40 33 C45 33 50 28 55 23 C60 18 70 18 75 23 L75 38 Z",
                  "M75 35 C85 35 90 45 90 55 C90 75 70 85 50 85 C30 85 10 75 10 55 C10 40 25 30 40 30 C45 30 50 25 55 20 C60 15 70 15 75 20 L75 35 Z",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Spikes Pulse */}
            <motion.g
              animate={{
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path d="M35 30 L25 15 L45 25 Z" />
              <path d="M50 22 L45 5 L60 18 Z" />
              <path d="M65 20 L65 2 L75 15 Z" />
            </motion.g>

            {/* Eye Blink */}
            <motion.circle
              cx="70"
              cy="45"
              r="4"
              fill="white"
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.95, 1],
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Stomp Wave Effect */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-emerald-500/20 rounded-full blur-sm"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="text-white text-2xl font-black tracking-tighter"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Job<span className="text-emerald-500">Zilla</span>
          </motion.div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <motion.p
        className="absolute bottom-10 text-slate-500 text-sm font-bold uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Waking up the monster...
      </motion.p>
    </div>
  );
}
