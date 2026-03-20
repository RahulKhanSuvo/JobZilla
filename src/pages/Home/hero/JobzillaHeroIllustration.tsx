import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";

export default function JobzillaHeroIllustration() {
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Memoize star data with hardcoded delays to satisfy purity rules and keep values stable
  const starsData = useMemo(
    () => [
      { x: 100, y: 50, d: 2, s: 1.2, rd: 8.5 },
      { x: 400, y: 80, d: 5, s: 0.8, rd: 12.2 },
      { x: 250, y: 30, d: 8, s: 1.5, rd: 6.7 },
      { x: 600, y: 40, d: 11, s: 1.0, rd: 9.4 },
    ],
    [],
  );

  // ---- Theme colour tokens ----
  const skyTop = isDark ? "#0f172a" : "#7dd3fc"; // Much softer light blue
  const skyBot = isDark ? "#1e293b" : "#f1f5f9"; // Soft grayish-white bottom
  const farBldg = isDark ? "#334155" : "#64748b"; // Slightly lighter for distance
  const midBldg = isDark ? "#1e293b" : "#94a3b8";
  const mainBldg = isDark ? "#0f172a" : "#e2e8f0";
  const mainStroke = isDark ? "#1e293b" : "#cbd5e1";
  const winColor = isDark ? "#fbbf24" : "#bae6fd"; // Softer window reflection
  const mainWin = isDark ? "#10b981" : "#7dd3fc";
  const particle = isDark ? "#10b981" : "#38bdf8";
  const glowFill = isDark ? "#10b981" : "#38bdf8";
  const cloudBase = isDark ? 0.05 : 0.85; // Fluffier white clouds on light sky

  return (
    <motion.svg
      viewBox="0 0 800 600"
      className="w-full h-full object-contain"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} stopOpacity={1} />
          <stop offset="100%" stopColor={skyBot} stopOpacity={1} />
        </linearGradient>

        {/* Sun radial glow (day only) */}
        <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#fde047" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={glowFill} stopOpacity="0.25" />
          <stop offset="100%" stopColor={glowFill} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Sky ── */}
      <rect width="800" height="600" fill="url(#skyGrad)" />

      {/* ── SUN / MOON ── */}
      {!isDark ? (
        <motion.g>
          {/* big diffuse halo */}
          <motion.circle
            cx="690"
            cy="100"
            r="130"
            fill="url(#sunAura)"
            animate={{ r: [130, 150, 130], opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* sun disc */}
          <motion.circle
            cx="690"
            cy="100"
            r="46"
            fill="#fde047"
            animate={{ r: [46, 50, 46] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (deg, i) => {
              const r = (deg * Math.PI) / 180;
              return (
                <motion.line
                  key={i}
                  x1={690 + Math.cos(r) * 57}
                  y1={100 + Math.sin(r) * 57}
                  x2={690 + Math.cos(r) * 80}
                  y2={100 + Math.sin(r) * 80}
                  stroke="#fef08a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              );
            },
          )}
        </motion.g>
      ) : (
        <motion.g>
          {/* moon halo */}
          <motion.circle
            cx="690"
            cy="100"
            r="100"
            fill="white"
            opacity="0.1"
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* moon disc */}
          <circle cx="690" cy="100" r="35" fill="#f1f5f9" />
          {/* moon crater details */}
          <circle cx="680" cy="90" r="6" fill="#cbd5e1" opacity="0.4" />
          <circle cx="705" cy="110" r="4" fill="#cbd5e1" opacity="0.4" />
          <circle cx="695" cy="85" r="3" fill="#cbd5e1" opacity="0.4" />
        </motion.g>
      )}

      {/* ── SHOOTING STARS (dark mode) ── */}
      {isDark && (
        <motion.g>
          {starsData.map((star, i) => (
            <motion.g
              key={i}
              initial={{ x: star.x, y: star.y, opacity: 0, scale: 0 }}
              animate={{
                x: [star.x, star.x + 300],
                y: [star.y, star.y + 150],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: star.s,
                repeat: Infinity,
                repeatDelay: star.rd,
                delay: star.d,
                ease: "easeIn",
              }}
            >
              <line
                x1="0"
                y1="0"
                x2="-50"
                y2="-25"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
              <circle cx="0" cy="0" r="2" fill="white" />
            </motion.g>
          ))}
        </motion.g>
      )}

      {/* ── BIRDS (light mode) ── */}
      {!isDark && (
        <motion.g
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        >
          <motion.path
            d="M0 0 Q6 -6 12 0 Q18 -6 24 0"
            animate={{ x: [-60, 860], y: [130, 105, 140, 115] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M0 0 Q5 -5 10 0 Q15 -5 20 0"
            animate={{ x: [-100, 860], y: [165, 145, 170, 150] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
              delay: 6,
            }}
          />
          <motion.path
            d="M0 0 Q4 -4 8 0 Q12 -4 16 0"
            animate={{ x: [-30, 860], y: [210, 195, 215] }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "linear",
              delay: 13,
            }}
          />
        </motion.g>
      )}

      {/* ── CLOUDS ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.path
          d="M90 115 Q120 92 155 105 T220 118 T280 105 T335 128 T275 152 T210 140 T148 152 T90 132 Z"
          fill="white"
          animate={{
            x: [-20, 45, -20],
            opacity: [cloudBase, cloudBase * 1.5, cloudBase],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M490 75 Q514 62 540 74 T582 82 T624 70 T585 100 T538 94 T490 100 Z"
          fill="white"
          animate={{
            x: [0, -35, 0],
            opacity: [cloudBase * 0.9, cloudBase * 1.4, cloudBase * 0.9],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.path
          d="M395 195 Q428 174 462 186 T525 200 T462 226 T395 216 Z"
          fill="white"
          animate={{
            x: [-12, 22, -12],
            opacity: [cloudBase * 0.7, cloudBase * 1.2, cloudBase * 0.7],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.path
          d="M45 248 Q78 228 112 240 T165 252 T110 272 T45 262 Z"
          fill="white"
          animate={{
            x: [22, -22, 22],
            opacity: [cloudBase * 0.8, cloudBase * 1.3, cloudBase * 0.8],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.g>

      {/* ── DISTANT BUILDINGS ── */}
      <motion.g
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {[
          "M20 600 L20 480 L70 480 L70 600 Z",
          "M50 600 L50 450 L100 450 L100 600 Z",
          "M80 600 L80 370 L130 370 L130 600 Z",
          "M120 600 L120 400 L180 400 L180 600 Z",
          "M155 600 L155 460 L185 460 L185 600 Z",
          "M200 600 L200 480 L250 480 L250 600 Z",
          "M240 600 L240 395 L280 395 L280 600 Z",
          "M260 600 L260 420 L310 420 L310 600 Z",
          "M310 600 L310 470 L340 470 L340 600 Z",
          "M470 600 L470 455 L505 455 L505 600 Z",
          "M520 600 L520 440 L570 440 L570 600 Z",
          "M550 600 L550 420 L620 420 L620 600 Z",
          "M625 600 L625 380 L660 380 L660 600 Z",
          "M650 600 L650 460 L720 460 L720 600 Z",
          "M720 600 L720 390 L750 390 L750 600 Z",
          "M740 600 L740 430 L780 430 L780 600 Z",
          "M775 600 L775 470 L800 470 L800 600 Z",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill={farBldg}
            opacity={i % 3 === 0 ? 0.2 : 0.35}
          />
        ))}
      </motion.g>

      {/* ── MID BUILDINGS with windows ── */}
      <motion.g
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <path d="M0 600 L0 520 L80 520 L80 600 Z" fill={midBldg} />
        {[
          { x: 20, y: 540, d: 0.2 },
          { x: 50, y: 540, d: 1.5 },
        ].map(({ x, y, d }, i) => (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width="10"
            height="10"
            fill={winColor}
            animate={{ fillOpacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, delay: d }}
          />
        ))}

        <path d="M100 600 L100 540 L160 540 L160 600 Z" fill={midBldg} />
        <motion.rect
          x="120"
          y="560"
          width="8"
          height="8"
          fill={winColor}
          animate={{ fillOpacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />

        <path d="M600 600 L600 530 L670 530 L670 600 Z" fill={midBldg} />
        <motion.rect
          x="620"
          y="550"
          width="12"
          height="12"
          fill={winColor}
          animate={{ fillOpacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
        />

        <path d="M700 600 L700 500 L800 500 L800 600 Z" fill={midBldg} />
        {[
          { x: 730, d: 0.8 },
          { x: 760, d: 2.1 },
        ].map(({ x, d }, i) => (
          <motion.rect
            key={i}
            x={x}
            y="520"
            width="10"
            height="10"
            fill={winColor}
            animate={{ fillOpacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: d }}
          />
        ))}
      </motion.g>

      {/* ── MAIN SKYSCRAPER ── */}
      <motion.g
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <path
          d="M300 600 L300 350 L500 350 L500 600 Z"
          fill={mainBldg}
          stroke={mainStroke}
          strokeWidth="2"
        />
        {[330, 360, 390, 420, 455].map((x, i) => (
          <motion.rect
            key={x}
            x={x}
            y={380}
            width={15}
            height={15}
            fill={mainWin}
            animate={{ fillOpacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </motion.g>

      {/* ── JOBZILLA MASCOT ── */}
      <motion.g
        transform="translate(340, 240) scale(1.5)"
        animate={{
          y: [0, -15, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.7, rotate: 5 }}
      >
        {/* Backdrop — keeps mascot readable against bright sky */}
        {!isDark && (
          <>
            {/* Outer soft halo */}
            <motion.circle
              cx="50"
              cy="45"
              r="80"
              fill="white"
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Inner solid fog */}
            <circle cx="50" cy="45" r="60" fill="white" opacity="0.5" />
          </>
        )}

        {/* Ground Glow */}
        <motion.ellipse
          cx="50"
          cy="95"
          rx="45"
          ry="12"
          fill="url(#glowGrad)"
          animate={{
            rx: [45, 60, 45],
            ry: [12, 18, 12],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Body (Jobzilla Official Shape) */}
        <path
          fill="#10b981"
          d="M75 35 C85 35 90 45 90 55 C90 75 70 85 50 85 C30 85 10 75 10 55 C10 40 25 30 40 30 C45 30 50 25 55 20 C60 15 70 15 75 20 L75 35 Z"
        />

        {/* Official Back Spikes */}
        <path fill="#059669" d="M35 30 L25 15 L45 25 Z" />
        <path fill="#059669" d="M50 22 L45 5 L60 18 Z" />
        <path fill="#059669" d="M65 20 L65 2 L75 15 Z" />

        {/* Official Eye */}
        <circle cx="70" cy="45" r="4" fill="white" />
        <motion.circle
          cx="71"
          cy="45"
          r="2"
          fill="black"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Official Smile/Mouth */}
        <path
          d="M65 65 Q75 65 85 55"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Briefcase (Official Style) */}
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
            fill="#059669"
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

      {/* ── PARTICLES ── */}
      <motion.circle
        cx="100"
        cy="100"
        r="5"
        fill={particle}
        animate={{ x: [0, 20, 0], y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="700"
        cy="150"
        r="8"
        fill={particle}
        animate={{ x: [0, -30, 0], y: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.rect
        x="600"
        y="80"
        width="40"
        height="2"
        fill={particle}
        rx="1"
        animate={{ x: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.rect
        x="150"
        y="200"
        width="30"
        height="2"
        fill={particle}
        rx="1"
        animate={{ x: [0, -50, 0], y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </motion.svg>
  );
}
