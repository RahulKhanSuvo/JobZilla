import Container from "@/components/common/Container";
import Paragraph from "@/components/common/Paragraph";
import Stack from "@/components/common/Stack";
import heroImage from "@/assets/background/thumb2.png";
import { motion } from "motion/react";
import badge1 from "@/assets/Icons/icon1.png";
import badge2 from "@/assets/Icons/icon2.png";
import badge3 from "@/assets/Icons/icon3.png";

export default function AboutHero() {
  return (
    <section className="py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 w-full max-w-lg mx-auto">
              <img
                src={heroImage}
                alt="About JobZilla"
                className="w-full h-auto object-contain"
              />
              {/* badges */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 left-2 z-10 hidden sm:block"
              >
                <img src={badge1} alt="badge1" className="size-15" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-3/12 left-25 z-10 hidden sm:block"
              >
                <img src={badge2} alt="badge2" className="size-15" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1/4 -right-4 sm:-right-10 z-10 shadow-lg"
              >
                <img src={badge3} alt="badge3" className="size-15" />
              </motion.div>

              {/* Floating Cards - Simplified representation */}
              <div className="absolute top-1/4 -right-4 sm:-right-10 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 animate-bounce-slow">
                <p className="text-3xl font-bold">25M+</p>
                <p className="text-xs text-slate-500">Jobs Available</p>
              </div>

              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1/4 -left-4 sm:-left-10 bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-full shadow-xl border border-slate-100 dark:border-slate-800 animate-float"
              >
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-emerald-600">
                      400+
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold">Happy Candidates</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <Stack gap="sm">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                About Us
              </h2>
              <Paragraph className="text-lg text-slate-600 dark:text-slate-400">
                Far much that one rank beheld blue and after outside ignobly
                allegedly more when oh elegantly well neat irresolutely fuzzy
                penguin insect and blindly view absolutely crudely meticulously
                hastily dalmatian a glowered least one echidna ceremony.
              </Paragraph>
              <Paragraph className="text-slate-500 dark:text-slate-400">
                Repeatedly dreamed a alas accompaniment dramatically despite
                expeditiously that prepared vary glass that more structure
                beneath kept and slept compactly far pure dare abidingly up
                above thing to standard wiped set waywardly far the and penguin
                more approving past that last caraway oh above launch
                appropriate far much typically more therefore was less that hey
                apart well like while suddenly on and whence one.
              </Paragraph>
            </Stack>
          </div>
        </div>
      </Container>
    </section>
  );
}
