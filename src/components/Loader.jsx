import { motion } from 'framer-motion'

export default function Loader({ config }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-center"
      >
        {config?.gymName || "Jenga Gym"}
      </motion.div>
      <motion.div 
        className="mt-8 w-48 h-1 bg-surface rounded-full overflow-hidden"
      >
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}
