import { motion } from 'framer-motion'

const WORDS = [
  "NO EXCUSES", "SWEAT IS MAGIC", "BEAST MODE", "TRAIN INSANE", "PUSH YOUR LIMITS", 
  "EMBRACE THE GRIND", "CRUSH GOALS", "DEFY GRAVITY", "ELEVATE", "STRENGTHEN"
]

export default function Marquee() {
  return (
    <div className="w-full bg-primary py-4 overflow-hidden flex whitespace-nowrap relative z-10 border-y-4 border-black">
      <motion.div
        className="flex items-center shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 60
        }}
        style={{ display: "flex", width: "fit-content" }}
      >
        {/* Render the array 4 times to ensure it spans completely and wraps cleanly */}
        {[...WORDS, ...WORDS, ...WORDS, ...WORDS, ...WORDS, ...WORDS, ...WORDS, ...WORDS].map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="text-white font-headline text-2xl md:text-4xl font-black italic uppercase tracking-wider px-8">
              {word}
            </span>
            <span className="text-white opacity-50">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
