import { motion } from 'framer-motion'

export default function MobileFloatingBar({ config, onOpenQuiz }) {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage || 'Hi! I would like to know more about Prestige Fitness.')}`

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-black/90 backdrop-blur-md border-t border-white/10"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-sm text-[11px] font-bold uppercase tracking-wider text-white border border-white/10 hover:border-green-500 transition-colors bg-surface"
        >
          <span className="text-sm text-green-400 mb-0.5">💬</span>
          <span>WhatsApp</span>
        </a>

        {/* Schedule */}
        <a
          href="/#schedule"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-sm text-[11px] font-bold uppercase tracking-wider text-white border border-white/10 hover:border-primary transition-colors bg-surface"
        >
          <span className="text-sm text-primary mb-0.5">📅</span>
          <span>Timetable</span>
        </a>

        {/* Free Trial / Quiz */}
        <button
          onClick={onOpenQuiz || (() => {
            document.getElementById('free-trial')?.scrollIntoView({ behavior: 'smooth' })
          })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-sm text-[11px] font-black uppercase tracking-wider text-white transition-all shadow-md active:scale-95"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span className="text-sm mb-0.5">⚡</span>
          <span>Free Trial</span>
        </button>
      </div>
    </motion.div>
  )
}
