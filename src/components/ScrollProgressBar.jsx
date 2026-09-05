import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left pointer-events-none"
      style={{
        scaleX,
        backgroundColor: 'var(--primary)',
        boxShadow: '0 0 10px var(--primary), 0 0 5px var(--primary)'
      }}
    />
  )
}
